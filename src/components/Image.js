import React, {useState} from 'react'
import { Row, Col } from 'shards-react'

export default function Image({ src }) {
  const [counterValue, setCounter] = useState(0)
  console.log(src)
  var gifStyle = {
    border: '0',
  }
  var buttonStyle = {
    display: 'block',
    color: '#4d194d',
    textShadow: '1px 1px white',
    borderRadius: '4px',
    fontFamily: '"Georgia", serif',
    cursor: 'pointer',
    borderColor: '#4d194d',
    borderRadius: '2px',
    backgroundColor: '#e6b3e6',
    padding: '8px 15px',
    width: '100px',
    fontSize: '15px',
    margin: '10px'
  }

  function refreshPage() {
    window.location.reload(false);
  }
  function incrementCounter(setCounter, counterValue) {
      if (counterValue === 19) {
        setCounter(0)
      }
      else {
        setCounter(counterValue + 1)
      }
  }

  if (!src) {
    console.log("no gif url")
  } else {
      return (
        <>
        <Col style={{marginTop: "20%"}}>
          <Row style={{display: 'flex', justifyContent: "center"}}>
            <button style={buttonStyle} onClick={refreshPage}>Back</button>
          </Row>
          <Row style={{display: 'flex', justifyContent: "center"}}>
            <iframe style={gifStyle} src={src[counterValue].embed_url} title={src[counterValue].title} width={src[counterValue].images.original.width} />
          </Row>
          <Row style={{display: 'flex', justifyContent: "center"}}>
            <button style={buttonStyle} onClick={() => incrementCounter(setCounter, counterValue) }>Shuffle!</button>
          </Row>
        </Col>
        </>
      )
    }
}
