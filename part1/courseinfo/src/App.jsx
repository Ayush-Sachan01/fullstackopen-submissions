const Header = ({name}) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}
const Part = ({name,exercises}) => {
  
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  
  return (
    <>

     {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)} 
    
    </>
  )
}
/*
const Total = (props) => {
  console.log(props);
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}
*/

const Course= ({course}) => {
  console.log(course);
  return<div>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
  </div>

}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}


/*
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total total={totalExercises} />
    </div>
  )
}
*/
export default App
