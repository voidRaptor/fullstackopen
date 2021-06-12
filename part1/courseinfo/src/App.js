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
          <Part key={index} title={item[0]} count={item[1]} />
        ))
      }
    </div>
  )

}


const Total = (props) => {
  let total = 0;

  for (let i=0; i<props.items.length; ++i) {
    total += props.items[i][1];
  }

  return ( <p>Number of exercises {total}</p> )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  let contents = [ [part1, exercises1], [part2, exercises2], [part3, exercises3] ];

  return (
    <div>
      <Header course={course} />
      <Content contents={contents}/>
      <Total items={contents}/>
    </div>
  )

}

export default App;

