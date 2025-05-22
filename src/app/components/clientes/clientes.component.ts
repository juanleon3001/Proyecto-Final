import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente.models';
import { ClienteService } from '../../services/cliente.service';
import { PedidoService } from '../../services/pedido.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.models';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  clientes: Cliente[] = [];
  productos: Producto[] = [];
  textoModal: string = 'Nuevo Cliente';
  clienteForm: FormGroup;
  pedidoForm: FormGroup;
  isEditMode: boolean = false;
  selectedCliente: Cliente | null = null;
  showPedidoForm: boolean = false;
  today: Date = new Date(); // <-- Agregado para el [max] en el input date

  @ViewChild('clienteModal') modalElementRef!: ElementRef;
  @ViewChild('pedidoModal') pedidoModalElementRef!: ElementRef;
  private modalInstance!: Modal;
  private pedidoModalInstance!: Modal;

  constructor(
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private productoService: ProductoService,
    private formBuilder: FormBuilder
  ) {
    this.clienteForm = formBuilder.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      direccion: ['', [Validators.maxLength(100)]]
    });

    this.pedidoForm = formBuilder.group({
      idCliente: [null, Validators.required],
      idProductos: [[], Validators.required],
      fechaCreacion: ['', [Validators.required, this.fechaAnteriorValidator]],
      idEstado: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarCliente();
    this.productoService.getProducto().subscribe({
      next: (resp: Producto[]) => this.productos = resp
    });
  }

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(this.modalElementRef.nativeElement);
    this.pedidoModalInstance = new Modal(this.pedidoModalElementRef.nativeElement);
  }

  listarCliente(): void {
    this.clienteService.getCliente().subscribe({
      next: resp => {
        this.clientes = resp;
      }
    });
  }

  toggleForm(): void {
    this.textoModal = 'Nuevo Cliente';
    this.isEditMode = false;
    this.clienteForm.reset();
    this.selectedCliente = null;
    this.modalInstance.show();
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('padding-right');
      }
    }
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) return;

    const clienteData: Cliente = this.clienteForm.value;

    if (this.isEditMode) {
      this.clienteService.putCliente(clienteData).subscribe({
        next: updateCliente => {
          const index = this.clientes.findIndex(t => t.id === clienteData.id);
          if (index !== -1) this.clientes[index] = updateCliente;

          Swal.fire({
            title: `Cliente ${updateCliente.nombre} actualizada`,
            text: 'El cliente fue actualizado correctamente.',
            icon: 'success'
          });

          this.clienteForm.reset();
          this.closeModal();
        }
      });
    } else {
      this.clienteService.postCliente(clienteData).subscribe({
        next: created => {
          this.clientes.push(created);

          Swal.fire({
            title: 'Cliente ' + created.nombre + ' creada',
            text: 'El cliente fue creado exitosamente.',
            icon: 'success'
          });

          this.clienteForm.reset();
          this.closeModal();
        }
      });
    }
  }

  editCliente(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.textoModal = `Editando cliente: ${cliente.nombre}`;
    this.isEditMode = true;
    this.clienteForm.patchValue({ ...cliente });
    this.modalInstance.show();
  }

  deleteCliente(id: number): void {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: '¿Estás seguro que deseas eliminar este cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(id).subscribe({
          next: deleted => {
            this.clientes = this.clientes.filter(t => t.id !== id);

            Swal.fire({
              title: `Cliente ${deleted.nombre} eliminada`,
              text: 'El cliente fue eliminado correctamente.',
              icon: 'success'
            });
          }
        });
      }
    });
  }

  // ----------- PEDIDOS -----------

  abrirPedidoModal(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.pedidoForm.reset();
    this.pedidoForm.patchValue({
      idCliente: cliente.id,
      idProductos: [],
      fechaCreacion: '',
      idEstado: null
    });
    this.showPedidoForm = true;
    this.pedidoModalInstance.show();
  }

  closePedidoModal(): void {
    this.pedidoForm.reset();
    this.showPedidoForm = false;
    if (this.pedidoModalInstance) {
      this.pedidoModalInstance.hide();
    }
  }

    onPedidoSubmit(): void {
      if (this.pedidoForm.invalid) return;

      const productosSeleccionados = this.productos.filter(p =>
        this.pedidoForm.value.idProductos.includes(p.id)
      );
      const total = productosSeleccionados.reduce((sum, p) => sum + p.precio, 0);

      // Asegura que la fecha sea string yyyy-MM-dd
      const fecha = this.pedidoForm.value.fechaCreacion;
      const fechaFormateada = typeof fecha === 'string' ? fecha : fecha.toISOString().split('T')[0];

      const pedidoData = {
        idCliente: this.pedidoForm.value.idCliente,
        total: total,
        fechaCreacion: fechaFormateada, // <-- string, no Date
        idEstado: this.pedidoForm.value.idEstado,
        idProductos: this.pedidoForm.value.idProductos // <-- array de números
      };

      this.pedidoService.postPedido(pedidoData).subscribe({
        next: created => {
          Swal.fire({
            title: 'Pedido creado',
            text: 'El pedido fue creado exitosamente.',
            icon: 'success'
          });
          this.closePedidoModal();
        },
        error: err => {
          Swal.fire('Error', 'No se pudo crear el pedido. Verifica los datos.', 'error');
          console.error(err);
        }
      });
    }

  // Validador para fecha anterior a hoy
  fechaAnteriorValidator(control: any) {
    if (!control.value) return null;
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate < today ? null : { fechaInvalida: true };
  }
}