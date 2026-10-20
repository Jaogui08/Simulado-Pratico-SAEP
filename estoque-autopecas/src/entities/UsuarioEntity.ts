import { UsuarioProps } from '../interfaces';
export class UsuarioEntity{
    constructor(private props: UsuarioProps) {}
    public get getId() { return this.props.id; }
    public get getNome() { return this.props.nome; }
    public get getEmail() { return this.props.email; }
    public get getSenha() { return this.props.senha; }
}