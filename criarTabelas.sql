-- schema.sql

-- Garante schema e sequences
CREATE SCHEMA IF NOT EXISTS public;

CREATE SEQUENCE IF NOT EXISTS administradores_id_adm_seq;
CREATE SEQUENCE IF NOT EXISTS usuarios_id_usuario_seq;
CREATE SEQUENCE IF NOT EXISTS carrinhos_id_carrinho_seq;
CREATE SEQUENCE IF NOT EXISTS categorias_id_categoria_seq;
CREATE SEQUENCE IF NOT EXISTS enderecos_id_endereco_seq;
CREATE SEQUENCE IF NOT EXISTS listas_favoritos_id_lista_favoritos_seq;
CREATE SEQUENCE IF NOT EXISTS pedidos_id_pedido_seq;
CREATE SEQUENCE IF NOT EXISTS produtos_id_produto_seq;
CREATE SEQUENCE IF NOT EXISTS itens_carrinho_id_item_carrinho_seq;
CREATE SEQUENCE IF NOT EXISTS itens_lista_favoritos_id_item_lista_favoritos_seq;
CREATE SEQUENCE IF NOT EXISTS itens_pedido_id_item_pedido_seq;
CREATE SEQUENCE IF NOT EXISTS ocasioes_id_ocasiao_seq;

-- Tabela: public.administradores
CREATE TABLE IF NOT EXISTS administradores
(
    id_adm integer NOT NULL DEFAULT nextval('administradores_id_adm_seq'),
    email_adm character varying(255) NOT NULL,
    senha_adm text NOT NULL,
    CONSTRAINT administradores_pkey PRIMARY KEY (id_adm),
    CONSTRAINT administradores_email_adm_key UNIQUE (email_adm)
);

-- Tabela: public.clientes
CREATE TABLE IF NOT EXISTS clientes
(
    id_cliente integer NOT NULL DEFAULT nextval('usuarios_id_usuario_seq'),
    email character varying(255) NOT NULL,
    senha text NOT NULL,
    nome character varying(100) NOT NULL,
    sobrenome character varying(100) NOT NULL,
    celular character varying(20) NOT NULL,
    data_nascimento date,
    cpf character varying(14),
    CONSTRAINT usuarios_pkey PRIMARY KEY (id_cliente),
    CONSTRAINT unique_celular UNIQUE (celular),
    CONSTRAINT unique_cpf UNIQUE (cpf),
    CONSTRAINT unique_email UNIQUE (email)
);

-- Tabela: public.categorias
CREATE TABLE IF NOT EXISTS categorias
(
    id_categoria integer NOT NULL DEFAULT nextval('categorias_id_categoria_seq'),
    categoria character varying(100) NOT NULL,
    CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria)
);

-- Tabela: public.ocasioes
CREATE TABLE IF NOT EXISTS ocasioes
(
    id_ocasiao integer NOT NULL DEFAULT nextval('ocasioes_id_ocasiao_seq'),
    ocasiao character varying(100) NOT NULL,
    CONSTRAINT ocasioes_pkey PRIMARY KEY (id_ocasiao)
);

-- Tabela: public.produtos
CREATE TABLE IF NOT EXISTS produtos
(
    id_produto integer NOT NULL DEFAULT nextval('produtos_id_produto_seq'),
    codigo_produto character varying(50) NOT NULL,
    imagem text,
    banner text,
    nome character varying(255) NOT NULL,
    marca character varying(255) NOT NULL,
    descricao text,
    volume character varying(50),
    familia_olfativa character varying(100),
    concentracao character varying(100),
    preco numeric(10,2) NOT NULL,
    qtde_estoque integer NOT NULL,
    numero_vendas integer DEFAULT 0,
    lancamento boolean DEFAULT true,
    promocao boolean DEFAULT false,
    banner_promocao text,
    descricao_promocao text,
    preco_promocao numeric(10,2),
    ativo boolean DEFAULT true,
    data_lancamento timestamp without time zone,
    data_fim_promocao timestamp without time zone,
    data_vencimento timestamp without time zone,
    CONSTRAINT produtos_pkey PRIMARY KEY (id_produto),
    CONSTRAINT produtos_codigo_produto_key UNIQUE (codigo_produto),
    CONSTRAINT produtos_preco_check CHECK (preco >= 0::numeric),
    CONSTRAINT produtos_qtde_estoque_check CHECK (qtde_estoque >= 0),
    CONSTRAINT produtos_numero_vendas_check CHECK (numero_vendas >= 0),
    CONSTRAINT produtos_preco_promocao_check CHECK (preco_promocao >= 0::numeric)
);

-- Tabela: public.carrinhos
CREATE TABLE IF NOT EXISTS carrinhos
(
    id_carrinho integer NOT NULL DEFAULT nextval('carrinhos_id_carrinho_seq'),
    id_cliente integer NOT NULL,
    CONSTRAINT carrinhos_pkey PRIMARY KEY (id_carrinho),
    CONSTRAINT unique_usuario UNIQUE (id_cliente),
    CONSTRAINT fk_carrinhos_clientes FOREIGN KEY (id_cliente)
        REFERENCES clientes (id_cliente)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Tabela: public.enderecos
CREATE TABLE IF NOT EXISTS enderecos
(
    id_endereco integer NOT NULL DEFAULT nextval('enderecos_id_endereco_seq'),
    id_cliente integer NOT NULL,
    cep character varying(10) NOT NULL,
    logradouro character varying(100) NOT NULL,
    numero integer NOT NULL,
    complemento text,
    ponto_referencia text,
    bairro character varying(100) NOT NULL,
    cidade character varying(100) NOT NULL,
    estado character varying(2) NOT NULL,
    tipo character varying(50) NOT NULL,
    CONSTRAINT enderecos_pkey PRIMARY KEY (id_endereco),
    CONSTRAINT fk_enderecos_clientes FOREIGN KEY (id_cliente)
        REFERENCES clientes (id_cliente)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Tabela: public.listas_favoritos
CREATE TABLE IF NOT EXISTS listas_favoritos
(
    id_lista_favoritos integer NOT NULL DEFAULT nextval('listas_favoritos_id_lista_favoritos_seq'),
    id_cliente integer NOT NULL,
    CONSTRAINT listas_favoritos_pkey PRIMARY KEY (id_lista_favoritos),
    CONSTRAINT unique_lista_cliente UNIQUE (id_cliente),
    CONSTRAINT fk_listas_favoritos_clientes FOREIGN KEY (id_cliente)
        REFERENCES clientes (id_cliente)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Tabela: public.pedidos
CREATE TABLE IF NOT EXISTS pedidos
(
    id_pedido integer NOT NULL DEFAULT nextval('pedidos_id_pedido_seq'),
    id_cliente integer NOT NULL,
    id_endereco integer,
    id_carrinho integer NOT NULL,
    data_pedido timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50) NOT NULL DEFAULT 'Realizado',
    CONSTRAINT pedidos_pkey PRIMARY KEY (id_pedido),
    CONSTRAINT fk_pedidos_clientes FOREIGN KEY (id_cliente)
        REFERENCES clientes (id_cliente)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT pedidos_id_carrinho_fkey FOREIGN KEY (id_carrinho)
        REFERENCES carrinhos (id_carrinho)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pedidos_id_endereco_fkey FOREIGN KEY (id_endereco)
        REFERENCES enderecos (id_endereco)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Tabela: public.categorias_produto
CREATE TABLE IF NOT EXISTS categorias_produto
(
    id_produto integer NOT NULL,
    id_categoria integer NOT NULL,
    CONSTRAINT categorias_produto_pkey PRIMARY KEY (id_produto, id_categoria),
    CONSTRAINT categorias_produto_id_categoria_fkey FOREIGN KEY (id_categoria)
        REFERENCES categorias (id_categoria)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT categorias_produto_id_produto_fkey FOREIGN KEY (id_produto)
        REFERENCES produtos (id_produto)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Tabela: public.ocasioes_produto
CREATE TABLE IF NOT EXISTS ocasioes_produto
(
    id_produto integer NOT NULL,
    id_ocasiao integer NOT NULL,
    CONSTRAINT ocasioes_produto_pkey PRIMARY KEY (id_produto, id_ocasiao),
    CONSTRAINT ocasioes_produto_id_ocasiao_fkey FOREIGN KEY (id_ocasiao)
        REFERENCES ocasioes (id_ocasiao)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ocasioes_produto_id_produto_fkey FOREIGN KEY (id_produto)
        REFERENCES produtos (id_produto)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Tabela: public.itens_carrinho
CREATE TABLE IF NOT EXISTS itens_carrinho
(
    id_item_carrinho integer NOT NULL DEFAULT nextval('itens_carrinho_id_item_carrinho_seq'),
    id_carrinho integer NOT NULL,
    id_produto integer NOT NULL,
    qtde integer DEFAULT 1,
    CONSTRAINT itens_carrinho_pkey PRIMARY KEY (id_item_carrinho),
    CONSTRAINT unique_item UNIQUE (id_carrinho, id_produto),
    CONSTRAINT fk_itens_carrinho_carrinhos FOREIGN KEY (id_carrinho)
        REFERENCES carrinhos (id_carrinho)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT itens_carrinho_id_produto_fkey FOREIGN KEY (id_produto)
        REFERENCES produtos (id_produto)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT itens_carrinho_qtde_check CHECK (qtde > 0)
);

-- Tabela: public.itens_lista_favoritos
CREATE TABLE IF NOT EXISTS itens_lista_favoritos
(
    id_item_lista_favoritos integer NOT NULL DEFAULT nextval('itens_lista_favoritos_id_item_lista_favoritos_seq'),
    id_lista_favoritos integer NOT NULL,
    id_produto integer NOT NULL,
    data_adicionado timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT itens_lista_favoritos_pkey PRIMARY KEY (id_item_lista_favoritos),
    CONSTRAINT unique_item_lista UNIQUE (id_lista_favoritos, id_produto),
    CONSTRAINT fk_itens_lista_favoritos_listas FOREIGN KEY (id_lista_favoritos)
        REFERENCES listas_favoritos (id_lista_favoritos)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT itens_lista_favoritos_id_produto_fkey FOREIGN KEY (id_produto)
        REFERENCES produtos (id_produto)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Tabela: public.itens_pedido
CREATE TABLE IF NOT EXISTS itens_pedido
(
    id_item_pedido integer NOT NULL DEFAULT nextval('itens_pedido_id_item_pedido_seq'),
    id_pedido integer NOT NULL,
    id_produto integer NOT NULL,
    qtde integer NOT NULL,
    preco_unitario numeric(10,2) NOT NULL,
    CONSTRAINT itens_pedido_pkey PRIMARY KEY (id_item_pedido),
    CONSTRAINT fk_itens_pedido_pedidos FOREIGN KEY (id_pedido)
        REFERENCES pedidos (id_pedido)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT itens_pedido_id_produto_fkey FOREIGN KEY (id_produto)
        REFERENCES produtos (id_produto)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT itens_pedido_qtde_check CHECK (qtde > 0),
    CONSTRAINT itens_pedido_preco_unitario_check CHECK (preco_unitario > 0::numeric)
);
