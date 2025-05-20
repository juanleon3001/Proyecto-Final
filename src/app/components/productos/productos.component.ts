import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto.models';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, AfterViewInit {

  productos: Producto[] = [];
  showForm: boolean = false;
  textoModal: string = 'Nueva Aerolínea';
  productoForm: FormGroup;
  isEditMode: boolean = false;
  selectedProducto: Producto | null = null;

  @ViewChild('productoModal') modalElementRef!: ElementRef;
  private modalInstance!: Modal;

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder) {
    this.productoForm = formBuilder.group({
      id_producto: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarProducto();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(this.modalElementRef.nativeElement);
  }

  listarProducto(): void {
    this.productoService.getProducto().subscribe({
      next: resp => {
        this.productos = resp;
      }
    });
  }

  toggleForm(): void {
    this.showForm = true;
    this.textoModal = 'Nueva Aerolínea';
    this.isEditMode = false;
    this.productoForm.reset();
    this.selectedProducto = null;
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
    if (this.productoForm.invalid) {
      return;
    }

    const productoData: Producto = this.productoForm.value;

    if (this.isEditMode) {
      this.productoService.putProducto(productoData).subscribe({
        next: updateProducto => {
          const index = this.productos.findIndex(t => t.id_producto === productoData.id_producto);
          if (index !== -1) this.productos[index] = updateProducto;

          Swal.fire({
            title: `Producto ${updateProducto.nombre} actualizada`,
            text: 'La aerolínea fue actualizada correctamente.',
            icon: 'success'
          });
          this.productoForm.reset();
          this.showForm = false;
          this.closeModal();
        }
      });
    } else {
      this.productoService.postProducto(productoData).subscribe({
        next: created => {
          this.productos.push(created);

          Swal.fire({
            title: 'Producto ' +created.nombre + ' creada',
            text: 'La aerolínea fue creada exitosamente.',
            icon: 'success'
          });

          this.productoForm.reset();
          this.showForm = false;
          this.closeModal();
        }
      });
    }
  }

  editProducto(producto: Producto): void {
    this.selectedProducto = producto;
    this.textoModal = `Editando aerolínea: ${producto.nombre}`;
    this.isEditMode = true;
    this.showForm = true;
    this.productoForm.patchValue({ ...producto });
  }

  deleteProducto(id: number): void {
    Swal.fire({
      title: 'Eliminar Aerolínea',
      text: '¿Estás seguro que deseas eliminar esta aerolínea?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(id).subscribe({
          next: deleted => {
            this.productos = this.productos.filter(t => t.id_producto !== id);

            Swal.fire({
              title: `Producto ${deleted.nombre} eliminada`,
              text: 'La aerolínea fue eliminada correctamente.',
              icon: 'success'
            });
          }
        });
      }
    });
  }
}
