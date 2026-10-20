
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import Swal from "sweetalert2";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      Swal.fire("Atenção", "Preencha todos os campos.", "warning");
      return;
    }

    setCarregando(true);

    try {
      const { data } = await api.post("/usuarios/login", {
        email: email.trim(),
        senha
      });

      localStorage.setItem("userLogado", JSON.stringify(data));

      router.replace("/dashboard");
    } catch (error: unknown) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.erro || "Falha de conexão com o servidor."
        : "Ocorreu um erro inesperado.";

      Swal.fire("Falha na autenticação", mensagem, "error");
      setSenha("");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border"
      >
        <h1 className="text-2xl font-bold mb-2 text-center text-slate-800">
          Controle de Estoque
        </h1>

        <p className="text-center text-slate-500 mb-6">
          Entre com suas credenciais
        </p>

        <label className="block text-sm font-medium mb-1">
          E-mail
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Senha
        </label>
        <input
          type="password"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          className="w-full mb-6 p-3 border rounded-lg"
        />

        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white p-3 rounded-lg font-semibold"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
