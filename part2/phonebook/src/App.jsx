import { useState,useEffect } from 'react'
import axios from 'axios'

const Filter = ({ text, value, onChange }) => {
  return (
    <div>
      {text} <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
const PersonForm = ({ onSubmit, nameValue, numberValue, onNameChange, onNumberChange, buttonText }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input
          value={nameValue}
          onChange={onNameChange}
        />
      </div>
      <div>
        number: <input
          value={numberValue}
          onChange={onNumberChange}
        />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}
const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}



const App = () => {

  // User states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

    useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

 // event handlers
  const addName = (event) => {
    event.preventDefault()
    console.log('button has been clicked', event.target)
    const trimmedName = newName.trim()
    const personObject = {
      name: trimmedName,
      number: newNumber
    }
    if (persons.find(person => person.name === trimmedName)) {
      alert(`${trimmedName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  // return statement
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} text='filter shown with' />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addName} 
        nameValue={newName} 
        numberValue={newNumber} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} 
        buttonText='add' 
      />
      <h2>Numbers</h2>
       {/* {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)} */}
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase().trim())).map(person =>  <Person key={person.name} person={person} />)}
      
    </div>
  )
}

export default App

