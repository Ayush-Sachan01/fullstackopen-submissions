import { useState } from 'react'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
   
  const filtered = persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase())).map(person=><p key={person.name}>{person.name} {person.number}</p>)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
        value={filter}
        onChange={handleFilterChange}
        />
             
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
          
        </div>
        <div>number: <input
          value={newNumber}
          onChange={handleNumberChange}
        /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)} */}
      {filtered}
    </div>
  )
}

export default App