import React, { useState } from 'react';
import axios from 'axios';
import Form from './Form';
import Image from './Image';

function App() {
  const [queryData, setData] = useState(null)
  const [showForm, setShowForm] = useState(true)
  async function loadData(searchValue) {
    try {
      const requestConfig = {
        method: 'get',
        url: 'http://api.giphy.com/v1/gifs/search',
        params: {
          q: searchValue,
          limit: 20,
          api_key: 'C0l1758WeHyEa6niR8hdE7uUpVqQhJrx'
        },
        type: 'application/json',
      }
      const searchResult = await axios(requestConfig)
      setData(searchResult.data.data)
      setShowForm(false)
    } catch (err) {
      console.log(err)
    }
  }
  function onSearchSubmit(searchValue) {
    loadData(searchValue)
  }
  if(showForm) {
    return (
      <Form onSearchSubmit={onSearchSubmit} />
    )
  }
  else {
    return (
      <div>
        <Image src={queryData} />
      </div>
    )

  }}

export default App;
