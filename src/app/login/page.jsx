'use client'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signIn, signOut } from "next-auth/react";

export default async function Login() {

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div style={{ textAlign: 'center' }}>
          <h2>Login de Usuário</h2>
        </div>

        <div className="col-12 col-md-6">        
          <Form action={signIn}>
            <Form.Group className="mb-3" controlId="txtEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Informe o email" 
              name="email"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="txtSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" name="senha" />
            </Form.Group>
            <div className="form-group text-center mt-3">
              <Button variant="primary" type="submit">
                Efetuar Login
              </Button>
            </div>
          </Form>
          
        </div>

      </div>
    </div>
  )
}