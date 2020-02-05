import React, { useState } from 'react'
import { Row, Col } from 'shards-react'

export default function Form({ onSearchSubmit }) {
  const [searchValue, setSearch] = useState(null)
  var labelStyle = {
    display: 'block',
    fontFamily: '"Georgia", serif',
    fontSize: '25px',
    color: 'white',
    textAlign: 'center',
    marginBottom: '10px',
    textShadow: '2px 2px #4d194d'
  }
  var formStyle = {
    display: 'block',
    width: '200px',
    boxSizing: 'border-box',
    border: '2px solid #4d194d',
    borderRadius: '4px',
    fontSize: '16px',
    color: '#4d194d',
    backgroundColor: 'white',
    padding: '12px 20px 12px 20px',
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
    margin: '10px',
    fontSize: '15px',
  }
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
        <button style={buttonStyle} onClick={() => onSearchSubmit(searchValue)}>Submit!</button>
      </Row>
    </Col>
  )
}
