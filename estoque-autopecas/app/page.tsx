
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col">

      {/* Cabeçalho */}
      <header className="bg-slate-900 text-white px-8 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">
            📦 StockControl
          </h1>

          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition"
          >
            Entrar
          </Link>
        </div>
      </header>

      {/* Conteúdo principal */}
      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Apresentação */}
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
              Sistema de Gerenciamento
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-4 leading-tight">
              Controle seu estoque de forma
              <span className="text-blue-600"> simples e eficiente.</span>
            </h2>

            <p className="text-slate-600 text-lg mt-6 leading-relaxed">
              Gerencie seus produtos, registre entradas e saídas
              e acompanhe a disponibilidade dos itens em um
              único sistema.
            </p>

            <Link
              href="/login"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow transition"
            >
              Acessar o Sistema →
            </Link>
          </div>

          {/* Recursos do sistema */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">

            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Funcionalidades
            </h3>

            <div className="space-y-6">

              <div className="flex gap-4 items-start">
                <div className="bg-blue-100 p-3 rounded-xl text-2xl">
                  📦
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    Cadastro de Produtos
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Cadastre, consulte, edite e exclua produtos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-emerald-100 p-3 rounded-xl text-2xl">
                  📊
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    Gestão de Estoque
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Registre movimentações de entrada e saída.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-amber-100 p-3 rounded-xl text-2xl">
                  ⚠️
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    Alertas de Estoque
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Identifique produtos abaixo do estoque mínimo.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="text-center text-slate-500 text-sm py-5 border-t border-slate-200">
        © 2026 StockControl — Sistema de Controle de Estoque
      </footer>

    </main>
  );
}
