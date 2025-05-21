export interface PedidoGet {
  id_pedido: number;
  id_cliente: number;
  total: number;
  fechaCreacion: string;
  estatus: string;
  productos: Producto[];
}

export interface Producto {
  nombre: string;
}
