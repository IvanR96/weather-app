import { Cloud } from 'lucide-react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar = () =>{
    return(
        <Navbar data-bs-theme="dark">
        <Container>
          <Navbar.Brand className='justify-content-start' href="#home"> <Cloud className='mx-2'/>Weather App</Navbar.Brand>
        </Container>
      </Navbar>
    )
}
