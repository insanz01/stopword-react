import {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';

import StopwordRemover from './components/StopwordRemover';
import StopwordChecker from './components/StopwordChecker';

// import StopWord from './assets/Stopword';
import './assets/style.css';

// vercel --prod to deploy and overwrite

const App = () => {
  const [title, setTitle] = useState('STOPWORD REMOVER');
  const [menu, setMenu] = useState('remover');
  const [anotherMenu, setAnotherMenu] = useState("checker");

  const changeMenu = () => {

    if(menu === "remover") {
      
      setTitle("STOPWORD CHECKER");
      setMenu("checker");
      setAnotherMenu("remover");

    } else if(menu === "checker") {
      
      setTitle("STOPWORD REMOVER");
      setMenu("remover");
      setAnotherMenu("checker");
    
    }
  }

  const DisplayMenu = () => {
    if(menu === "remover") {
      return <StopwordRemover />
    } else if(menu === "checker") {
      return <StopwordChecker />
    }
  }

  return (
    <div>
      <Container className="py-4">
        <Row className="mb-4">
          <Col md={12} xs={12}>
            <h1 className="display-4 text-center text-underline">{title}</h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={7} className="mx-auto">
            <Button variant="success" onClick={changeMenu} block>CHANGE MENU TO {anotherMenu.toUpperCase()}</Button>
          </Col>
        </Row>
        <DisplayMenu />
      </Container>
    </div>
  );
}

export default App;
