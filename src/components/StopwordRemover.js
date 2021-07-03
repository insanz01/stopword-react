import {useState, useEffect} from 'react';
import {Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap';

import StopWord from '../assets/Stopword';

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
        <Button variant="primary" className="my-2 float-right" onClick={handleClick}>
          PROCESS
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

export default StopwordRemover;