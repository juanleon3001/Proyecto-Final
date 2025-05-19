export interface Pedido{
    id_pedido: number | null,
    id_cliente: number,
    total: number,
    fechaCreacion: Date,
    estatus: number,
}