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
  textoModal: string = 'Nuevo Cliente';
  clienteForm: FormGroup;
  isEditMode: boolean = false;
  selectedCliente: Cliente | null = null;

  @ViewChild('clienteModal') modalElementRef!: ElementRef;
  private modalInstance!: Modal;

  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder) {
    this.clienteForm = formBuilder.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apeliido: ['', Validators.required],
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
}
