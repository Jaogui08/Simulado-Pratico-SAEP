import prisma from '@/src/lib/prisma';
import { MovimentacaoEntity } from '../entities/MovimentacaoEntity';
import { MovimentacaoProps } from '../interfaces';

export class MovimentacaoRepository {
    async listarTodos(): Promise<MovimentacaoEntity[]> {
        const movs = await prisma.movimentacao.findMany();
        return movs.map(m => new MovimentacaoEntity({
            id: m.id,
            produtoId: m.produto_id,
            usuarioId: m.usuario_id,
            tipo: m.tipo as any,
            quantidade: m.quantidade,
            data: m.data_movimentacao
        }));
    }

    async buscarPorId(id: number): Promise<MovimentacaoEntity | null> {
        const m = await prisma.movimentacao.findUnique({ where: { id } });
        return m ? new MovimentacaoEntity({
            id: m.id,
            produtoId: m.produto_id,
            usuarioId: m.usuario_id,
            tipo: m.tipo as any,
            quantidade: m.quantidade,
            data: m.data_movimentacao
        }) : null;
    }

    async criar(props: MovimentacaoProps): Promise<MovimentacaoEntity> {
        const m = await prisma.movimentacao.create({
            data: {
                produto_id: props.produtoId,
                usuario_id: props.usuarioId,
                tipo: props.tipo,
                quantidade: props.quantidade,
                ...(props.data && {
                    data_movimentacao: props.data
                })
            }
        });
        return new MovimentacaoEntity({
            id: m.id,
            produtoId: m.produto_id,
            usuarioId: m.usuario_id,
            tipo: m.tipo as any,
            quantidade: m.quantidade,
            data: m.data_movimentacao
        });
    }

    async excluir(id: number): Promise<void> {
        await prisma.movimentacao.delete({ where: { id } });
    }
}