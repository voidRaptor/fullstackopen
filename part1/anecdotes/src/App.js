import React, { useState } from 'react'


const Daily = ({setters, values}) => {
  const setSelected = setters[0]
  const setPoints = setters[1]
  const anecdotes = values[0]
  const selected = values[1]
  const points = values[2]


  const vote = (index) => {
    const copy = [...points]
    copy[index] += 1
    setPoints(copy)
  }


  const randomMixMax = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>

      <button onClick={() => vote(selected)}>vote </button>
      <button onClick={() => setSelected( randomMixMax(0, anecdotes.length-1) )} >next</button>
    </>
  )


}


const MostVotes = ({anecdotes, points}) => {

  const max = Math.max(...points)
  const mostVotesIndex = points.findIndex(item => item === max)

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>has {points[mostVotesIndex]} votes</p>
    </>
  )

}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState( Array(anecdotes.length).fill(0) )

  const values = [anecdotes, selected, points]

  return (
    <div>
      <Daily setters={[setSelected, setPoints]} values={values}/>

      <MostVotes anecdotes={anecdotes} points={points}/>
    </div>
  )
}

export default App
