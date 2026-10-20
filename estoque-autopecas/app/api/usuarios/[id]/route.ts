import { NextResponse } from 'next/server';
import { UsuarioService } from '@/src/services/UsuarioService';
import { UsuarioRepository } from '@/src/repositories/UsuarioRepository';

const service = new UsuarioService(new UsuarioRepository());

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;
        const usuario = await service.buscar(Number(id));
        return NextResponse.json(usuario, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 404 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;
        const body = await req.json();
        const usuarioAtualizado = await service.atualizar(Number(id), body);
        return NextResponse.json(usuarioAtualizado, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }){
    try {
        const { id } = await params;
        await service.excluir(Number(id));
        return NextResponse.json({ mensagem: "Usuário excluído com sucesso." }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}