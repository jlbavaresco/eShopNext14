import { getProdutosDB } from '@/bd/useCases/produtoUseCases';

export const revalidate = 60; // revalida a cada 30 segundos

export default async function Home() {

  const produtos = await getProdutosDB();
  return (
    <div style={{ padding: '20px' }}>
      <div className="row">

        {produtos.length > 0 && (

          produtos.map(objeto => (

            <div className="col-sm-3" key={objeto.codigo}>
              <div className="card mb-3 text-center">
                <div className="card-header">
                  {objeto.nome}
                </div>
                <div className="card-body ">
                  <h5 className="card-title">{objeto.nome}</h5>
                  <p className="card-text">{objeto.descricao}</p>
                  <p className="card-text"><small className="text-muted">Preço: {objeto.valor}</small></p>
                  <p className="card-text"><small className="text-muted">Categoria: {objeto.categoria_nome}</small></p>
                  <p className="card-text"><small className="text-muted">Estoque: {objeto.quantidade_estoque}</small></p>
                </div>
                <div className="card-footer text-muted">
                  <button type="button" className="btn" >Detalhes do produto</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
