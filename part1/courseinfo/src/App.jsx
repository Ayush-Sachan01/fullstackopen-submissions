const Header = (props) => {
  console.log(props);
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.part.part} {props.part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part part={props.content[0]} />
      <Part part={props.content[1]} />
      <Part part={props.content[2]} />
    </>
  )
}

const Total = (props) => {
  console.log(props);
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
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

  const content = [
    { part: part1.name, exercises:part1.exercises },
    { part: part2.name, exercises:part2.exercises  },
    { part: part3.name, exercises: part3.exercises },
  ];

  const totalExercises = part1.exercises + part2.exercises + part3.exercises;

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={totalExercises} />
    </div>
  )
}

export default App
