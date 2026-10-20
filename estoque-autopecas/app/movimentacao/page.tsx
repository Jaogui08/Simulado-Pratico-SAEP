
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
  estoqueMinimo: number;
};

type Tipo = "ENTRADA" | "SAIDA";

export default function MovimentacaoEstoque() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoId, setProdutoId] = useState("");
  const [tipo, setTipo] = useState<Tipo>("ENTRADA");
  const [quantidade, setQuantidade] = useState("");
  const [dataMovimentacao, setDataMovimentacao] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function carregarProdutos() {
    try {
      const res = await api.get<Produto[]>("/produtos");

      const ordenados = [...res.data].sort((a, b) =>
        a.descricao.localeCompare(b.descricao, "pt-BR")
      );

      setProdutos(ordenados);
    } catch {
      Swal.fire("Erro", "Não foi possível carregar os produtos.", "error");
    }
  }

  useEffect(() => {
    setDataMovimentacao(new Date().toLocaleDateString("en-CA"));
    void carregarProdutos();
  }, []);

  const selecionado = produtos.find(
    (p) => p.id === Number(produtoId)
  );

  async function registrar(e: React.FormEvent) {
    e.preventDefault();

    const qtd = Number(quantidade);

    if (!produtoId) {
      Swal.fire("Atenção", "Selecione um produto.", "warning");
      return;
    }

    if (
      quantidade.trim() === "" ||
      !Number.isInteger(qtd) ||
      qtd <= 0
    ) {
      Swal.fire("Atenção", "Informe uma quantidade inteira maior que zero.", "warning");
      return;
    }

    if (!dataMovimentacao) {
      Swal.fire("Atenção", "Informe a data da movimentação.", "warning");
      return;
    }

    if (tipo === "SAIDA" && selecionado && qtd > selecionado.quantidade) {
      Swal.fire("Estoque insuficiente", "A quantidade solicitada é maior que o estoque disponível.", "warning");
      return;
    }

    let user: { id?: number };

    try {
      user = JSON.parse(localStorage.getItem("userLogado") || "{}");
    } catch {
      user = {};
    }

    if (!user.id) {
      Swal.fire("Sessão expirada", "Faça login novamente.", "warning");
      return;
    }

    setSalvando(true);

    try {
      const res = await api.post("/movimentacoes", {
        produtoId: Number(produtoId),
        usuarioId: user.id,
        tipo,
        quantidade: qtd,
        data: dataMovimentacao
      });

      if (res.data.alerta) {
        await Swal.fire("Estoque baixo!", res.data.alerta, "warning");
      } else {
        await Swal.fire("Sucesso!", "Movimentação registrada.", "success");
      }

      setQuantidade("");
      await carregarProdutos();
    } catch (error: unknown) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.erro || "Falha ao registrar."
        : "Erro inesperado.";

      Swal.fire("Erro!", mensagem, "error");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Gestão de Estoque
            </h1>
            <p className="text-slate-500 mt-1">
              Registre entradas e saídas de produtos.
            </p>
          </div>

          <Link href="/dashboard" className="text-blue-600 font-medium">
            ← Voltar ao menu
          </Link>
        </div>

        <form
          onSubmit={registrar}
          className="bg-white p-8 rounded-xl shadow border space-y-5"
        >
          <div>
            <label className="block font-medium mb-2">
              Produto
            </label>
            <select
              required
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Selecione um produto...</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.descricao} - {p.codigo}
                </option>
              ))}
            </select>
          </div>

          {selecionado && (
            <div className="bg-slate-100 p-4 rounded-lg">
              <p>Estoque atual: <strong>{selecionado.quantidade}</strong></p>
              <p>Estoque mínimo: <strong>{selecionado.estoqueMinimo}</strong></p>

              {selecionado.quantidade < selecionado.estoqueMinimo && (
                <p className="text-red-600 font-bold mt-2">
                  ⚠ Produto abaixo do estoque mínimo!
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">
                Tipo de movimentação
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as Tipo)}
                className="w-full border p-3 rounded-lg"
              >
                <option value="ENTRADA">Entrada (+)</option>
                <option value="SAIDA">Saída (-)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Quantidade
              </label>
              <input
                type="number"
                required
                min="1"
                step="1"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Data da movimentação
            </label>
            <input
              type="date"
              required
              value={dataMovimentacao}
              onChange={(e) => setDataMovimentacao(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white p-3 rounded-lg font-bold"
          >
            {salvando ? "Registrando..." : "Registrar Movimentação"}
          </button>
        </form>
      </div>
    </main>
  );
}
