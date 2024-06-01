import { useState,useEffect } from 'react'
import personService from './services/persons'



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
const Person = ({ person,handleDelete }) => {
  return (
    <p>{person.name} {person.number} 
    <button onClick={handleDelete}>delete</button>
    </p>
  )
}

const App = () => {

  // User states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

    useEffect(() => {
    personService.getAll().then(initialPersons => {
        setPersons(initialPersons)
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
    if (persons.find(person => person.name === trimmedName && person.number === newNumber)) {
      alert(`${trimmedName} is already added to phonebook`)
    }else if(persons.find(person => person.name === trimmedName)){
        if(window.confirm(`${trimmedName} is already added to phonebook, replace the old number with a new one?`)){
         const person=persons.find(person=>person.name===trimmedName).id
         personService.update(person,personObject)
          .then(updatedPerson=>{
            console.log(updatedPerson)
            setPersons(persons.map(person=>person.id!==updatedPerson.id?person:updatedPerson))
           // Here it is important to use person.id!==updatedPerson.id instead of person!==updatedPerson because person is an object and updatedPerson is also an object so they will never be equal. These two have different reference in memory so they will never be satifsying this: "==="
          })
        }
    }
    else {
      // setPersons(persons.concat(personObject))
     personService
      .create(personObject)
      .then(returnedPersons=>{
        console.log(returnedPersons)
        setPersons(persons.concat(returnedPersons))
      
      })    
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
  
  const handleDelete = (id) => {
    const deletedPerson =persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${deletedPerson.name} ?`)
    if(result){
      personService
      .deletePerson(id)
      .then(deletedPersons=>{
        setPersons(persons.filter(person=>person.id!==deletedPerson.id))
      }) // Here actually there is no need of using deletedPerson.id, I could just use id(which is sent as parameter to handleDelete).
    }
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
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase().trim())).map(person =>  <Person key={person.name} person={person} handleDelete={()=>handleDelete(person.id)} />)}
     { /* Here it is important to send function in handleDelete as a function not as a function call because if we send function call then it will be called immediately*/}
      
    </div>
  )
}

export default App

