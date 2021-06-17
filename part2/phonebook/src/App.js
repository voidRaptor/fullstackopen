import React, { useState, useEffect } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filterResults, setFilterResults ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }


  // Setting the state is async and last inputted char might not be included in event.
  // This is called after the state is set.
  useEffect(() => {
    // case insensitive
    const filtered = persons.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    console.log(filter, filtered)
    setFilterResults(filtered)

  }, [filter, persons])

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
      <div>
      filter shown with <input onChange={onFilterChange} value={filter}/>
      </div>

      <h2>Add new</h2>
      <form onSubmit={onSubmit} >
        <div> name: <input onChange={onNameChange} value={newName}/> </div>
        <div> number: <input onChange={onNumberChange} value={newNumber}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {
        filterResults.map(item => <p key={item.name}>{item.name} {item.number}</p>)
      }
    </div>
  )

}

export default App
