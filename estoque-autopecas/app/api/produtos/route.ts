import { NextResponse } from 'next/server';
import { ProdutoService } from '@/src/services/ProdutoService';
import { ProdutoRepository } from '@/src/repositories/ProdutoRepository';

const service = new ProdutoService(new ProdutoRepository());

export async function GET(){
    try {
        const produtos = await service.listar();
        return NextResponse.json(produtos, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 500 });
    }
}

export async function POST(req: Request){
    try {
        const body = await req.json();
        const produtoCriado = await service.cadastrar(body);
        return NextResponse.json(produtoCriado, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}