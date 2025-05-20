export interface PedidoGet{
    id_pedido: number | null,
    id_cliente: number,
    total: number,
    fechaCreacion: Date,
    estatus: number,
}