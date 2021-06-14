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
        props.parts.map((item) => (
          <Part key={item.id} title={ item["name"] } count={ item["exercises"] } />
        ))
      }
    </div>
  )

}


const Total = ({parts}) => {

  const total = parts.reduce( (acc, item) => acc + item["exercises"], 0 )

  return ( <b>total of {total} exercises</b> )
}


const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;

