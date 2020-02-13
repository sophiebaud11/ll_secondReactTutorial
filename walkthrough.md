# Walkthrough

Welcome to the second tutorial of reactLab #1!

This walkthrough is intended to give you most of the content, both step by step instructions and conceptual knowledge, of our second React tutorial. If you want to skip all the conceptual stuff and just build the app, all the actual todos are marked with this :collision: emoji.

### Contents
[What You'll Make](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#what-youll-make)\
[Set-up](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#set-up)\
[API Call](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#api-call)\
[Creating the Form](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#creating-the-form)\
[Creating the Image](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#creating-the-image)\
[A Challenge](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#a-challenge)

:collision: To start, clone this repo (On an LL machine open Terminal; then enter the commands `cd development` and `git clone https://github.com/sophiebaud11/ll_secondReactTutorial.git`) and open the code in your favorite editor by entering `cd ll-secondreactlab` and then `atom .`

### What You'll Make
In this tutorial, you'll build an app where you can enter a search term and automatically generate a GIF pulled from the website GIPHY! By the time you're finished, you'll have an app that begins with a form in which you can input a query of your choosing and receive a GIF in response!

This requires us to work with states, parent-child component relationships, and functions—all topics that should be familiar from the last tutorial. The important new skill we're learning in this tutorial, though, is how to make fetch data from an API in React. In order to get our GIFs, we'll use the user-inputted search term as a parameter in a call to GIPHY's API!

Remember: to get this code up and running, install npm if needed, and enter `npm start` in your terminal. If this isn't sounding familiar to you, check out our first reactLab tutorial [here](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#what-youll-make) for more detailed instructions! Test this out by looking at the example code, which should be running right now.

## Set-up
:collision: Go to index.js, and edit one the headers to import the Starter App instead of the Example. Your code will break, but don't worry! We'll fix that soon.
```js
import App from './starter/App'
```
In the Starter folder, you should see three files under Components: `App.js`, `Form.js`, and `Image.js`. App is our parent component, and Form & Image are its children, where (you guessed it!) the code making the form for users to input their GIF search term & the code rendering our GIF will live. Our API call is going to live in App, so that we can pass all that information down to Form & Image. Let's set up App.js now. We need to import a bunch of things to get our program started (right now we'll import React and our child components, but we'll add to this as we go along!).

We also need to return something at the end of our main function. At any given time, we'll either be rendering a form in which the user can submit a search term, or a GIF found using that search. This is why we have both a Form and Image component, so that we can alternate between returning each depending on what the user has just done.

Does this kind of situation sound familiar? Hopefully it does, because it's exactly the kind of app for which we'd want to use React's staple feature: states! Let's make a state that we'll use to indicate whether the form is showing or not.

To do so, we'll use the `useState()` function. If you've forgotten about that, check back at the first tutorial [here](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#usestate)!

:collision: After you've given this a shot, this is what App.js should look like:
```js
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
Don't worry if you're seeing lots of errors on `localhost:3000`! We're currently returning our Form component, which we have yet to edit, so right now, App.js won't be rendering much of anything.

Let's try to think of how to replicate this set up in Form & Image, so that we can render something on our screen with App.js! Remember: Form and Image are children of App, so they don't need to import each other, but they do need to import something for React to work, as well as contain some kind of function.

:collision: After you've tried this on your own, check out what it should look like for Form.js:
```js
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
```js
import React, { useState } from 'react'

export default function Image() {
  return (
      <div>
        <h1>Image here!</h1>
      </div>
    )
}
```
Now, you should see a blank page with the writing 'Form here!', because we're returning Form in App.js, and that text is what Form itself is returning. With that out of the way, let's move on to the fun stuff: making an API call!

## API Call
In order to make an API call on your own, you'll need to get your own individual API Key. How to do this will be found in the documentation of whatever API you're using, but for the sake of this tutorial, we've gotten an API key for you already! Right now, it's living in auth.js, so we'll need to import at the top of App.js like so:
```js
import { API_KEY } from '../auth'
```
We need those double dots because auth.js is not in the same folder as App.js, so we need to exit the folder once to find it.

Okay. We might be getting ahead of ourselves here. If you're thinking: "What is an API key?" "What even is an API?", that's totally okay! Let's do some conceptual work now, so we understand what we're doing as we code this API call.

An API (Application Program Interface) is, according to the Dictionary, "a set of functions and procedures allowing the creation of applications that access the features or data of an operating system, application, or other service." To simplify further, an API lets us use cool aspects of other software in our own code. In this case, our API call will fetch some of GIPHY's GIF data, using the many parameters they have available for searching for and sorting through those GIFs.

In order to make this call, we need an API key to gain access to that data (like a password). Anyone who makes an account with GIPHY to use their API can get their own API key, to service their individual needs. In this case, we'll Slack you the API key when you need it!

Now that we know a bit about APIs, let's think about how exactly to make an API call. For this tutorial, we're going to be using a library called `axios` to help us carry out this API call. Feel free to read about `axios` in their documentation [here](https://github.com/axios/axios), if you're curious about what this library can do!

:collision: First, enter `npm install axios`. Next, import `axios` at the top of App.js:
```js
import axios from 'axios'
```

Next, we need a bunch of parameters in order to let the API know what exactly we need from it. If you go to the documentation for GIPHY's API, and look under the [Search Endpoint](https://developers.giphy.com/docs/api/endpoint#endpoint) section, you can see some of the parameters we can edit in our request. In this case, we'll be filling out the following GIPHY parameters: `q`, `limit`, and `api_key`, to specify to GIPHY's API the query we wants GIFs for, number of GIFs we want, and our API key, respectively. We'll also specify a few `axios` parameters: `method`, `url`, and `type`. `Method` outlines what kind of HTTP request we'll be making—in this case, we're going to make a GET request, which essentially fetches data without sending anything back. The `url` is given to us by GIPHY's API documentation, and gives us access to the feature that searches their GIFs. Finally, the `type` specifies what form we want our data to be in when we get it—here, we want it to be in JSON form, so we can easily access different parts of the data we get from GIPHY (ex. a GIF's name, url, its size, and so on).

All of this information will live in a Javascript object that we need to give to `axios` so that it can process this API call.We need to wrap this object in a function, though, so that we can make it happen at the right times.

This calls for an `async` function. `async` functions operate in a unique way: they are asynchronous, which means they happen in a different order than synchronous functions. They also have an `await` property, which will pause the function until a certain `Promise` is resolved. That resolution occurs when a `Promise` (which represents the result—successful or otherwise—of an asynchronous function) returns a value that indicates its operation is complete. [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) is the documentation for `async` functions if you're curious about learning more!

:collision: Let's see what this syntax will look like in App.js's main function:

```diff
export default function App() {
  const[showForm, setShowForm] = useState(true)

+  async function loadData() {
+    const requestConfig = {
+      {
+        method: 'get',
+        url: 'http://api.giphy.com/v1/gifs/search',
+        params: {
+          q: 'cat',
+          limit: 20,
+          api_key: API_KEY,
+        },
+        type: 'application/json',
+      }
+      const searchResult = await axios(requestConfig)
+    }
+  }
  if (showForm) {
    return <Form />
  } else {
    return <Image />
  }
}
```
Note what our `requestConfig` object looks like, and how it structures all of the data we need to send to `axios`. The general things we need for the API call are included within the main object, and then the parameters that are specific to GIPHY's API are placed within a `params` key.

Now that we've got some of the basic API call syntax out of the way, let's think about the logic of what we're trying to do here. As you can see in our `requestConfig` object, which lays out how we're executing our API call, we're using some kind of a search query (in this case, hardcoded as 'cat' before we get our form up and running) to sift through all of the GIPHY GIFs and pick out 20 that match that search value. Then, we get a ton of JSON data—and now we have to figure out what to do with it.

The data we get from this API call is going to change every time the user makes a search. Luckily, we're using React, so we can handle this super easily by storing our GIF data in a state variable. Once it's established as a state variable, we can update it with new data every time a search is made, and pass that data down to the child component Image.js to effectively render our GIF.

:collision: Let's put that in App.js, before our `async` function:

```diff
export default function App() {
_  const[queryData, setData] = useState(null)
  const[showForm, setShowForm] = useState(true)

  async function loadData() {
+    try{
      const requestConfig = {
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
+      setData(searchResult.data.data)
+      setShowForm(false)
+    } catch (err) {
+      alert(err)
+    }
  }
  if (showForm) {
    return <Form />
  } else {
    return <Image />
  }
}
```
You should be noticing a bunch of changes here, so let's talk them through. First, we've defined our `queryData` state, which is set as null initially and then updated with `setData(searchResult)` after we carry out our API call with `await axios(requestConfig)`.  After that, we also have to update our `showForm` state, because now we want to move on from showing the form to showing the GIF we're getting from the API call.

Additionally, we've wrapped the entire API call in a `try{} catch{}` block, which will essentially make sure that if anything goes wrong while we make our API call, an error will be thrown out to let the user know.

Amazing job so far! We've got our API call written, and all of the important groundwork laid for us to move forward with writing our Form and Image components.

Our next steps are to code the Form so that it calls our `loadData()` function when the user inputs a search valu, as well as use the input from that submission as our search value in the `q` parameter of our API call. After that, we have to render our GIF with the data we get from `loadData`'s API call.

First, let's take on the form!

## Creating the Form

To start, let's review exactly what needs to happen in Form.js. Form.js is the child component of App.js, so we have to pass it a function that will trigger `loadData()` (AKA, our API call) every time the form is submitted. We also need to include the search value in that function call, so that App.js has all the information it needs to run the exact API call we want.

The best way to render this is to have a simple text input box with a submit button. In the input box, we want to update the search value as the user types, and in the button, we want to trigger the `loadData()` function every time the user presses submit. Let's start with the input box!

Inside of our existing Form.js function `Form()` let's add a few things: first, some divs laying out our input box and input box label, and second, an `onChange` property that triggers `loadData`.

But wait—we have a few problems before we can start. For one, we don't have a state variable to keep track of the user-inputted search value yet. Because the user is updating this `searchValue` every time they type something into our form, so we want to make sure we're keeping track that value in such a way that App.js can access it at all times. Hence, a state variable! We'll add that right into the `Form()` function.

For another thing, `loadData()` isn't in our Form component yet for us to call in the submit button. To be able to call `loadData()`, we'll pass it as a prop from App.js to Form.js! If the word 'prop' doesn't sound particularly familiar to you, review the concept [here](https://github.com/learninglab-dev/ll-first-reactLab/blob/master/walkthrough.md#props).

:collision: First, go into App.js, and add `loadData()` as a prop where we're returning Form:
```diff
if (showForm) {
+  return <Form onSearchSubmit={loadData} />
} else {
  return <Image />
}
```
:collision: Now, go into Form.js, and let's put all this (input box JSX, `onChange` function, `searchValue` state, submit button function) together!
```js
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
Note that we've added a few more lines to our imports at the top of the file to take care of styling for the form. See how we're passing `onSearchSubmit` into the `Form()` function as a parameter, so we can access it in our form. Also, take a look at the different functions associated with each part of our form. The input box has the `onChange` feature, which updates the `searchValue` state with every letter the user types! The `e` within `onChange` is the variable in which we're storing our event object, which in this case is the user typing in the form. If this doesn't make sense, feel free to look at the JS event object documentation [here](https://developer.mozilla.org/en-US/docs/Web/API/Event)!

The submit button, on the other hand, has an `onClick` function that triggers `onSearchSubmit`—which, if you remember, is the name for the prop that holds `loadData()` which we pass into the `Form()` function at the top of the file.

In the submit button, when we call the `onSearchSubmit` function, we're also passing the `searchValue` state, so that App.js can access our user's inputted search value.

:collision: This isn't currently updated in App.js (remember, we hardcoded 'cat' for our `q` parameter in the API), so let's add `searchValue` in the parameters for `loadData()`, as well as in our `q` parameter in our API call, as well as add an `if` statement that handles the situation where there is, for some reason, no `searchValue`.

```diff
+ async function loadData(searchValue) {
+  if (!searchValue) {
+    alert("enter a search value!")
+    return
+  }
  try {
    const requestConfig = {
      method: 'get',
      url: 'http://api.giphy.com/v1/gifs/search',
      params: {
  +      q: searchValue,
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

```
Now, your Form component should be working. It should be the first thing you see when you load the page, and it it should App.js should be able to read the `searchValue` you enter. Feel free to add a `console.log(searchValue)` at key points in the code to see how it's working!

When you enter your search value, all the user is seeing now is a page that says 'Image here!'. That means our Form is finished, so now it's time to move on to creating our Image component.

## Creating the Image

Currently, all we have in Image.js is a `div` containing some text. We're going to change that now, to render the GIF gathered from the API call initiated by Form and App instead. In order to do so, we'll need something important from App: our GIF data.

We'll be using the HTML `iframe` tag to display our GIF. The important part of `iframe` we'll be editing is its `src` tag, which we'll fill with the url of the GIF summoned by our API call. Look at the `queryData` log, and let's think about how to grab this url from `queryData`!

:collision: First, at the bottom of App.js, we need to send `queryData` to Image.js so we can access its content there:
```diff
if (showForm) {
  return <Form onSearchSubmit={loadData} />
} else {
+  return <Image src={queryData} />
}}

```
:collision: Now that we're passing Image.js `queryData` in the prop `src`, let's add that to the parameters of the `Image` function and return it on our page so we can see what the data looks like.

```diff
export default function Image({ src }) {
  return (
    <div>
+      <h1>{JSON.stringify(src)}</h1>
    </div>
    )
  }

```
As you can see, within the `src` JSON object, we have a lot of information. Only one piece of it, though, is going to be necessary for rendering the GIF: `embed_url`. This key, as you might be able to guess, contains the GIF's url that can be embedded in an HTML tag, so that's what we want to be including in our `iframe` tag in Image.js!
:collision: `embed_url`, as you might be able to guess, contains the GIF's url that can be embedded in an HTML tag, so that's what we want to be including in our `iframe` tag in Image.js! Let's make that happen:

```js
import React, {useState} from 'react'
import { Row, Col } from 'shards-react'
import { gifStyle, rowStyle,imgButtonStyle } from './style'

export default function Image({ src }) {
  console.log(src)

  if (!src) {
    console.log("no gif url")
  } else {
      return (
        <>
        <Col style={{marginTop: "20%"}}>
          <Row style={rowStyle}>
            <iframe style={gifStyle} src={src[0].embed_url} title={src[0].title} width={src[0].images.original.width} />
          </Row>
        </Col>
        </>
      )
    }
}

```
There's a lot to notice here. For one thing, like we added in Form.js, there's a lot of styling included here that you don't need to worry about—we've taken care of it in style.js, which you can check out if you're interested!

The more important thing to pay attention to is what we're including in `iframe`. For our `src` attribute, we're calling the `embed_url` property of the `[0]` index of our `src` prop (which means the very first object in src, AKA our first GIF). We're also defining the `title` attribute in the same way, by accessing the `title` property of the first index of our `src` prop. Finally, we're setting the `width` of the `iframe` to be the width of our GIF according to GIPHY, which is nested in a few layers of the `src` prop: within `image`, then `original`, Then `width.`

With all of this finished up, you should have a working app now! Save your code and refresh the `localhost:3000` page, and enjoy all of the wonderful GIF summoning functionality you've built.

## A Challenge

If this walkthrough wasn't enough for you, have no fear—we have an additional challenge you can take on!

Let's say you, the user, want a little more from this app than we're currently delivering. Specifically, you want to add two buttons: a button that will send you back to the form page without having to refresh everything on your own, so you can enter a new search term; and a button that will allow you to shuffle through all of the GIFs you've gathered in the API call for one search term. (Check out the parameters of the call again in App.js: we've limited the number of GIFs we're calling data for to 20, so you have the data for rendering all of these GIFs!) This way, if you don't love the GIF you got from your initial search, you can keep moving down the index of `queryData` until you get one you like (out of the 20 we've called).

Here are a few hints for tackling this challenge: one, for the refresh or back button, think about what things you've already created in your code that dictate what you display on the user's screen. Figure out if you can use any of that code to send the page back to the initial form!

For a hint on how to create the shuffle button, you'll need to make some kind of a counter that keeps track of what GIF (AKA what index) you're currently displaying among the 20 for which you have data.

Good luck!
