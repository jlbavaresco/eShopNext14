import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getCategoriasDB, deleteCategoriaDB } from '@/bd/useCases/categoriaUseCases';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Alerta from '@/componentes/comuns/Alerta';

export const revalidate = 60; // revalida a cada 30 segundos

const deleteCategoria = async (codigo) => {
    'use server';
    let error = "";
    try {
        await deleteCategoriaDB(codigo);

    } catch (err) {
        console.log(err);
        error = 'Erro: ' + err;
    }

    if (error.length > 0) {
        redirect(`/privado/categoria/?message=${error}`);
    } else {
        revalidatePath('/privado/categoria/');
        redirect('/privado/categoria/');
    }
};


export default async function Categoria({ searchParams }) {

    const message = searchParams?.message || null;

    let alerta = { status: '', message: "" };
    if (message != null) {
        alerta.status = "error";
        alerta.message = message;
    }

    const categorias = await getCategoriasDB();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Categorias</h1>
            <Alerta alerta={alerta} />
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <Link className="btn btn-primary"
                href={`/privado/categoria/${0}/formulario`}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{
                            textAlign: 'center'
                        }}>Ações</th>
                        <th>Código</th>
                        <th>Nome</th>

                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.codigo}>
                            <td align="center">
                                <Link className="btn btn-info"
                                    href={`/privado/categoria/${categoria.codigo}/formulario`}>
                                    <i className="bi bi-pencil-square"></i>
                                </Link>
                                <form action={deleteCategoria.bind(null, categoria.codigo)} className="d-inline">
                                    <Button variant="danger" action={deleteCategoria.bind(null, categoria.codigo)}
                                        type='submit'><i className="bi bi-trash"></i></Button>
                                </form>
                            </td>
                            <td>{categoria.codigo}</td>
                            <td>{categoria.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}