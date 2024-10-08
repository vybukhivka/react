import Spinner from './Spinner'
import styles from './CityList.module.css'
import CountryItem from './CountryItem'
import Message from './Message'

function CountryList({cities, isLoading}) {
  if(isLoading) return <Spinner />
  console.log(cities)

  if(!cities.length) return <Message message='Add your first city by clicking on a city on the map' />

  const countries = cities.reduce((arr, city) => {
    if(!arr.map(el => el.country).includes(city.country))
      return [...arr, {country: city.country, emoji: city.emoji}]
    else return arr
  } ,[])

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => <CountryItem country={country} key={i}/> )} 
    </ul>
  )
}

export default CountryList
