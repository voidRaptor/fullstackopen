import React, { useState } from 'react'


const App = () => {
  const [ persons, setPersons] = useState([ { name: 'Arto Hellas' } ])
  const [ newName, setNewName ] = useState('')


  const onChange = (event) => {
    setNewName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault() // prevent redirection

    setPersons(persons.concat( [{name: newName}] ))
    console.log(persons)
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
