
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../lib/api";
import Swal from "sweetalert2";
import axios from "axios";

type Produto = {
  id: number;
  codigo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  estoqueMinimo: number;
};

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  async function carregar() {
    try {
      const res = await api.get<Produto[]>("/produtos");
      setProdutos(res.data);
    } catch {
      Swal.fire("Erro", "Não foi possível carregar os produtos.", "error");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregar();
  }, []);

  async function excluir(id: number) {
    const confirmacao = await Swal.fire({
      title: "Excluir produto?",
      text: "Esta ação não poderá ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626"
    });

    if (!confirmacao.isConfirmed) return;

    try {
      await api.delete(`/produtos/${id}`);
      await Swal.fire("Sucesso!", "Produto excluído.", "success");
      await carregar();
    } catch (error: unknown) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.erro || "Erro ao excluir."
        : "Erro inesperado.";

      Swal.fire("Erro", mensagem, "error");
    }
  }

  const filtrados = produtos.filter((p) => {
    const termo = busca.toLowerCase().trim();

    return (
      p.descricao.toLowerCase().includes(termo) ||
      p.codigo.toLowerCase().includes(termo)
    );
  });

  function formatarPreco(valor: number) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Cadastro de Produtos
            </h1>
            <p className="text-slate-500 mt-1">
              Gerencie os produtos cadastrados.
            </p>
          </div>

          <Link href="/dashboard" className="text-blue-600 font-medium">
            ← Voltar ao menu
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar por código ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 min-w-48 p-3 border rounded-lg"
            />

            <Link
              href="/produtos/form"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              + Novo Produto
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Descrição</th>
                  <th className="p-3">Quantidade</th>
                  <th className="p-3">Preço</th>
                  <th className="p-3">Mínimo</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filtrados.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3">{p.codigo}</td>
                    <td className="p-3 font-medium">{p.descricao}</td>
                    <td className="p-3">
                      <span className={
                        p.quantidade < p.estoqueMinimo
                          ? "text-red-600 font-bold"
                          : "text-slate-800"
                      }>
                        {p.quantidade}
                      </span>
                    </td>
                    <td className="p-3">
                      {formatarPreco(p.valorUnitario)}
                    </td>
                    <td className="p-3">{p.estoqueMinimo}</td>
                    <td className="p-3">
                      <div className="flex gap-4">
                        <Link
                          href={`/produtos/form?id=${p.id}`}
                          className="text-blue-600 font-medium"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => excluir(p.id)}
                          className="text-red-600 font-medium"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!carregando && filtrados.length === 0 && (
            <p className="text-center text-slate-500 py-8">
              Nenhum produto encontrado.
            </p>
          )}

          {carregando && (
            <p className="text-center py-8">Carregando produtos...</p>
          )}
        </div>
      </div>
    </main>
  );
}
