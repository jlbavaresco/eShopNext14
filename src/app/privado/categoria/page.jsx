import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getCategoriasDB, deleteCategoriaDB } from '@/bd/useCases/categoriaUseCases';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const revalidate = 60; // revalida a cada 30 segundos

const deleteCategoria = async (codigo) => {
    'use server';
    try {
        await deleteCategoriaDB(codigo);
    } catch (err) {
        console.log(err);
        throw new Error('Erro: ' + err);
    }
    revalidatePath('/privado/categoria/');
    redirect('/privado/categoria/');
};

export default async function Categoria() {

    const categorias = await getCategoriasDB();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Categorias</h1>
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
                                    <Button variant="danger" type='submit'>
                                        <i className="bi bi-trash"></i>
                                    </Button>
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