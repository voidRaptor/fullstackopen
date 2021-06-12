import React from 'react';


const Header = (props) => {
  return ( <h1>{props.course}</h1> )
}


const Part = (props) => {
  return ( <p>{props.title} {props.count}</p> )
}


const Content = (props) => {

  return (
    <div>
      {
        props.parts.map((item, index) => (
          <Part key={index} title={ item["name"] } count={ item["exercises"] } />
        ))
      }
    </div>
  )

}


const Total = (props) => {
  let total = 0

  for (let i=0; i<props.parts.length; ++i) {
    total += props.parts[i]["exercises"]
  }

  return ( <p>Number of exercises {total}</p> )
}


const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },

    {
      name: 'Using props to pass data',
      exercises: 7
    },

    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )

}

export default App;

