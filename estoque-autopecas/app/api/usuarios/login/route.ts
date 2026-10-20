import { NextResponse } from 'next/server';
import { UsuarioService } from '@/src/services/UsuarioService';
import { UsuarioRepository } from '@/src/repositories/UsuarioRepository';

const service = new UsuarioService(new UsuarioRepository());

export async function POST(req: Request){
    try {
        const { email, senha } = await req.json();
        const usuario = await service.autenticar(email, senha);
        return NextResponse.json(usuario, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ erro: e.message }, { status: 401 });
    }
}