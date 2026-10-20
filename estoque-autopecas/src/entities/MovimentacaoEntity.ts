import { MovimentacaoProps } from '../interfaces';
export class MovimentacaoEntity{
    constructor(private props: MovimentacaoProps) {}
    public get getId() { return this.props.id; }
    public get getProdutoId() { return this.props.produtoId; }
    public get getUsuarioId() { return this.props.usuarioId; }
    public get getTipo() { return this.props.tipo; }
    public get getQuantidade() { return this.props.quantidade; }
    public get getData() { return this.props.data; }
}