'use client'

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
export default function CampoEntrada(props) {
    return (
        <FloatingLabel controlId={props.id} label={props.label}>
            <Form.Control type={props.tipo} name={props.name} defaultValue={props.value} />
        </FloatingLabel>
    )
}