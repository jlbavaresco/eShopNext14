create table categorias (
   codigo serial not null primary key, 
   nome varchar (40) not null
);

create table produtos (
   codigo serial not null primary key, 
   nome varchar (50) not null,
   descricao text, 
   quantidade_estoque integer,
   check (quantidade_estoque >= 0),
   ativo boolean not null, 
   valor numeric(12,2) not null, 
   check (valor >= 0),
   data_cadastro date not null, 
   categoria integer not null, 
   foreign key (categoria) references categorias (codigo)
);

-- inserindo registros
-- categorias 
insert into categorias (nome) values ('Eletrônicos') , ('Eletrodomésticos') , ('Informática');

-- produtos

insert into produtos (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria)
values ('Mouse USB','Mouse USB', 20, true, 60.0, current_date,1), 
('Mouse Sem FIO','Mouse sem fio', 10, true, 120.0, current_date,1),
('Teclado USB','Teclado USB', 30, true, 500.0, current_date,1);

-- criação da tabela usuários
create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

-- inserindo alguns registros na tabela usuários
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('jorgebavaresco@ifsul.edu.br', '123456', 'A','(54)99984-4348','Jorge Bavaresco'), 
('joao@ifsul.edu.br', '123456', 'U','(54)44484-4348','Joao');