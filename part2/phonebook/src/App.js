import React, { useState } from 'react'


const App = () => {
  const [ persons, setPersons] = useState([ { name: 'Arto Hellas', number: "040 111 2233" } ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault() // prevent redirection

    const person = {name: newName, number: newNumber}

    if (persons.some(item => item.name === person.name)) {
      alert(`"${newName}" is already added to phonebook`)

    } else {
      setPersons(persons.concat( [person] ))
    }


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit} >
        <div> name: <input onChange={onNameChange} value={newName}/> </div>
        <div> number: <input onChange={onNumberChange} value={newNumber}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(item => <p key={item.name}>{item.name} {item.number}</p>)
      }
    </div>
  )

}

export default App
