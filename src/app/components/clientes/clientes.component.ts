import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente.models';
import { ClienteService } from '../../services/cliente.service';
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
  showForm: boolean = false;
  textoModal: string = 'Nueva Aerolínea';
  clienteForm: FormGroup;
  isEditMode: boolean = false;
  selectedCliente: Cliente | null = null;

  @ViewChild('clienteModal') modalElementRef!: ElementRef;
  private modalInstance!: Modal;

  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder) {
    this.clienteForm = formBuilder.group({
      id_cliente: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarCliente();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(this.modalElementRef.nativeElement);
  }

  listarCliente(): void {
    this.clienteService.getCliente().subscribe({
      next: resp => {
        this.clientes = resp;
      }
    });
  }

  toggleForm(): void {
    this.showForm = true;
    this.textoModal = 'Nueva Aerolínea';
    this.isEditMode = false;
    this.clienteForm.reset();
    this.selectedCliente = null;
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
    if (this.clienteForm.invalid) {
      return;
    }

    const clienteData: Cliente = this.clienteForm.value;

    if (this.isEditMode) {
      this.clienteService.putCliente(clienteData).subscribe({
        next: updateCliente => {
          const index = this.clientes.findIndex(t => t.id_cliente === clienteData.id_cliente);
          if (index !== -1) this.clientes[index] = updateCliente;

          Swal.fire({
            title: `Cliente ${updateCliente.nombre} actualizada`,
            text: 'La aerolínea fue actualizada correctamente.',
            icon: 'success'
          });
          this.clienteForm.reset();
          this.showForm = false;
          this.closeModal();
        }
      });
    } else {
      this.clienteService.postCliente(clienteData).subscribe({
        next: created => {
          this.clientes.push(created);

          Swal.fire({
            title: 'Cliente ' +created.nombre + ' creada',
            text: 'La aerolínea fue creada exitosamente.',
            icon: 'success'
          });

          this.clienteForm.reset();
          this.showForm = false;
          this.closeModal();
        }
      });
    }
  }

  editCliente(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.textoModal = `Editando aerolínea: ${cliente.nombre}`;
    this.isEditMode = true;
    this.showForm = true;
    this.clienteForm.patchValue({ ...cliente });
  }

  deleteCliente(id: number): void {
    Swal.fire({
      title: 'Eliminar Aerolínea',
      text: '¿Estás seguro que deseas eliminar esta aerolínea?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(id).subscribe({
          next: deleted => {
            this.clientes = this.clientes.filter(t => t.id_cliente !== id);

            Swal.fire({
              title: `Cliente ${deleted.nombre} eliminada`,
              text: 'La aerolínea fue eliminada correctamente.',
              icon: 'success'
            });
          }
        });
      }
    });
  }
}
