import {useState, useEffect} from 'react';
import {Card, Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap';

import StopWord from '../assets/Stopword';

const StopwordChecker = () => {

  const [result, setResult] = useState('');
  const [text, setText] = useState('');

  const [stopList, setStopWord] = useState([]);
  const [customClassName, setClassName] = useState('');

  const handleClick = () => {

    const allText = text.split(" ");

    if(allText.length > 1) {
      const res = `HANYA BOLEH MENGUJI SATU KATA`;

      setResult(res);
    } else {
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
  }

  const ShowResult = () => {
    if(result !== "") {
      return (
        <Card className={customClassName}>
          <Card.Body>
            <Card.Text className="text-center">
              {result}
            </Card.Text>
          </Card.Body>
        </Card>
      )
    } else {
      return (
        <Card className={customClassName}>
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

    const handleResize = e => {
      const windowSize = window.innerWidth;
      const tempClass = (windowSize >= 576) ? '' : 'mt-2';

      setClassName(tempClass);
    };

    window.addEventListener('resize', handleResize);

  }, [])

  return (
    <Row>
      <Col md={6} xs={12}>
        <InputGroup>
          <FormControl placeholder="Type one word here..." className="custom-input" value={text} onChange={(e) => setText(e.target.value)} />
          <Button variant="outline-secondary" onClick={handleClick}>
            CHECK
          </Button>
        </InputGroup>
      </Col>
      <Col md={6} xs={12}>
        <ShowResult />
      </Col>
    </Row>
  )
}

export default StopwordChecker;