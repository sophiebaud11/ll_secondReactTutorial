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

### What You'll Make
In this tutorial, you'll build an app where you can enter a search term and automatically generate a GIF pulled from the website Giphy! This requires us to work with states, parent-child component relationships, and functions—all topics that should be familiar from the last tutorial. The new skill we're learning in this tutorial, though, is how to make API calls in React. In order to get our GIFs, we have to use a user-inputted search term as a parameter in a call to Giphy's API
