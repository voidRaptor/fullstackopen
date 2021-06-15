import React, { useState } from 'react'


const App = () => {
  const [ persons, setPersons] = useState([ { name: 'Arto Hellas' } ])
  const [ newName, setNewName ] = useState('')


  const onChange = (event) => {
    setNewName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault() // prevent redirection

    const person = {name: newName}

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
        <div>
          name: <input onChange={onChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(item => <p key={item.name}>{item.name}</p>)
      }
    </div>
  )

}

export default App
