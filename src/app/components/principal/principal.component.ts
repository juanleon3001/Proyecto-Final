import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { ProductoService } from '../../services/producto.service';
import { PedidoGet } from '../../models/pedidoGet.models';
import { Producto } from '../../models/producto.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  pedidos: PedidoGet[] = [];
  productos: Producto[] = [];
  filtroId: string = '';
  filtroProducto: string = '';

  constructor(
    private pedidoService: PedidoService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
    this.cargarProductos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
      },
      error: (err) => {
        console.error('Error al obtener pedidos', err);
        Swal.fire('Error', 'No se pudieron cargar los pedidos', 'error');
      }
    });
  }

  cargarProductos(): void {
    this.productoService.getProducto().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
      }
    });
  }

    pedidosFiltrados(): PedidoGet[] {
    return this.pedidos.filter(p => {
      // Excluir pedidos cancelados
      if (p.idEstado?.toString() === '4') {
        return false;
      }
      const coincideId = this.filtroId === '' || p.id?.toString().includes(this.filtroId);
      const coincideProducto = this.filtroProducto === '' ||
        (Array.isArray(p.idProductos) &&
        p.idProductos.some((prodId: number) =>
          this.productos.find(prod => prod.id === prodId)?.nombre?.toLowerCase().includes(this.filtroProducto.toLowerCase())
        ));
      return coincideId && coincideProducto;
    });
  }

  obtenerNombreProducto(id: number): string {
    return this.productos.find(p => p.id === id)?.nombre || id.toString();
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
}