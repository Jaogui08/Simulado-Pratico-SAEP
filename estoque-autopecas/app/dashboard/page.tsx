
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Usuario = {
  id: number;
  nome: string;
  email: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    try {
      const dados = localStorage.getItem("userLogado");

      if (!dados) {
        router.replace("/login");
        return;
      }

      const user = JSON.parse(dados);

      if (!user.id || !user.nome) {
        throw new Error("Sessão inválida");
      }

      setUsuario(user);
    } catch {
      localStorage.removeItem("userLogado");
      router.replace("/login");
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("userLogado");
    router.replace("/login");
  }

  if (!usuario) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white p-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Controle de Estoque
            </h1>
            <p className="text-slate-300 text-sm">
              Bem-vindo, {usuario.nome}!
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
          >
            Sair
          </button>
        </div>
      </header>

      <section className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Painel Principal
        </h2>

        <p className="text-slate-600 mb-8">
          Selecione uma funcionalidade do sistema.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/produtos"
            className="bg-white p-8 rounded-xl shadow border hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-slate-800">
              Cadastro de Produtos
            </h3>
            <p className="text-slate-600 mt-2">
              Consulte, cadastre, edite e exclua produtos.
            </p>
            <p className="text-blue-600 font-semibold mt-5">
              Acessar produtos →
            </p>
          </Link>

          <Link
            href="/movimentacao"
            className="bg-white p-8 rounded-xl shadow border hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-slate-800">
              Gestão de Estoque
            </h3>
            <p className="text-slate-600 mt-2">
              Registre entradas, saídas e acompanhe o estoque.
            </p>
            <p className="text-emerald-600 font-semibold mt-5">
              Acessar estoque →
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
