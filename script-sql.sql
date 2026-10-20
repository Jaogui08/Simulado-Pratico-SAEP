USE saep_db;

INSERT INTO Usuario (nome, email, senha) VALUES
('Administrador', 'admin@autopecas.com', 'admin123'),
('Estoquista', 'estoquista@autopecas.com', 'estoque123'),
('Gerente', 'gerente@autopecas.com', 'gerente123');

INSERT INTO Produto (codigo, descricao, quantidade, valor_unitario, estoque_minimo) VALUES
('PEC001', 'Pastilha de Freio - VW Gol 2018', 20, 89.90, 5),
('PEC002', 'Filtro de Óleo - Chevrolet Onix 2020', 15, 32.50, 5),
('PEC003', 'Vela de Ignição - Fiat Argo 2021', 30, 24.90, 10);

INSERT INTO Movimentacao (produto_id, usuario_id, tipo, quantidade) VALUES
(1, 1, 'ENTRADA', 20),
(2, 2, 'ENTRADA', 15),
(3, 3, 'ENTRADA', 30);