export interface PedidoGet {
  id: number;
  clienteNombre: string;
  clienteApellido: string;
  total: number;
  fechaCreacion: Date;
  idEstado: string;
  idProductos: number[];
}

export interface Producto {
  nombre: string;
}
