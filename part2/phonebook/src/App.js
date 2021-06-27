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
  const [ message, setMessage ] = useState({text: null, level: "info"})


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
    const filtered = persons.filter(item => {
      if (item) {
        return item.name.toLowerCase().includes(filter.toLowerCase())
      } else {
        return false
      }
    })

    setFilterResults(filtered)

  }, [filter, persons])



  const onFilterChange = (event) => {
    setFilter(event.target.value)
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
            setPersons( persons.filter(p => p.id !== existing.id) )
          })

      }

    } else {

      // save on server
      personService
        .create(person)
        .then(data => {
          showMessage(`Added ${person.name}`, "info")
          setPersons(persons.concat(person))
        })
        .catch(error => {
          showMessage(`Failed to add ${person.name}`, "error")
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
          setPersons( persons.filter(element => element.id !== item.id) )
          showMessage(`Deleted ${item.name}`, "info")

        })
        .catch(error => {
          setPersons( persons.filter(element => element.id !== item.id) )
          showMessage(`${item.name} has already been deleted`, "error")
        })
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
