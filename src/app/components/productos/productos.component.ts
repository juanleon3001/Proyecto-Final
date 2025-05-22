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
  textoModal: string = 'Nuevo Producto';
  productoForm: FormGroup;
  isEditMode: boolean = false;
  selectedProducto: Producto | null = null;

  @ViewChild('productoModal') modalElementRef!: ElementRef;
  private modalInstance!: Modal;

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder) {
    this.productoForm = formBuilder.group({
      id: [null],
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
    this.textoModal = 'Nuevo Producto';
    this.isEditMode = false;
    this.productoForm.reset();
    this.selectedProducto = null;
    this.modalInstance.show();
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
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
          const index = this.productos.findIndex(t => t.id === productoData.id);
          if (index !== -1) this.productos[index] = updateProducto;

          Swal.fire({
            title: `Producto ${updateProducto.nombre} actualizado`,
            text: 'El producto fue actualizado correctamente.',
            icon: 'success'
          });
          this.productoForm.reset();
          this.closeModal();
        }
      });
    } else {
      this.productoService.postProducto(productoData).subscribe({
        next: created => {
          this.productos.push(created);

          Swal.fire({
            title: 'Producto ' + created.nombre + ' creado',
            text: 'El producto fue creado exitosamente.',
            icon: 'success'
          });

          this.productoForm.reset();
          this.closeModal();
        }
      });
    }
  }

  editProducto(producto: Producto): void {
    this.selectedProducto = producto;
    this.textoModal = `Editando producto: ${producto.nombre}`;
    this.isEditMode = true;
    this.productoForm.patchValue({ ...producto });
    this.modalInstance.show();
  }

  deleteProducto(id: number): void {
    Swal.fire({
      title: 'Eliminar Producto',
      text: '¿Estás seguro que deseas eliminar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(id).subscribe({
          next: deleted => {
            this.productos = this.productos.filter(t => t.id !== id);

            Swal.fire({
              title: `Producto ${deleted.nombre} eliminado`,
              text: 'El producto fue eliminado correctamente.',
              icon: 'success'
            });
          }
        });
      }
    });
  }
}
