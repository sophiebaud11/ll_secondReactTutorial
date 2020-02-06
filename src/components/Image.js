import React, {useState} from 'react'
import { Row, Col } from 'shards-react'
import { gifStyle, imgButtonStyle } from './style'

export default function Image({ src, refresh }) {
  const [counterValue, setCounter] = useState(0)
  console.log(src)

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
            <button style={imgButtonStyle} onClick={() => refresh(true)}>Back</button>
          </Row>
          <Row style={{display: 'flex', justifyContent: "center"}}>
            <iframe style={gifStyle} src={src[counterValue].embed_url} title={src[counterValue].title} width={src[counterValue].images.original.width} />
          </Row>
          <Row style={{display: 'flex', justifyContent: "center"}}>
            <button style={imgButtonStyle} onClick={() => incrementCounter(setCounter, counterValue) }>Shuffle!</button>
          </Row>
        </Col>
        </>
      )
    }
}
