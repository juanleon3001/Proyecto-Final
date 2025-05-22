export interface PedidoGet {
  id: number;
  clienteNombre: string;
  clienteApellido: string;
  total: number;
  fechaCreacion: Date;
  estado: string;
  productos: Producto[];
}

export interface Producto {
  nombre: string;
}
