export interface PedidoPost {
  id: number;
  idCliente: number;
  total: number;
  fechaCreacion: Date;
  idEstado: number;
  idProductos: number[];
}