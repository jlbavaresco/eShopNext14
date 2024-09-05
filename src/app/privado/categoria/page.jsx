import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getCategoriasDB, deleteCategoriaDB } from '@/bd/useCases/categoriaUseCases';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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

    const categorias = await getCategoriasDB();

    return (
        <>
            <h1>Categorias</h1>
            {message && <p style={{ color: 'red' }}>{message}</p>}
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
                                <Button variant="info" ><i className="bi bi-pencil-square"></i></Button>
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
        </>
    )
}