import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { UsuarioProps } from '../interfaces';

export class UsuarioService {
    constructor(private repo: UsuarioRepository) {}

    async autenticar(email: string, senhaLimpa: string) {
        const user = await this.repo.buscarPorEmail(email);
        if (!user || user.getSenha !== senhaLimpa) {
            throw new Error("Credenciais inválidas.");
        }
        return { id: user.getId, nome: user.getNome, email: user.getEmail };
    }

    async listar() {
        const usuarios = await this.repo.listarTodos();
        return usuarios.map(u => ({ id: u.getId, nome: u.getNome, email: u.getEmail }));
    }

    async buscar(id: number) {
        const u = await this.repo.buscarPorId(id);
        if (!u) throw new Error("Usuário não encontrado.");
        return { id: u.getId, nome: u.getNome, email: u.getEmail };
    }

    async cadastrar(props: UsuarioProps) {
        const u = await this.repo.criar(props);
        return { id: u.getId, nome: u.getNome, email: u.getEmail };
    }

    async atualizar(id: number, props: Partial<UsuarioProps>) {
        const u = await this.repo.atualizar(id, props);
        return { id: u.getId, nome: u.getNome, email: u.getEmail };
    }

    async excluir(id: number) {
        return await this.repo.excluir(id);
    }
}