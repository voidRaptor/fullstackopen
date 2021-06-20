import React, { useState, useEffect } from 'react'
import axios from 'axios'


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
  const [persons, setPersons] = useState([])
  const [ filterResults, setFilterResults ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        //setPersons( persons.concat(response.data) )
        setPersons(response.data)
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
      axios
        .post("http://localhost:3001/persons", person)
        .then(response => {
          console.log(response)
        })
    }

  }


  const onNameChange = (event) => {
    setNewName(event.target.value)
  }


  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      <NumberList filterResults={filterResults}/>
    </div>
  )

}

export default App
