import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { PedidoGet } from '../../models/pedidoGet.models';
import { PedidoPost } from '../../models/pedidoPost.model';
import { ClienteService } from '../../services/cliente.service'; // Asegúrate de tener este servicio
// import { Cliente } from '../../models/cliente.model'; // Asegúrate de tener este modelo
import { Cliente } from '../../models/cliente.models'; // Asegúrate de tener este modelo
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-pedidos',
  standalone: false,
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, AfterViewInit {

  pedidos: PedidoGet[] = [];
  clientes: Cliente[] = [];
  showForm: boolean = false;
  textoModal: string = 'Nuevo Pedido';
  pedidoForm: FormGroup;
  isEditMode: boolean = false;
  selectedPedido: PedidoGet | null = null;

  @ViewChild('pedidoModal') modalElementRef!: ElementRef;
  private modalInstance!: Modal;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder
  ) {
    this.pedidoForm = formBuilder.group({
      id: [{ value: null, disabled: true }],
      id_cliente: [null, Validators.required],
      total: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      estatus: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarPedidos();
    this.clienteService.getCliente().subscribe({
      next: resp => this.clientes = resp
    });
  }

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(this.modalElementRef.nativeElement);
  }

  listarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: resp => {
        this.pedidos = resp;
      }
    });
  }

  toggleForm(): void {
    this.showForm = true;
    this.textoModal = 'Nuevo Pedido';
    this.isEditMode = false;
    this.pedidoForm.reset();
    this.pedidoForm.get('id_cliente')?.enable();
    this.pedidoForm.get('total')?.enable();
    this.pedidoForm.get('fechaCreacion')?.enable();
    this.pedidoForm.get('estatus')?.enable();
    this.selectedPedido = null;
    this.modalInstance.show();
  }

  closeModal(): void {
    this.pedidoForm.reset();
    if (this.modalInstance) {
      this.modalInstance.hide();
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    }
  }

  onSubmit(): void {
    if (this.pedidoForm.invalid) return;

    if (this.isEditMode && this.selectedPedido) {
      // Editar pedido (solo cambia estatus)
      const pedidoData: PedidoPost = {
        id: this.selectedPedido.id,
        idCliente: (this.selectedPedido as any).idCliente ?? (this.selectedPedido as any).id_cliente ?? 0,
        total: this.selectedPedido.total,
        fechaCreacion: new Date(this.selectedPedido.fechaCreacion),
        idEstado: this.pedidoForm.get('estatus')?.value,
        idProductos: (this.selectedPedido as any).idProductos ?? []
      };
      this.pedidoService.putPedido(pedidoData).subscribe({
        next: updated => {
          updated.clienteNombre = this.selectedPedido?.clienteNombre ?? '';
          const index = this.pedidos.findIndex(t => t.id === updated.id);
          if (index !== -1) this.pedidos[index] = updated;
          Swal.fire(`Pedido ${updated.id} actualizado`, 'El pedido fue actualizado correctamente.', 'success');
          this.pedidoForm.reset();
          this.closeModal();
        }
      });
    } else {
      // Nuevo pedido
      const pedidoData: PedidoPost = {
        id: 0,
        idCliente: this.pedidoForm.get('id_cliente')?.value,
        total: this.pedidoForm.get('total')?.value,
        fechaCreacion: this.pedidoForm.get('fechaCreacion')?.value,
        idEstado: this.pedidoForm.get('estatus')?.value,
        idProductos: []
      };
      this.pedidoService.postPedido(pedidoData).subscribe({
        next: created => {
          // Busca el nombre del cliente para mostrarlo en la tabla
          const cliente = this.clientes.find(c => c.id === pedidoData.idCliente);
          (created as any).clienteNombre = cliente ? cliente.nombre : '';
          this.pedidos.push(created);
          Swal.fire(`Pedido ${created.id} creado`, 'El Pedido fue registrado exitosamente.', 'success');
          this.pedidoForm.reset();
          this.closeModal();
        }
      });
    }
  }

  editPedido(pedido: PedidoGet): void {
    this.selectedPedido = pedido;
    this.textoModal = `Editar pedido`;
    this.isEditMode = true;
    this.pedidoForm.patchValue({
      id: pedido.id,
      id_cliente: (pedido as any).idCliente, // Use the correct property or cast if needed
      total: pedido.total,
      fechaCreacion: pedido.fechaCreacion,
      estatus: +pedido.idEstado
    });
    this.pedidoForm.get('id_cliente')?.disable();
    this.pedidoForm.get('total')?.disable();
    this.pedidoForm.get('fechaCreacion')?.disable();
    this.pedidoForm.get('estatus')?.enable();
    this.showForm = true;
    this.modalInstance.show();
  }

  deletePedido(id: number): void {
    Swal.fire({
      title: 'Eliminar Pedido',
      text: '¿Estás seguro de que deseas eliminar este pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.pedidoService.deletePedido(id).subscribe({
          next: (deleted: any) => {
            this.pedidos = this.pedidos.filter((a: any) => a.id !== id);
            Swal.fire(`Pedido ${deleted.id} eliminado`, 'El pedido fue eliminado correctamente.', 'success');
          }
        });
      }
    });
  }

  get pedidosFiltrados(): PedidoGet[] {
    return this.pedidos.filter((p: PedidoGet) => String(p.idEstado) !== '4');
  }

  getEstatusPedido(estatus: string | number): { texto: string, clase: string } {
    switch (estatus) {
      case 1:
      case '1':
        return { texto: 'Pendiente', clase: 'badge bg-primary' };
      case 2:
      case '2':
        return { texto: 'Enviado', clase: 'badge bg-warning text-dark' };
      case 3:
      case '3':
        return { texto: 'Entregado', clase: 'badge bg-success' };
      case 4:
      case '4':
        return { texto: 'Cancelado', clase: '' };
      default:
        return { texto: 'N/A', clase: '' };
    }
  }

  cancelarPedido(id: number): void {
    const pedido = this.pedidos.find((p: PedidoGet) => p.id === id);
    if (pedido) {
      const pedidoCancelado = {
        id: pedido.id,
        idCliente: (pedido as any).idCliente ?? (pedido as any).id_cliente ?? '',
        total: pedido.total,
        fechaCreacion: pedido.fechaCreacion,
        idEstado: 4,
        idProductos: (pedido as any).idProductos ?? []
      };
      this.pedidoService.putPedido(pedidoCancelado).subscribe({
        next: (updated: any) => {
          updated.clienteNombre = pedido.clienteNombre;
          const index = this.pedidos.findIndex((p: PedidoGet) => p.id === id);
          if (index !== -1) this.pedidos[index] = updated;
          Swal.fire('Pedido cancelado', 'El pedido fue marcado como cancelado.', 'info');
        }
      });
    }
  }
}