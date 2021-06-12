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
        props.contents.map((item, index) => (
          <Part key={index} title={ item["name"] } count={ item["exercises"] } />
        ))
      }
    </div>
  )

}


const Total = (props) => {
  let total = 0

  for (let i=0; i<props.items.length; ++i) {
    total += props.items[i]["exercises"]
  }

  return ( <p>Number of exercises {total}</p> )
}


const App = () => {
  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  let contents = [ part1, part2, part3 ]

  return (
    <div>
      <Header course={course} />
      <Content contents={contents}/>
      <Total items={contents}/>
    </div>
  )

}

export default App;

