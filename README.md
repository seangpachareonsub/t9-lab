# T9 Predictive Text

This is a small web app that emulates T9 predictive text. As the user types numbers into the input,predicted words will be shown.

## Getting Started

This project was bootstrapped using the [Create React App](https://github.com/facebook/create-react-app) toolkit.

### Getting the code

To serve the app on your local machine, run the following commands:

```js
git clone git@github.com:seangpachareonsub/t9-lab.git
npm start
```

This will start the backend server which runs on localhost:3001

```js
cd client
npm start
```

This will start the frontend UI which runs on localhost:3000


## Task

### Description

The task was to create a number to word list converter in the style of T9 Predictive Text, as a Node backend and React/Redux frontend

### Approach

I began picturing the old retro phones that needed at least 2 presses on a single button to bring up a specific letter and wanted to recreate something as an extension of that. I opted for a unique blend of retro in the style of T9 and the design of modern phones.

I set up a create-react-app project and built out 2 main components,keypad and screen. Considering the size of the app, I kept styling to a minimum and wrote with traditional CSS files rather than a pre-processor like SCSS. 

My instinctive approach was to use what I knew best, in the form of React hooks, notably useContext and useReducer to manage the state and an Express powered backend. However, I wanted to showcase my abilities to learn quickly and use technologies that I had not used prior or at least not used for a period of time. Therefore, I migrated over to a Hapi server from Express and transferred over to Redux to manage the app's state.

As a result, I was able to develop the main features listed below and include comments around the codebase, reasoning and detailing how each function works and why. Hopefully it all makes sense!

### Features

- T9 predictive text
- Auto-complete from list of predictive text
- Clean and basic UI

## Project Overview & Setup

### Technologies

- React
- Redux
- Hapi
- Node
- JSX/HTML/CSS

### Methodologies

- Functional programming
- CSS BEM naming convention
- Basic MVC design pattern
- Stateless components


For the backend, I followed a basic View Controller pattern and seperated out the functions from the API routes.

For the frontend, the components are stored in their own folders alongside individual designated CSS files for styling. The Redux aspect of the app is split between a action and reducer folder with a actionType.js file serving variables for both.

The assets folder in the frontend stores image icons that are distrubuted across the UI of the app.

- `client`
  - `public`
  - `src`
    - `assets`
    - `components`
      - `keypad`
        - `Keypad.{js,css}`
      - `screen`
        - `Screen.{js,css}`
      - `status-bar`
        - `StatusBar.{js,css}`
    - `redux`
      - `actions`
        - `actionTypes.js`
        - `index.js`
      - `reducers`
        - `input.js`
  - `App.{js,css}`
  - `constants.js`
  - `index.{js,css}`
  - `reportWebVitals.js`

- `server`
  - `constants`
    - `keys.js`
    - `words.js`
  - `controllers`
    - `textController.js`
  - `index.js`

## Improvements

### Bugs

Part of the backend includes a recursive function that generates all possible letter combinations based on the number input. There is a direct correlation between the length of the input and the latency of response from the backend, this follows the O(n) complexity. 

Therefore, I found that inputting or deleting long words will result in the app hanging, especially in cases where buttons are pressed quickly due to the time taken to compute the entire word. Shorter words (up to 3 or 4 characters) perform best since they take less time.


### Future Implentations

- At the moment, the app doesn't support punctuations and grammar (i.e capitalisation) and presses on the 1 button are ignored so would be good to see how that's implemented into the app.
- A Redux undo state impletation so deletion of characters wouldn't need to trigger API calls to fetch a list of words. Some form of a tracker that could cache all the data that comes back and we could access that for previous states on delete. 
- It would have been nice to see how the app would perform on a React Native platform 
