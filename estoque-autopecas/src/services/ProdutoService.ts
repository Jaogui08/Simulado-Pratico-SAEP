import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { ProdutoProps } from '../interfaces';

export class ProdutoService {
    constructor(private repo: ProdutoRepository) {}

    private mapper(p: any) {
        return {
            id: p.getId,
            codigo: p.getCodigo,
            descricao: p.getDescricao,
            quantidade: p.getQuantidade,
            valorUnitario: p.getValorUnitario,
            estoqueMinimo: p.getEstoqueMinimo
        };
    }

    async listar() {
        const lista = await this.repo.listarTodos();
        return lista.map(p => this.mapper(p));
    }

    async buscar(id: number) {
        const p = await this.repo.buscarPorId(id);
        if (!p) throw new Error("Produto não encontrado.");
        return this.mapper(p);
    }

    async cadastrar(props: ProdutoProps) {
        if (!props.codigo || !props.descricao) throw new Error("Código e Descrição são obrigatórios.");
        const p = await this.repo.criar(props);
        return this.mapper(p);
    }

    async atualizar(id: number, props: Partial<ProdutoProps>) {
        await this.buscar(id);
        const p = await this.repo.atualizar(id, props);
        return this.mapper(p);
    }

    async excluir(id: number) {
        await this.buscar(id);
        return await this.repo.excluir(id);
    }
}