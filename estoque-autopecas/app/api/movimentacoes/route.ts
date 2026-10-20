import { NextResponse } from 'next/server';
import { MovimentacaoService } from '@/src/services/MovimentacaoService';
import { MovimentacaoRepository } from '@/src/repositories/MovimentacaoRepository';
import { ProdutoRepository } from '@/src/repositories/ProdutoRepository';

const service = new MovimentacaoService(
    new MovimentacaoRepository(),
    new ProdutoRepository()
);

export async function GET(){
    try {
        const movimentacoes = await service.listar();
        return NextResponse.json(movimentacoes, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 500 });
    }
}

export async function POST(req: Request){
    try {
        const body = await req.json();
        const resultado = await service.registrar(body);
        return NextResponse.json(resultado, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}