import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { PedidoGet } from '../../models/pedidoGet.models';
import { PedidoPost } from '../../models/pedidoPost.model';
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
  showForm: boolean = false;
  textoModal: string = 'Nuevo Avión';
  pedidoForm: FormGroup;
  isEditMode: boolean = false;
  selectedPedido: PedidoGet | null = null;

  @ViewChild('pedidoModal') modalElementRef!: ElementRef;
  private modalInstance!: Modal;

  constructor(private pedidoService: PedidoService, private formBuilder: FormBuilder) {
    this.pedidoForm = formBuilder.group({
      id_pedido: [null],
      id_cliente: ['', [Validators.required, Validators.maxLength(50)]],
      idAvion: ['', Validators.required],
      idOrigen: ['', Validators.required],
      idDestino: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarPedidos();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(this.modalElementRef.nativeElement);
  }

  listarPedidos(): void {
    this.pedidoService.getPedido().subscribe({
      next: resp => {
        this.pedidos = resp;
      }
    });
  }

  toggleForm(): void {
    this.showForm = true;
    this.textoModal = 'Nuevo Avión';
    this.isEditMode = false;
    this.pedidoForm.reset();
    this.selectedPedido = null;
    this.modalInstance.show();
  }

  closeModal(): void {
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

    const pedidoData: PedidoPost = this.pedidoForm.value;

    if (this.isEditMode && pedidoData.id_pedido != null) {
      this.pedidoService.putPedido(pedidoData).subscribe({
        next: updated => {
          const index = this.pedidos.findIndex(t => t.id_pedido === updated.id_pedido);
          if (index !== -1) this.pedidos[index] = updated;

          Swal.fire(`Avión ${updated.id_pedido} actualizado`, 'La aeronave fue actualizada correctamente.', 'success');
          this.pedidoForm.reset();
          this.closeModal();
        }
      });
    } else {
      this.pedidoService.postPedido(pedidoData).subscribe({
        next: created => {
          this.pedidos.push(created);

          Swal.fire(`Avión ${created.id_pedido} creado`, 'La aeronave fue registrada exitosamente.', 'success');
          this.pedidoForm.reset();
          this.closeModal();
        }
      });
    }
  }

  editPedido(pedido: PedidoGet): void {
    this.selectedPedido = pedido;
    this.textoModal = `Editando Avión: ${pedido.id_pedido}`;
    this.isEditMode = true;
    this.pedidoForm.patchValue({ ...pedido });
    this.modalInstance.show();
  }

  deletePedido(id: number): void {
    Swal.fire({
      title: 'Eliminar Avión',
      text: '¿Estás seguro de que deseas eliminar esta aeronave?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.pedidoService.deletePedido(id).subscribe({
          next: deleted => {
            this.pedidos = this.pedidos.filter(a => a.id_pedido !== id);
            Swal.fire(`Avión ${deleted.id_pedido} eliminado`, 'La aeronave fue eliminada correctamente.', 'success');
          }
        });
      }
    });
  }
}
