import React, { useState } from 'react'
import { Row, Col } from 'shards-react'
import { formStyle, labelStyle, formButtonStyle } from './style'

export default function Form({ onSearchSubmit }) {
  const [searchValue, setSearch] = useState(null)
  return (
    <Col style={{marginTop: "20%"}}>
      <Row style={{display: 'flex', justifyContent: "center"}}>
        <div style={labelStyle}>
          Search a GIF:
        </div>
      </Row>
      <Row style={{display: 'flex', justifyContent: "center"}}>
        <input type="text" style={formStyle} onChange={e => setSearch(e.target.value)}/>
      </Row>
      <Row style={{display: 'flex', justifyContent: "center"}}>
        <button style={formButtonStyle} onClick={() => onSearchSubmit(searchValue)}>Submit!</button>
      </Row>
    </Col>
  )
}
