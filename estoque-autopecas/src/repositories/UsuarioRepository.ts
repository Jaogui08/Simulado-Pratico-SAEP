import prisma from '@/src/lib/prisma';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { UsuarioProps } from '../interfaces';

export class UsuarioRepository {
    async listarTodos(): Promise<UsuarioEntity[]> {
        const users = await prisma.usuario.findMany();
        return users.map(u => new UsuarioEntity({ id: u.id, nome: u.nome, email: u.email, senha: u.senha }));
    }

    async buscarPorId(id: number): Promise<UsuarioEntity | null> {
        const u = await prisma.usuario.findUnique({ where: { id } });
        return u ? new UsuarioEntity({ id: u.id, nome: u.nome, email: u.email, senha: u.senha }) : null;
    }

    async buscarPorEmail(email: string): Promise<UsuarioEntity | null> {
        const u = await prisma.usuario.findUnique({ where: { email } });
        return u ? new UsuarioEntity({ id: u.id, nome: u.nome, email: u.email, senha: u.senha }) : null;
    }

    async criar(props: UsuarioProps): Promise<UsuarioEntity> {
        const u = await prisma.usuario.create({
            data: { nome: props.nome, email: props.email, senha: props.senha! }
        });
        return new UsuarioEntity({ id: u.id, nome: u.nome, email: u.email, senha: u.senha });
    }

    async atualizar(id: number, props: Partial<UsuarioProps>): Promise<UsuarioEntity> {
        const u = await prisma.usuario.update({
            where: { id },
            data: { nome: props.nome, email: props.email, senha: props.senha }
        });
        return new UsuarioEntity({ id: u.id, nome: u.nome, email: u.email, senha: u.senha });
    }

    async excluir(id: number): Promise<void> {
        await prisma.usuario.delete({ where: { id } });
    }
}