import {useState, useEffect} from 'react';
import {Container, Row, Col, InputGroup, FormControl, Button, Card} from 'react-bootstrap';

import StopWord from './assets/Stopword';
import './assets/style.css';

const StopwordChecker = () => {

  const [result, setResult] = useState('');
  const [text, setText] = useState('');

  const [stopList, setStopWord] = useState([]);

  const handleClick = () => {
    let isStopword = false;

    stopList.forEach(word => {
      if(word.toUpperCase() === text.toUpperCase() ) {
        isStopword = true;
      }
    })

    const temp = (isStopword) ? 'ADALAH STOPWORD': 'BUKAN STOPWORD';

    const res = `KATA "${text.toUpperCase()}" ${temp}`;

    setResult(res);
  }

  const ShowResult = () => {
    if(result !== "") {
      return (
        <Card>
          <Card.Body>
            <Card.Text className="text-center">
              {result}
            </Card.Text>
          </Card.Body>
        </Card>
      )
    } else {
      return (
        <Card>
          <Card.Body>
            <Card.Text className="text-center">
              NO RESULT YET
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }
  }

  useEffect(() => {
    setStopWord(StopWord);

    document.title = "STOPWORD CHECKER";
  }, [])

  return (
    <Row>
      <Col md={6} xs={12}>
        <InputGroup>
          <FormControl placeholder="Type one word here..." className="custom-input" value={text} onChange={(e) => setText(e.target.value)} />
          <Button variant="outline-secondary" onClick={handleClick}>
            Check
          </Button>
        </InputGroup>
      </Col>
      <Col md={6} xs={12}>
        <ShowResult />
      </Col>
    </Row>
  )
}

const StopwordRemover = () => {

  const [result, setResult] = useState('');
  const [text, setText] = useState('');

  const [stopList, setStopWord] = useState([]);

  const handleClick = () => {

    let temp = text.split(" ");

    let res = ``;

    temp.forEach(word => {
      let find = false;
      stopList.forEach(stopword => {
        word = word.replace('.', '');
        word = word.replace(',', '');
        word = word.replace(/^\s+|\s+$/gm,'');

        if((word.toUpperCase() === stopword.toUpperCase())) {
          find = true;
        }
      });

      if(!find) {
        res += `${word} `;
      }
    });

    setResult(res);
  }

  useEffect(() => {
    setStopWord(StopWord);

    document.title = "STOPWORD REMOVER";
  }, [])

  return (
    <Row>
      <Col md={6} xs={12}>
        <InputGroup>
          <FormControl as="textarea" placeholder="Type here..." rows={10} value={text} onChange={(e) => setText(e.target.value)} />
        </InputGroup>
        <Button variant="primary" className="mt-2 float-right" onClick={handleClick}>
          Proccess
        </Button>
      </Col>
      <Col md={6} xs={12}>
        <InputGroup>
          <FormControl as="textarea" placeholder="Result here..." readOnly={true} rows={10} value={result} />
        </InputGroup>
      </Col>
    </Row>
  )
}

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
      <Container>
        <Row className="my-4">
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
