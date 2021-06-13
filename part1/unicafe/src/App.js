import React, { useState } from 'react'


const Button = ({handler, text}) => {
  return (
    <button onClick={handler}> {text} </button>
  )
}


const FeedbackForm = (props) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button handler={props.setters[0]} text="good" />
      <Button handler={props.setters[1]} text="neutral" />
      <Button handler={props.setters[2]} text="bad" />
    </>
  )
}



const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
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
        <table>
          <tbody>
            <StatisticLine text="good" value={values[0]} />
            <StatisticLine text="neutral" value={values[1]} />
            <StatisticLine text="bad" value={values[2]} />

            <StatisticLine text="all" value={sum} />
            <StatisticLine text="average" value={avg.toFixed(1)} />
            <StatisticLine text="positive" value={posRatio.toFixed(1).toString() + " %"} />
          </tbody>
        </table>
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

