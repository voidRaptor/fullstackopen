import React, { useState, useEffect } from 'react'


const Filter = ({filterSetter, filter}) => {

  const onFilterChange = (event) => {
    filterSetter(event.target.value)
  }

  return (
    <>
      filter shown with <input onChange={onFilterChange} value={filter}/>
    </>
  )
}


const PersonForm = ({setters, values}) => {

  const onSubmit = (event) => {
    event.preventDefault() // prevent redirection

    const person = {name: values["name"], number: values["number"]}

    if (values["persons"].some(item => item.name === person.name)) {
      alert(`"${values["name"]}" is already added to phonebook`)

    } else {
      setters["persons"](values["persons"].concat( [person] ))
    }

  }


  const onNameChange = (event) => {
    setters["name"](event.target.value)
  }

  const onNumberChange = (event) => {
    setters["number"](event.target.value)
  }


  return (
    <>
      <form onSubmit={onSubmit} >
        <div> name: <input onChange={onNameChange} value={values["name"]}/> </div>
        <div> number: <input onChange={onNumberChange} value={values["number"]}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}


const NumberList = ({filterResults}) => {
  return (
    <>
      {
        filterResults.map(item => <p key={item.name}>{item.name} {item.number}</p>)
      }
    </>
  )
}


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


  // Setting the state is async and last inputted char might not be included in event.
  // This is called after the state is set.
  useEffect(() => {
    // case insensitive
    const filtered = persons.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    setFilterResults(filtered)

  }, [filter, persons])

  const setters = {"name": setNewName, "number": setNewNumber, "persons": setPersons}
  const values = {"name": newName, "number": newNumber, "persons": persons}

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filterSetter={setFilter} filter={filter}/>

      <h2>Add new</h2>
      <PersonForm setters={setters} values={values}/>

      <h2>Numbers</h2>
      <NumberList filterResults={filterResults}/>
    </div>
  )

}

export default App
