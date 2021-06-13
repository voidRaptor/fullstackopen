import React, { useState } from 'react'


const FeedbackForm = (props) => {
  return (
    <>
      <h1>give feedback</h1>
      <button onClick={props.setters[0]}> good </button>
      <button onClick={props.setters[1]}> neutral </button>
      <button onClick={props.setters[2]}> bad </button>
    </>
  )
}


const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <p>good {props.values[0]}</p>
      <p>neutral {props.values[1]}</p>
      <p>bad {props.values[2]}</p>
    </>
  )
}


const App = () => {

  // button states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const setValue = (setter, value) => {
    setter(value)
  }


  const setters = [
    () => setValue(setGood, good + 1),
    () => setValue(setNeutral, neutral + 1),
    () => setValue(setBad, bad + 1),
  ]

  const values = [good, neutral, bad]

  return (
    <div>
      <FeedbackForm setters={setters}/>
      <Statistics values={values}/>
    </div>
  )
}

export default App

