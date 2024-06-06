import { useState,useEffect } from 'react'
import countryService from './services/countries'
import axios from 'axios'


const Weather = ({country})=>
  {
    const [weather, setWeather] = useState([])
    const api_key = import.meta.env.VITE_WEATHER_KEY
    const capital = country.capital
    console.log('CAPITAL',capital)
    console.log('API KEY',api_key)
    const baseUrl= `https://api.openweathermap.org/data/2.5/weather?q=${capital[0]}&appid=${api_key}&units=metric`
    console.log('BASE URL',baseUrl)
    useEffect(() => {
      axios
        .get(baseUrl)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => console.error('Error fetching weather data:', error))
    }, [])
  if(weather.length===0){
    return <p>Weather is being loaded</p>
  }
  // This above if statement is added because when the component is first rendered, the weather state is an empty array. So its structure is not as we expect it to be.
    return(
      <div>
        <h2>Weather in {capital[0]}</h2>
        temperature: {weather.main.temp} Celcius <br />
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Not Found" /><br />
        wind: {weather.wind.speed} m/s 
      </div>
    )
   
  }

const CountryList= ({countries,handleClick})=>
  {
    return(
      <div>
        {countries.map(country => <p key={country.name.common}>{country.name.common} 
        <button onClick={()=>handleClick(country)}>show</button>
        </p>)}

      </div>
    )
  }

  const CountryDetails = ({country}) => {
    return(
      <div>
         <h1>{country.name.common}</h1>
          capital {country.capital} <br/>
          area {country.area} <br /> <br />

          <strong>languages:</strong> <br />
           <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
           </ul>
          
          <img src={country.flags.png} alt={country.name.common} width="100"  />
          <Weather country={country} />
      </div>
    )
  }


function App() {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  },[])

  const handleChange = (event) => {
    setValue(event.target.value)
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    console.log(filteredCountries)
    console.log(filteredCountries[0])
    setFilteredCountries(filteredCountries)
  }
  
  const handleClick=(country)=>{
    console.log(country)
    setFilteredCountries([country])
  }

  const handleShow=()=>{
    if(value===''){
      return <p></p>
    }
    else if(filteredCountries.length<=10 && filteredCountries.length>1){
      return <CountryList countries={filteredCountries} handleClick={handleClick} />

    }
    else if(filteredCountries.length===1){
      return <CountryDetails country={filteredCountries[0] }  />
      // here filteredCountries[0] is an object while filteredCountries is and array containing this one object. If you look at the CountryDetails component, you will see that it expects an object as a prop. That's why we pass filteredCountries[0] to it.
    }
    else if(filteredCountries.length>10){
      return <p>Too many matches, specify another filter</p>
    }
    else{
      return <p>No matches</p>
    }
  }

  return (
    <>
      <div>
        find countries <input
        value={value}
        onChange={handleChange}
        />      
      </div>
      <div>
        {handleShow()}
      </div>
     
    </>
  )
}

export default App
