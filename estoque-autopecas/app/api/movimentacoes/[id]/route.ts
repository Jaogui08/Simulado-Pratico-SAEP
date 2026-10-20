import { NextResponse } from 'next/server';
import { MovimentacaoService } from '@/src/services/MovimentacaoService';
import { MovimentacaoRepository } from '@/src/repositories/MovimentacaoRepository';
import { ProdutoRepository } from '@/src/repositories/ProdutoRepository';

const service = new MovimentacaoService(
    new MovimentacaoRepository(),
    new ProdutoRepository()
);

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;
        await service.excluir(Number(id));
        return NextResponse.json({ mensagem: "Movimentação removida." }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}