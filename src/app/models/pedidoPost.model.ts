export interface PedidoPost{
    id_pedido: number | null,
    id_cliente: number,
    total: number,
    fechaCreacion: Date,
    estatus: number,
}