import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getCategoriaPorCodigoDB, updateCategoriaDB, addCategoriaDB } from '@/bd/useCases/categoriaUseCases';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CampoEntrada from '@/componentes/comuns/CampoEntrada';


const FormularioPage = async ({ params, searchParams }) => {

    const message = searchParams?.message || null;
    let categoria = null;
    if (params.codigo == 0) {
        categoria = { codigo: 0, nome: "" };
    } else {
        categoria = await getCategoriaPorCodigoDB(params.codigo);
    }


    const salvarCategoria = async (formData) => {
        'use server';

        const objeto = {
            codigo: formData.get('codigo'),
            nome: formData.get('nome')
        }
        let error = "";
        try {
            if (objeto.codigo == 0) {
                await addCategoriaDB(objeto)
            } else {
                await updateCategoriaDB(objeto)
            }

        } catch (err) {
            error = 'Erro: ' + err;
        }
        if (error.length > 0) {
            redirect(`/categoria/${params.codigo}/formulario?message=${error}`);
        } else {
            revalidatePath('/privado/categoria/');
            redirect('/privado/categoria/');
        }

    };

    if (!categoria) {
        return notFound();
    }

    return (
        <div >
            <div style={{ textAlign: 'center' }}>
                <h2>Categoria</h2>
            </div>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <form action={salvarCategoria} >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="txtCodido" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodido"
                                    name="codigo"
                                    defaultValue={categoria.codigo}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    defaultValue={categoria.nome}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <CampoEntrada id="txtNome2" value={categoria.nome} tipo="text"
                                    label="Nome" />
                            </div>
                            <div className="form-group text-center mt-3">
                                <button type="submit" className="btn btn-success">
                                    Salvar <i className="bi bi-save"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default FormularioPage;