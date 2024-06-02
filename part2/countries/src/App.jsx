import { useState,useEffect } from 'react'
import countryService from './services/countries'

const CountryList= ({countries})=>
  {
    return(
      <div>
        {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
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
  const handleShow=()=>{
    if(value===''){
      return <p></p>
    }
    else if(filteredCountries.length<=10 && filteredCountries.length>1){
      return <CountryList countries={filteredCountries} />

    }
    else if(filteredCountries.length===1){
      return <CountryDetails country={filteredCountries[0]} />
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
