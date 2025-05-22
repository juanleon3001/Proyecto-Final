import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { PedidoGet } from '../../models/pedidoGet.models';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  pedidos: PedidoGet[] = [];

  filtroId: string = '';
  filtroProducto: string = '';

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedido().subscribe({
      next: data => this.pedidos = data,
      error: err => console.error('Error al obtener pedidos', err)
    });
  }

  pedidosFiltrados(): PedidoGet[] {
    return this.pedidos.filter(p => {
      const coincideId = this.filtroId === '' || p.id?.toString().includes(this.filtroId);
      const coincideProducto = this.filtroProducto === '' || p.productos?.some(prod =>
        prod.nombre?.toLowerCase().includes(this.filtroProducto.toLowerCase())
      );
      return coincideId && coincideProducto;
    });
  }
}
