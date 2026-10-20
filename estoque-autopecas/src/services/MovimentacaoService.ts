
import { MovimentacaoRepository } from '../repositories/MovimentacaoRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { MovimentacaoProps } from '../interfaces';

export class MovimentacaoService {
    constructor(
        private movRepo: MovimentacaoRepository,
        private prodRepo: ProdutoRepository
    ) {}

    async registrar(props: MovimentacaoProps) {

        // Validar quantidade
        if (
            !Number.isInteger(props.quantidade) ||
            props.quantidade <= 0
        ) {
            throw new Error("Quantidade deve ser um inteiro maior que zero.");
        }

        // Validar tipo
        if (props.tipo !== 'ENTRADA' && props.tipo !== 'SAIDA') {
            throw new Error("Tipo de movimentação inválido.");
        }

        // Validar IDs
        if (
            !Number.isInteger(props.produtoId) ||
            !Number.isInteger(props.usuarioId) ||
            props.produtoId <= 0 ||
            props.usuarioId <= 0
        ) {
            throw new Error("Produto ou usuário inválido.");
        }

        // Validar e converter a data
        if (props.data) {
            const valor = String(props.data);

            if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
                throw new Error("Formato de data inválido.");
            }

            const data = new Date(`${valor}T12:00:00.000Z`);

            if (
                Number.isNaN(data.getTime()) ||
                data.toISOString().slice(0, 10) !== valor
            ) {
                throw new Error("Data inválida.");
            }

            props.data = data;
        }

        // Buscar produto
        const produto = await this.prodRepo.buscarPorId(props.produtoId);

        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        // Verificar estoque disponível
        if (
            props.tipo === 'SAIDA' &&
            produto.getQuantidade < props.quantidade
        ) {
            throw new Error("Estoque insuficiente.");
        }

        // Calcular novo estoque
        const novoEstoque = props.tipo === 'ENTRADA'
            ? produto.getQuantidade + props.quantidade
            : produto.getQuantidade - props.quantidade;

        // Atualizar quantidade na entidade
        produto.setQuantidade = novoEstoque;

        // Atualizar quantidade no banco de dados
        await this.prodRepo.atualizar(props.produtoId, {
            quantidade: novoEstoque
        });

        // Registrar movimentação
        await this.movRepo.criar(props);

        // Alerta de estoque abaixo do mínimo
        if (novoEstoque < produto.getEstoqueMinimo) {
            return {
                sucesso: true,
                alerta: `Atenção: O estoque do produto ${produto.getDescricao} está abaixo do mínimo!`
            };
        }

        return {
            sucesso: true,
            alerta: null
        };
    }

    async listar() {
        const lista = await this.movRepo.listarTodos();

        return lista.map(m => ({
            id: m.getId,
            produtoId: m.getProdutoId,
            usuarioId: m.getUsuarioId,
            tipo: m.getTipo,
            quantidade: m.getQuantidade,
            data: m.getData
        }));
    }

    async excluir(id: number) {
        return await this.movRepo.excluir(id);
    }
}
