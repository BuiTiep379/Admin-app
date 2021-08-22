import React from 'react'
import { Form } from 'react-bootstrap'
/**
* @author
* @function Input
**/

const Input = (props) => {
    return (
        <Form.Group style={{"marginBottom": "10px"}}>
           {props.label && <Form.Label>{props.label}</Form.Label>}
            <Form.Control type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} {...props}/>
            <Form.Text className="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    )

}

export default Input