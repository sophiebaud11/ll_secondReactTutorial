import React, { useState } from 'react'

export default function Form({ onSearchSubmit }) {
  const [searchValue, setSearch] = useState(null)

  return (
    <div>
      <label>
        GIF:<br />
        <input type="text" onChange={e => setSearch(e.target.value)}/>
      </label>
      <button onClick={() => onSearchSubmit(searchValue)}>Search!</button>
    </div>
  )
}
