const { pool } = require('./config');
const Produto = require('./produto')

const getProdutosDB = async () => {
    try {    
        const { rows } = await pool.query(`select p.codigo as codigo, p.nome as nome, p.descricao as descricao, p.quantidade_estoque as quantidade_estoque, 
         p.valor as valor, to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro
        from produtos p       
        order by p.codigo`);
        return rows.map((produto) => new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, 
             produto.valor, produto.data_cadastro));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addProdutoDB = async (objeto) => {
    try {   
        const { nome, descricao, quantidade_estoque, valor, data_cadastro } = objeto; 
        const results = await pool.query(`INSERT INTO produtos (nome, descricao, quantidade_estoque, valor, data_cadastro) 
            VALUES ($1, $2, $3, $4, $5)
            returning codigo, nome, descricao, quantidade_estoque, valor, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro`,
        [nome, descricao, quantidade_estoque, valor, data_cadastro]);
        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, 
             produto.valor, produto.data_cadastro);
    } catch (err) {
        throw "Erro ao inserir o produto: " + err;
    }    
}

const updateProdutoDB = async (objeto) => {
    try {   
        const { codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria }  = objeto; 
        const results = await pool.query(`UPDATE produtos set nome = $2 , descricao = $3, quantidade_estoque = $4, 
        valor = $5, data_cadastro = $6 where codigo = $1
        returning codigo, nome, descricao, quantidade_estoque,  valor, to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro`,
        [codigo, nome, descricao, quantidade_estoque, valor, data_cadastro]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, 
             produto.valor, produto.data_cadastro);
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }      
}

const deleteProdutoDB = async (codigo) => {
    try {           
        const results = await pool.query(` DELETE FROM produtos where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Produto removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o produto: " + err;
    }     
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`select p.codigo as codigo, p.nome as nome, p.descricao as descricao, p.quantidade_estoque as quantidade_estoque, 
         p.valor as valor, to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro
        from produtos p  where p.codigo = $1     
        order by p.codigo `,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const produto = results.rows[0];
            return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, 
                produto.valor, produto.data_cadastro);
        }       
    } catch (err) {
        throw "Erro ao recuperar o produto: " + err;
    }     
}

module.exports = {
    getProdutosDB, addProdutoDB, updateProdutoDB, deleteProdutoDB, getProdutoPorCodigoDB
}
