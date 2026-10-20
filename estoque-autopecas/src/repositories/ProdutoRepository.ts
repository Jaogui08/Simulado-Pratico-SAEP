import prisma from '@/src/lib/prisma';
import { ProdutoEntity } from '../entities/ProdutoEntity';
import { ProdutoProps } from '../interfaces';

export class ProdutoRepository {
    async listarTodos(): Promise<ProdutoEntity[]> {
        const prods = await prisma.produto.findMany({ orderBy: { descricao: 'asc' } });
        return prods.map(p => new ProdutoEntity({
            id: p.id,
            codigo: p.codigo,
            descricao: p.descricao,
            quantidade: p.quantidade,
            valorUnitario: Number(p.valor_unitario),
            estoqueMinimo: p.estoque_minimo
        }));
    }

    async buscarPorId(id: number): Promise<ProdutoEntity | null> {
        const p = await prisma.produto.findUnique({ where: { id } });
        return p ? new ProdutoEntity({
            id: p.id,
            codigo: p.codigo,
            descricao: p.descricao,
            quantidade: p.quantidade,
            valorUnitario: Number(p.valor_unitario),
            estoqueMinimo: p.estoque_minimo
        }) : null;
    }

    async criar(props: ProdutoProps): Promise<ProdutoEntity> {
        const p = await prisma.produto.create({
            data: {
                codigo: props.codigo,
                descricao: props.descricao,
                quantidade: props.quantidade,
                valor_unitario: props.valorUnitario,
                estoque_minimo: props.estoqueMinimo
            }
        });
        return new ProdutoEntity({
            id: p.id,
            codigo: p.codigo,
            descricao: p.descricao,
            quantidade: p.quantidade,
            valorUnitario: Number(p.valor_unitario),
            estoqueMinimo: p.estoque_minimo
        });
    }

    async atualizar(id: number, props: Partial<ProdutoProps>): Promise<ProdutoEntity> {
        const p = await prisma.produto.update({
            where: { id },
            data: {
                codigo: props.codigo,
                descricao: props.descricao,
                quantidade: props.quantidade,
                valor_unitario: props.valorUnitario,
                estoque_minimo: props.estoqueMinimo
            }
        });
        return new ProdutoEntity({
            id: p.id,
            codigo: p.codigo,
            descricao: p.descricao,
            quantidade: p.quantidade,
            valorUnitario: Number(p.valor_unitario),
            estoqueMinimo: p.estoque_minimo
        });
    }

    async excluir(id: number): Promise<void> {
        await prisma.produto.delete({ where: { id } });
    }
}