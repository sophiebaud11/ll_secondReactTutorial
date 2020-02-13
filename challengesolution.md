# Challenge Solution Walkthrough

### Contents
[What You'll Make](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#what-youll-make)\
[Refresh Button](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#refresh-button)\
[Shuffle Button](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#shuffle-button)\
[Increment Function](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#increment-function)\

### What You'll Make

In this challenge, you'll make two buttons: a refresh button, which sends the user back to the beginning of the App so they can enter more search values, and a shuffle button, which displays a new GIF each time out of the ones collected in App.js's API call.

### Refresh Button

What we mean by a 'refresh' (or 'back') button is one that sends you back to the Form page. Luckily for us, we control the display of the Form page using a state variable in App, which we can easily pass down to Image.js (where our button will live!).

:collision: First, let's make this button in Image.js, right above our GIF:
```
<Col style={{marginTop: "20%"}}>
  <Row style={{display: 'flex', justifyContent: "center"}}>
    <button style={imgButtonStyle}}>Back</button>
  </Row>
  <Row style={{display: 'flex', justifyContent: "center"}}>
    <iframe style={gifStyle} src={src[counterValue].embed_url} title={src[counterValue].title} width={src[counterValue].images.original.width} />
  </Row>
</Col>

```
Buttons have an `onClick` property (hopefully that sounds familiar from the last tutorial!) which enable us to call a certain function when the button is pressed. In this case, we'll want to call a function that changes the `showForm` state back to `true`, as opposed to `false`, which is its state whenever a GIF is showing.

In order to do so, we need to pass the `setShowForm` state variable down to Form as a prop. If you remember, there's two things we'll have to edit to do this: one, Image's return statement in App, and two, the parameters of the main function of the Image component.

:collision: After doing so, the return statement of App.js and main function of Image.js should look like this (respectively):
```diff
if (showForm) {
  return <Form onSearchSubmit={loadData} />
} else {
+  return <Image src={queryData} refresh={setShowForm} />
}}

```
```diff
+ export default function Image({ src, refresh }) {
  if (!src) {
    console.log("no gif url")
  } else {
      return (
        <>
        <Col style={{marginTop: "20%"}}>
          <Row style={{display: 'flex', justifyContent: "center"}}>
            <button style={imgButtonStyle}>Back</button>
          </Row>
          <Row style={{display: 'flex', justifyContent: "center"}}>
            <iframe style={gifStyle} src={src[0].embed_url} title={src[0].title} width={src[0].images.original.width} />
          </Row>
        </Col>
        </>
      )
    }
}

```
Now, we can move on to writing the `onClick()` function where we'll return `showForm` to `true` (and thus, render the form for the user to see again)!

To do so, we'll add `onClick()` as an attribute of the `button` tag, which will use the [fat arrow function](https://flaviocopes.com/javascript-arrow-functions/) syntax to update `refresh`.

:collision: Give this a try. When you're done, it should look like this:
```diff
<Row style={{display: 'flex', justifyContent: "center"}}>
+  <button style={imgButtonStyle} onClick={() => refresh(true)}>Back</button>
</Row>
```
Test the button out—it should work now. Great job!

Let's move on to part two of this challenge: creating our shuffle button.

### Shuffle button

This is going to be a trickier challenge than the refresh button was, but hopefully once we think it through, it won't seem like such a difficult undertaking! We want this shuffle button to send us to the next GIF in the collection of GIFs we've gotten from the API call.

In order to do that, we need to create a button that triggers a function which increments a counter. That counter will tell us which index we're at in our GIF data—which will have to be somewhere between 0 and 19, because our limit on the API call was 20. Then, we need to change all of the indexes of 0 that are referenced in rendering the image to instead be made up of whatever number the increment counter is on at that time!

Hopefully this is ringing a bell: our counter value needs to be a state variable, and our button needs an `onClick()` function to initiate the increment counter.

:collision: Let's start by adding the Shuffle button below our other divs (essentially the same way we made the Refresh Button!):
```diff
<Col style={{marginTop: "20%"}}>
  <Row style={{display: 'flex', justifyContent: "center"}}>
    <button style={imgButtonStyle} onClick={() => refresh(true)}>Back</button>
  </Row>
  <Row style={{display: 'flex', justifyContent: "center"}}>
    <iframe style={gifStyle} src={src[0].embed_url} title={src[0].title} width={src[0].images.original.width} />
  </Row>
+  <Row style={{display: 'flex', justifyContent: "center"}}>
+    <button style={imgButtonStyle} onClick={() => }>Shuffle!</button>
+  </Row>
</Col>

```

Our `onClick()` function is currently triggering nothing, but we're going to fix that once we write the function that will increment our counter.

:collision: First, though, let's create a counter state, initialized at 0, at the beginning of the function `Image()`:
```
const [counterValue, setCounter] = useState(0)
```

Nice job! Now, we're free to start working on our increment counter function.

### Increment Function

Before we write any code, let's think about the logic of this function. What do we want it to do, exactly?

It should check the value of the counter state variable, and if it's less than 19, increment it by 1. If it is equal to 19, we want to send it back to the first index (0), because that means we've shuffled through all of our available GIFs, so we have to start from the beginning again! Think about what that should look like in terms of Javascript's function syntax.

:collision: Once you've finished writing it, it should look like this:
```
function incrementCounter(setCounter, counterValue) {
  if (counterValue === 19) {
    setCounter(0)
  }
  else {
    setCounter(counterValue + 1)
  }
}
```
Note that we have to pass `setCounter` and `counterValue` into the function as parameters, because we'll be using both to check and update the state value.

Now that we've got this function written, we just have to call it inside our Shuffle button!

That will have the same syntax as the Refresh button's `onClick()` attribute, but with a call of `incrementCounter(setCounter, counterValue)` instead of `refresh(true)`. Don't forget to update the indexes to `counterValue` instead of `[0]`!

:collision: In the end, your Image.js file should look like this:
```diff
import React, {useState} from 'react'
import { Row, Col } from 'shards-react'
import { gifStyle, imgButtonStyle } from './style'

export default function Image({ src, refresh }) {
+  const [counterValue, setCounter] = useState(0)

+  function incrementCounter(setCounter, counterValue) {
+      if (counterValue === 19) {
+        setCounter(0)
+      }
+      else {
+        setCounter(counterValue + 1)
+      }
+  }

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
+          <Row style={{display: 'flex', justifyContent: "center"}}>
+            <button style={imgButtonStyle} onClick={() => incrementCounter(setCounter, counterValue) }>Shuffle!</button>
+          </Row>
        </Col>
        </>
      )
    }
}

```
Amazing work! You've now completed all of the second React tutorial. Go celebrate by searching, refreshing, and shuffling some GIFs!
