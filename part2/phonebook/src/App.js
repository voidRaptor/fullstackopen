import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = ({handler, filter}) => {
  return (
    <>
      filter shown with <input onChange={handler} value={filter}/>
    </>
  )
}


const PersonForm = ({handlers, values}) => {
  return (
    <>
      <form onSubmit={handlers["submit"]} >
        <div> name: <input onChange={handlers["name"]} value={values["name"]}/> </div>
        <div> number: <input onChange={handlers["number"]} value={values["number"]}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}


const ListItem = ({item, deleter}) => {

  return (
    <>
      <p>
        {item.name} {item.number}
        <button type="button" onClick={() => deleter(item)}>delete</button>
      </p>
    </>
  )

}


const NumberList = ({filterResults, deleter}) => {
  return (
    <>
      {
        filterResults.map(item => <ListItem key={item.name} item={item} deleter={deleter}/>)
      }
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [ filterResults, setFilterResults ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })

  }, [])


  // Setting the state is async and last inputted char might not be included in event.
  // This is called after the state is set.
  useEffect(() => {
    // case insensitive
    const filtered = persons.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    setFilterResults(filtered)

  }, [filter, persons])


  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }


  const onSubmit = (event) => {
    event.preventDefault() // prevent redirection

    const person = {name: newName, number: newNumber}

    if (persons.some(item => item.name === person.name)) {
      alert(`"${newName}" is already added to phonebook`)

    } else {
      setPersons(persons.concat( [person] ))

      // save on server
      personService
        .create(person)
        .then(data => {
          console.log(data)
        })
    }

  }


  const onNameChange = (event) => {
    setNewName(event.target.value)
  }


  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const onDelete = (item) => {

    if (window.confirm("delete?")) {

      personService
        .remove(item.id)
        .then(data => {
          setPersons( persons.filter(element => element.id !== item.id) )
        })

    }

  }


  const handlers = {"name": onNameChange, "number": onNumberChange, "submit": onSubmit}
  const values = {"name": newName, "number": newNumber}

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter handler={onFilterChange} filter={filter}/>

      <h2>Add new</h2>
      <PersonForm handlers={handlers} values={values}/>

      <h2>Numbers</h2>
      <NumberList filterResults={filterResults} deleter={onDelete}/>
    </div>
  )

}

export default App
