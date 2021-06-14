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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {
        courses.map((course) => (
          <Course key={course.id} course={course} />
        ))
      }
    </div>
  )
}

export default App;

