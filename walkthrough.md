# Walkthrough

Welcome to the second tutorial of reactLab #1!

This walkthrough is intended to give you most of the content, both step by step instructions and conceptual knowledge, of our second React tutorial. If you want to skip all the conceptual stuff and just build the app, all the actual todos are marked with this :collision: emoji.

### Contents
[What You'll Make](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#what-youll-make)\
[How to Navigate](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#how-to-navigate)\
[Index.js: The Entry Point](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#the-entry-point)\
[JSX... What?](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#jsx-what)\
[First Component](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#first-component)\
[Composition](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#composition)\
[Props](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#props)\
[Thinking in React](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#thinking-in-react)\
[useState()](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#usestate)\
[Finish the Switch](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#finish-the-switch)\
[Map over Data](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#map-over-data)\
[A Challenge](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#a-challenge)

:collision: To start, clone this repo (On an LL machine open Terminal; then enter the commands `cd development` and `git clone https://github.com/learninglab-dev/ll-first-reactLab.git`) and open the code in your favorite editor by entering `cd ll-first-reactLab` and then `atom .`

[EDIT CLONE LINK]

### What You'll Make
In this tutorial, you'll build an app where you can enter a search term and automatically generate a GIF pulled from the website Giphy! By the time you're finished, you'll have an app that begins with a form in which you can input a query of your choosing and receive a GIF in response!

This requires us to work with states, parent-child component relationships, and functions—all topics that should be familiar from the last tutorial. The important new skill we're learning in this tutorial, though, is how to make fetch data from an API in React. In order to get our GIFs, we'll use the user-inputted search term as a parameter in a call to Giphy's API!

Remember: to get this code up and running, install npm if needed, and enter `npm start` in your terminal. If this isn't sounding familiar to you, check out our first reactLab tutorial here [ADD LINK HERE] for more detailed instructions!

## Set-up
In the Starter folder, you should see three files under Components: `App.js`, `Form.js`, and `Image.js`. App is our parent component, and Form & Image are its children, where (you guessed it!) the code making the form for users to input their GIF search term & the code rendering our GIF will live. Our API call is going to live in App, so that we can pass all that information down to Form & Image. Let's set up App.js now. We need to import a bunch of things to get our program started (right now we'll import React and our child components, but we'll add to this as we go along!).

We also need to return something at the end of our main function. For this app, at any given time we'll either be rendering a form for the user to submit a search term, or a GIF found using that search. This is why we have both a Form and Image component, so that we can alternate between returning each depending on what the user has just done.

Does this kind of situation sound familiar? Hopefully it does, because it's exactly the kind of app for which we'd want to use React's staple feature: states! Let's make a state that we'll use to indicate whether the form is showing or not. This will dictate what we're returning after our function has done its job!

To do so, we'll use the `useState()` function. If you've forgotten about that, check back at the first tutorial here! [ADD LINK]

After you've given this a shot, this is what App.js should look like:
```
import React, { useState } from 'react'
import Form from './Form'
import Image from './Image'

export default function App() {
  const [showForm, setShowForm] = useState(true)
  if (showForm) {
    return <Form />
  } else {
    return <Image />
  }
}

```
Don't worry if you're not seeing anything on `localhost:3000`! We're currently returning our Form component, which we have yet to edit, so right now, App.js won't be rendering much of anything.

Let's try to think of how to replicate this set up in Form & Image, so that we can render something on our screen with App.js! Remember: Form and Image are children of App, so they don't need to import each other, but they do need to import something for React to work, as well as contain some kind of function.

After you've tried this on your own, check out what it should look like for Form.js:
```
import React, { useState } from 'react'

export default function Form() {
  return (
      <div>
        <h1>Form here!</h1>
      </div>
    )
}
```
...and Image.js:
```
import React, { useState } from 'react'

export default function Image() {
  return (
      <div>
        <h1>Image here!</h1>
      </div>
    )
}
```
With that out of the way, let's move on to the fun stuff: making an API call!

## API Call!
In order to make an API call on your own, you'll need to get your own individual API Key. How to do this will be found in the documentation of whatever API you're using, but for the sake of this tutorial, we've gotten an API key for you already! Right now, it's living in auth.js, so we'll need to import at the top of App.js like so:
```
import { API_KEY } from '../auth'
```
All those double dots mean is that auth.js is not in the same direct folder as App.js, so we need to exit the folder once to find it.

Okay. We might be getting ahead of ourselves here. You might be thinking: "What is an API key?" "What even is an API?" And that's totally okay! Let's do some conceptual work now, so we understand what we're doing as we code this API call.

An API (Application Program Interface) is, according to the Dictionary "a set of functions and procedures allowing the creation of applications that access the features or data of an operating system, application, or other service." To simplify further, an API lets us use whatever cool aspects of other software in our own code. In this case, our API call will fetch some of GIPHY's GIF data, using the many parameters they have available for sorting those GIFs.

In order to make this call, we need an API key to gain access to that data, like a password. Anyone who makes an account with GIPHY to use their API can get their own API key, to service their individual needs. In this case, we'll Slack you the API key when we need it!

Now that we know a bit about APIs, let's think about how exactly to make an API call. For this tutorial, we're going to be using a library called `axios` to help us carry out this API call, and fetch the data we need. Feel free to read about `axios` in their documentation [here](https://github.com/axios/axios), if you're curious about what this library can do! Enter `npm install axios` before we start coding.

First, we need a bunch of parameters in order to let the API know what exactly we need from it. If you go to the documentation for GIPHY's API, and look under the [Search Endpoint](https://developers.giphy.com/docs/api/endpoint#endpoint) section, you can see some of the parameters we can edit in our request. In this case, we'll be filling out the following GIPHY parameters: `q`, `limit`, and `api_key`, to specify to GIPHY's API the query we wants GIFs for, number of GIFs we want, and our API key, respectively. We'll also specify a few `axios` parameters: `method`, `url`, and `type`. `Method` outlines what kind of HTTP request we'll be making—in this case, we're going to make a GET request, which essentially fetches data without sending anything back. The `url` is given to us by GIPHY's API documentation, and gives us access to the feature that searches their GIFs. Finally, the `type` specifies what form we want our data to be in when we get it—here, we want it to be in json form, so we can easily access different parts of the data we get from GIPHY (ex. a GIF's name, url, its size, and so on).

All of this information will live in a Javascript object that we need to give to `axios`, so that it can properly process this API call. We need to wrap this object in a function, though, so that we can actually send it where it needs to go at the right times.

This calls for an `async` function. `async` functions operate a bit differently from other functions—they are asynchronous, which means they happen in a different order than synchronous functions. They also have an `await` property, which will pause the function until a certain `Promise` is resolved. That resolution occurs when a `Promise` (which represents the result (successful or otherwise) of an asynchronous function) returns a value that indicates its operation is complete.

Without thinking about logic yet, let's see what this syntax might look like:

```
export default function App() {
  const[showForm, setShowForm] = useState(true)

  async function loadData() {
    const requestConfig = {
      {
        method: 'get',
        url: 'http://api.giphy.com/v1/gifs/search',
        params: {
          q: 'cat',
          limit: 20,
          api_key: API_KEY,
        },
        type: 'application/json',
      }
      const searchResult = await axios(requestConfig)
    }
  }
  if (showForm) {
    return <Form />
  } else {
    return <Image />
  }
}
```
Note what our `requestConfig` object looks like, and how it structures all of the data we need to send to `axios`. The general things the API call needs are directly positioned within the object, and then the parameters that are specific to GIPHY's API are placed within a `params`.

Now that we've got some of the basic API call syntax out of the way, let's think about the logic of what we're trying to do here. As you can see in our `requestConfig` object, which lays out how we're going about our API call, we're using some kind of a search query (in this case, hardcoded as 'cat' before we get our form up and running) to shift through all of the GIPHY GIFs and pick out 20 that match that search value. Then, we get a ton of JSON data—and now we have to figure out what to do with it.

The data we get from this API call is going to change every time the user makes a search. Luckily, we're using React, so we can handle this super easily by making our GIF data into a state variable. Once it's established as a state variable, we can update it with new data every time a search is made, and pass that data down to the child component Image to effectively render our GIF.

Let's put that in App.js, before our `async` function:

```
export default function App() {
  const[queryData, setData] = useState(null)
  const[showForm, setShowForm] = useState(true)

  async function loadData() {
    try{
      const requestConfig = {
      {
        method: 'get',
        url: 'http://api.giphy.com/v1/gifs/search',
        params: {
          q: 'cat',
          limit: 20,
          api_key: API_KEY,
        },
        type: 'application/json',
      }
      const searchResult = await axios(requestConfig)
      setData(searchResult)
      setShowForm(false)
    }
    } catch (err) {
      alert(err)
    }
  }
  if (showForm) {
    return <Form />
  } else {
    return <Image />
  }
}
```
You may be noticing a bunch of changes here, so let's talk them through. First, we've defined our `queryData` state, which is set as null initially and then updated after we carry out our API call with `await axios(requestConfig)`.  After that, we also have to update our `showForm` state, because now we want to move on from showing the form where the user can input their search value to showing the GIF we're getting from the API call instead.

Additionally, we've wrapped the entire API call in a `try{} catch{}` block, which will essentially make sure that if anything goes wrong in our API call, an error will be thrown out to let us know.

At this point, we're missing a couple pieces: one, we're missing the Form & its input, which is important because we'll want to call this `loadData()` function when the form is submitted, as well as use the input from that submission as our search value in the `q` parameter of our API call. Two, we're missing the code to render our image with the data we get from `loadData`'s API call.

First, let's take the form!

## Creating the Form
// make style file and import that into the different child components

To start, let's review exactly what we need to happen in `Form.js`. `Form.js` is the child component of `App.js`, so we have to pass it a function that will trigger `loadData()` every time the form is submitted. We also need to include the search value in that function call, so that `App.js` has all the information it needs to run the API call we want.

The best way to structure this visually is to have a simple text input box with a submit button. In the input box, we want to update the search value as the user types, and in the submit button, we want to trigger the `loadData()` function every time the user presses submit. Let's start with the input box!

Inside of our existing `Form.js` function `Form()` let's add a few things: first, some divs laying out our input box and input box label. Second, we'll need to add an `onChange` property that triggers `loadData`!

But wait—we have a few problems before we can start. For one, we don't have a state variable to keep track of the user-inputted search value yet. Because the user is updating this `searchValue` every time they type something into our form, so we want to make sure we're updating that value in such a way that `App.js` can keep track of it. Hence, a state variable! We'll add that right into the `Form()` function.

For another thing, we don't currently have `loadData()` passed into our Form component. To do so, we'll pass `loadData()` as a prop from App to Form! If the word 'prop' doesn't sound particularly familiar to you, review the concept [here](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#props).

First, go into `App.js`, and add `loadData()` as a prop where we're returning Form:
```
if (showForm) {
  return <Form onSearchSubmit={loadData} />
} else {
  return <Image />
}
```
Now, go into Form.js, and let's put all this (input box JSX, `onChange` function) together!
```
import React, { useState } from 'react'
import { Row, Col } from 'shards-react'
import { rowStyle, formStyle, labelStyle, formButtonStyle } from './style'

export default function Form({ onSearchSubmit }) {
  const [searchValue, setSearch] = useState(null)
  return (
    <Col style={{marginTop: "20%"}}>
      <Row style={rowStyle}>
        <div style={labelStyle}>
          Search a GIF:
        </div>
      </Row>
      <Row style={rowStyle}>
        <input type="text" style={formStyle} onChange={e => setSearch(e.target.value)}/>
      </Row>
      <Row style={rowStyle}>
        <button style={formButtonStyle} onClick={() => onSearchSubmit(searchValue)}>Submit!</button>
      </Row>
    </Col>
  )
}

```
Note that we've also added a few more lines to our imports at the top of the file—this is just to take care of styling for the form. See how we're passing `onSearchSubmit` into the `Form()` function as a parameter, so we can access it in our form. Also, take a look at the different functions associated with each part of our form. The input box has the `onChange` feature, which updates the `searchValue` state with every letter the user types! The `e` within `onChange` is the variable where we're storing our event object, which in this case is the user typing in the form. If this doesn't make sense, feel free to look at the JS event object documentation [here](https://developer.mozilla.org/en-US/docs/Web/API/Event)]!

The submit button, on the other hand, has an `onClick` function that triggers `onSearchSubmit`—which, if you remember, is the name for the prop that holds `loadData()`! Within `onSearchSubmit`, we're also passing the `searchValue` state, so that `App.js` knows our user's inputted search value. This isn't currently updated in App.js (remember, we hardcoded 'cat' for our `q` parameter in the API), so let's add `searchValue` there!

```

```


## Creating the Image

## Challenge! (Refresh & Shuffle Buttons)
