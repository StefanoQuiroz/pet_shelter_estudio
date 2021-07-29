import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Form, FormGroup, Col, Row, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import axios from 'axios';


const PetForm = (props) => {
    const history = useHistory();
    
    const home = (event) => {
        history.push("/");
    }
    const {datos, setDatos} = props;


    const [input, setInput] = useState({
        petName: "",
        petType: "",
        petDescription: "",
        skillOne: "Nothing",
        skillTwo: "Nothing",
        skillThree: "Nothing"
        
    })

    const onChange = (event) => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]:value
        })
    }
   

    const createPet = (event) => {
        axios.post("/api/pet/new", input)
            .then(response => {
                if(response.data&&response.data.data){
                    setDatos(datos.concat([response.data.data]));
                    home(event);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Add a Pet Form",
                        text: response.data.message
                    })
                }
            })
            .catch(err => Swal.fire({
                icon: "error",
                title: "Loading Data not response",
                text: "An error occurred while creating a project"
            }))
    }


    const onSubmit = (event) => {
        event.preventDefault();
        createPet(event);
    }

    const {petName, petType, petDescription, skillOne, skillTwo, skillThree} = input;

   
    return (
        <div>
            <Container>
            <Row>
                <h1>Pet Shelter <Link to={`/`} style={{float:'right', fontSize:'1.5rem'}}>Go back</Link></h1>
            </Row>
            <Row>
                <p style={{fontSize:'2.5trem'}}>Know a pet needing a home?</p>
            </Row>
            <Row>
                <Form onSubmit={onSubmit}>           
                    <Row style={{border:'2px solid black'}}>
                        <Col sm={6}>
                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="type" style={{fontWeight:'600'}}>Pet Name : </Label>
                                <Input type="text" name="petName" id="name" value={petName} onChange={onChange} style={{border: '2px solid black'}} required/>
                                {(petName.length > 0 && petName.length<4) && <p style={{color:'red', fontSize:'1.3rem'}}>El nombre es muy corto</p>}              
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="type" style={{fontWeight:'600'}}>Pet Type: </Label>
                                <Input type="text" name="petType" id="type" value={petType} onChange={onChange} style={{border: '2px solid black'}} required/>
                                {(petType.length > 0 && petType.length<3) && <p style={{color:'red', fontSize:'1.3rem'}}>El tipo es muy corto</p>}              
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="type" style={{fontWeight:'600'}}>Description : </Label>
                                <Input type="text" name="petDescription" id="type" value={petDescription} onChange={onChange} style={{border: '2px solid black'}} required/>
                                {(petDescription.length > 0 && petDescription.length<3) && <p style={{color:'red', fontSize:'1.3rem'}}>La opción debe ser más larga</p>}              
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Col xs>
                                    <Button size='lg' style={{backgroundColor: '#6495ED', width:'100%', color:'#000' , fontWeight:'bold', border:'2px solid black'}} type="submit" >Add Pet</Button>
                                </Col>
                            </FormGroup>
                        </Col>

                        <Col sm={6}>
                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="skillOne" style={{fontWeight:'600'}}>Skill One</Label>
                                <Input type="text" name="skillOne" id="skillOne" value={skillOne} onChange={onChange} style={{border: '2px solid black'}}/>             
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="skillTwo" style={{fontWeight:'600'}}>Skill Two</Label>
                                <Input type="text" name="skillTwo" id="skillTwo" value={skillTwo} onChange={onChange} style={{border: '2px solid black'}}/>             
                            </FormGroup>

                            <FormGroup row style={{padding: '1rem'}}>
                                <Label for="skillThree" style={{fontWeight:'600'}}>Skill Three</Label>
                                 <Input type="text" name="skillThree" id="skillThree" value={skillThree} onChange={onChange} style={{border: '2px solid black'}}/>            
                            </FormGroup>
                        </Col>       
                    </Row>        
                </Form>
            </Row>
        </Container>
            
        </div>
    )
}

export default PetForm;