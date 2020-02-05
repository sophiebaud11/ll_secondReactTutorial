import React, {useState} from 'react'

export default function Image({ src }) {
  const [counterValue, setCounter] = useState(0)

  function refreshPage() {
    window.location.reload(false);
  }
  function incrementCounter(setCounter, counterValue) {
    setCounter(counterValue + 1)
  }

  if (!src) {
    console.log("no gif url")
  } else {
      return (
        <>
          <div>
            <iframe src={src[counterValue].embed_url} title={src[counterValue].title} width="500px" />
          </div>
          <div>
            <button onClick={refreshPage}>Click to search again!</button>
            <button onClick={() => incrementCounter(setCounter, counterValue) }>Shuffle for a new GIF!</button>
          </div>
        </>
      )
    }
}
