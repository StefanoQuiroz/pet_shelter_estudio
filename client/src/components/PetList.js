import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Table, Row } from 'reactstrap';

const PetList = (props) => {
    const {datos, setDatos} = props;
    
    return (
        <Container>
            <Row>
                <h1>Pet Shelter<Link to={`/pets/new`} style={{float:'right', fontSize:'1.5rem'}}>add a pet the shelter</Link></h1>
            </Row>
            <Row>
                <p style={{fontSize:'2.5rem'}}>These pets are looking form a good home</p>
            </Row>
            <Row>
                <Table style={{boder:'2.5px solid black'}}>
                    <thead style={{backgroundColor:'#9b9a99'}}>
                    <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos && datos.map((pet, index)=>(
                            <tr key={index}>
                            <th>{pet.petName}</th>
                            <th>{pet.petType}</th>
                            <th>
                                <Link to={`/pets/${pet._id}`} style={{marginLeft:'1rem'}}>details</Link>
                                <Link to={`/pets/${pet._id}`} style={{marginLeft:'1rem'}}>edit</Link>
                            </th>
                        </tr>))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default PetList;