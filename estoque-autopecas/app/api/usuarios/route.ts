import { NextResponse } from 'next/server';
import { UsuarioService } from '@/src/services/UsuarioService';
import { UsuarioRepository } from '@/src/repositories/UsuarioRepository';

const service = new UsuarioService(new UsuarioRepository());

export async function GET(){
    try {
        const usuarios = await service.listar();
        return NextResponse.json(usuarios, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 500 });
    }
}

export async function POST(req: Request){
    try {
        const body = await req.json();
        const novoUsuario = await service.cadastrar(body);
        return NextResponse.json(novoUsuario, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }
}