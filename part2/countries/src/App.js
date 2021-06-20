import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({handler, filter}) => {
  return (
    <>
      find countries <input onChange={handler} value={filter}/>
    </>
  )
}


const CountryList = ({filterResults}) => {
  return (
    <>
      {
        filterResults.map(item => <p key={item.name}>{item.name}</p>)
      }
    </>
  )
}


const CountryData = ({country}) => {
  return (
    <>
      <h1>{country["name"]}</h1>
      <p>capital {country["capital"]}</p>
      <p>population {country["population"]}</p>

      <h2>languages</h2>
      <ul>
      {
        country["languages"].map( (item, index) => <li key={index}>{item.name}</li> )
      }
      </ul>

      <img src={country["flag"]} alt={country["name"].concat(" flag")} width="200" height="200"/>
    </>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [ filterResults, setFilterResults ] = useState(countries)
  const [ filter, setFilter ] = useState('')


  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
        //console.log(response.data)
      })

  }, [])


  // Setting the state is async and last inputted char might not be included in event.
  // This is called after the state is set.
  useEffect(() => {
    // case insensitive
    const filtered = countries.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    setFilterResults(filtered)

  }, [filter, countries])


  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }


  if (filterResults.length > 10) {

    return (
      <div>
        <Filter handler={onFilterChange} filter={filter}/>
      {filter !== "" && <p>Too many matches, speficy another filter</p>}
      </div>
    )

  } else if (filterResults.length > 1 || filterResults.length === 0) {

    return (
      <div>
        <Filter handler={onFilterChange} filter={filter}/>

        <CountryList filterResults={filterResults}/>
      </div>
    )

  } else if (filterResults.length === 1) {

    return (
      <div>
        <Filter handler={onFilterChange} filter={filter}/>

      <CountryData country={filterResults[0]} />
      </div>
    )

  }

}

export default App
