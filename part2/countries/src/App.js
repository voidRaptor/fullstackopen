import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({handler, filter}) => {
  return (
    <>
      find countries <input onChange={handler} value={filter}/>
    </>
  )
}


const CountryListItem = ({country, setFilter}) => {

  const handler = event => {
    setFilter(country.name)
  }


  return (
    <>
      <p>
        {country.name}
        <button type="button" onClick={handler}>show</button>
      </p>
    </>
  )
}


const CountryList = ({filterResults, setFilter}) => {
  return (
    <>
      {
        filterResults.map(item => <CountryListItem key={item.name} country={item} setFilter={setFilter}/>)
      }
    </>
  )
}


const WeatherData = ({weather}) => {
  return (
    <>
      <p>
        <b>temperature: </b>
        {weather["current"]["temperature"]} celsius
      </p>
      <img src={weather["current"]["weather_icons"][0]} alt="weather icon" width="64" height="64"></img>
      <p>
        <b>wind: </b>
        {weather["current"]["wind_speed"]} km/h direction {weather["current"]["wind_dir"]}
      </p>
    </>
  )
}


const CountryData = ({country, weather}) => {
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


      <h2>Weather in {country["capital"]}</h2>
      {weather !== undefined && <WeatherData weather={weather} />}
    </>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [ filterResults, setFilterResults ] = useState(countries)
  const [ filter, setFilter ] = useState('')
  const [ weather, setWeather ] = useState(undefined)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })

  }, [])


  // Setting the state is async and last inputted char might not be included in event.
  // This is called after the state is set.
  useEffect(() => {
    // case insensitive
    const filtered = countries.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    setFilterResults(filtered)

  }, [filter, countries])


  // fetch specific country's weather data
  useEffect(() => {

    if (filterResults.length === 1) {
      const url = "http://api.weatherstack.com/current" +
        "?access_key=" + process.env.REACT_APP_API_KEY +
        "&query=" + filterResults[0].capital +
        "&units=m"

      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })




    }

  }, [filterResults])



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

        <CountryList filterResults={filterResults} setFilter={setFilter}/>
      </div>
    )

  } else {

    return (
      <div>
        <Filter handler={onFilterChange} filter={filter}/>

      <CountryData country={filterResults[0]} weather={weather} />
      </div>
    )

  }

}

export default App
