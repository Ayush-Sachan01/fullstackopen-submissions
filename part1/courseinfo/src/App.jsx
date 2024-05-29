const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}
const Part = ({ name, exercises }) => {

  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}

const Content = ({ parts }) => {

  return (
    <>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </>
  )
}
const Total = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce((acc, current) => acc + current.exercises, 0)
  console.log(total);
  return (
    <>
      <p ><strong>total of {total} exercises</strong></p>
    </>
  )
}
const Course = ({ course }) => {
  
  return <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />  
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
