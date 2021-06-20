import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const MessageBox = ({msg, level}) => {

  if (msg === null) return null

  return (
    <div className={level === "error" ? "error" : "info"}>
      {msg}
    </div>
  )
}


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
  const [ message, setMessage ] = useState({text: "error", level: "error"})


  // initial fetch
  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
        setFilterResults(data)
      })

  }, [])


  const doFiltering = (filterStr) => {

    // case insensitive, using value from event, since setFilter is async and has delay
    const lowerCaseFilter = filterStr.toLowerCase()
    const filtered = persons.filter(item => item.name.toLowerCase().includes(lowerCaseFilter))
    setFilterResults(filtered)
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value)
    doFiltering(event.target.value)
  }


  const onSubmit = (event) => {
    event.preventDefault() // prevent redirection

    const person = {name: newName, number: newNumber}

    // update number
    if (persons.some(item => item.name === person.name)) {

      if (window.confirm(`"${newName}" is already added to phonebook, replace the number with a new one?`)) {

        const existing = persons.find(p => p.name === newName)
        const newPerson = {...existing, number: newNumber}

        personService
          .update(newPerson.id, newPerson)
          .then(data => {
            // update data for the previously updated person
            setPersons( persons.map(p => p.id !== existing.id ? p : data) )
            showMessage(`Updated ${newPerson.name}`, "info")
          })
          .catch(error => {
            showMessage(`${newPerson.name} doesn't exist anymore`, "error")
            setPersons( persons.map(p => p.id !== existing.id) )
          })

      }

    } else {
      setPersons(persons.concat( [person] ))

      // save on server
      personService
        .create(person)
        .then(data => {
          showMessage(`Added ${person.name}`, "info")
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

    if (window.confirm("Delete?")) {
      personService
        .remove(item.id)
        .then(data => {
          showMessage(`Deleted ${item.name}`, "info")
        })
        .catch(error => {
          showMessage(`${item.name} doesn't exist anymore`, "error")
        })

        setPersons( persons.filter(element => element.id !== item.id) )
        doFiltering(filter)
    }

  }


  const showMessage = (text, level) => {
    setMessage({text, level})

    // hide after time period
    setTimeout(() => {
      setMessage({...message, text: null})
    }, 3000)

  }



  const handlers = {"name": onNameChange, "number": onNumberChange, "submit": onSubmit}
  const values = {"name": newName, "number": newNumber}

  return (
    <div>
      <h1>Phonebook</h1>

      <MessageBox msg={message["text"]} level={message["level"]} />

      <Filter handler={onFilterChange} filter={filter}/>

      <h2>Add new</h2>
      <PersonForm handlers={handlers} values={values}/>

      <h2>Numbers</h2>
      <NumberList filterResults={filterResults} deleter={onDelete}/>
    </div>
  )

}

export default App
