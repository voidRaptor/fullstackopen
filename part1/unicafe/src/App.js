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


const Statistics = ({values}) => {

  const sum = values.reduce((a, b) => a + b, 0)
  const avg = sum === 0 ? 0 : (values[0] - values[2]) / sum
  const posRatio = sum === 0 ? 0 : values[0] / sum * 100

  if (sum === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )

  } else {
    return (
      <>
        <h1>statistics</h1>

        <p>good {values[0]}</p>
        <p>neutral {values[1]}</p>
        <p>bad {values[2]}</p>

        <p>all {sum}</p>
        <p>average {avg}</p>
        <p>positive {posRatio} %</p>
      </>
    )
  }
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

