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

All of this information lives in a Javascript object that we give to `axios` so that it can properly process this API call.

## Creating the Form
// make style file and import that into the different child components
## Creating the Image

## Challenge! (Refresh & Shuffle Buttons)
