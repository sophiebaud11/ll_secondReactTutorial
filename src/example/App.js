import React, { useState } from 'react'
import axios from 'axios'
import Form from './Form'
import Image from './Image'
import { API_KEY } from '../auth'

export default function App() {
  const [queryData, setData] = useState(null)
  const [showForm, setShowForm] = useState(true)

  async function loadData(searchValue) {
    if (!searchValue) {
      alert("enter a search value!")
      return
    }
    try {
      const requestConfig = {
        method: 'get',
        url: 'http://api.giphy.com/v1/gifs/search',
        params: {
          q: searchValue,
          limit: 20,
          api_key: API_KEY,
        },
        type: 'application/json',
      }
      const searchResult = await axios(requestConfig)
      setData(searchResult.data.data)
      setShowForm(false)
    } catch (err) {
      alert(err)
    }
  }

  if (showForm) {
    return <Form onSearchSubmit={loadData} />
  } else {
    return <Image src={queryData} refresh={setShowForm} />
  }}
