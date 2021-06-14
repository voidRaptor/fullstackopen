

const Header = (props) => {
  return ( <h1>{props.course}</h1> )
}


const Part = (props) => {
  return ( <p>{props.title} {props.count}</p> )
}


const Content = (props) => {
  return (
    <>
      {
        props.parts.map((item) => (
          <Part key={item.id} title={ item["name"] } count={ item["exercises"] } />
        ))
      }
    </>
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


export default Course;
