import { createContext, useContext, useEffect, useReducer, useState } from "react";

const BASE_URL = 'http://localhost:8000'
const CitiesContext = createContext()

function reducer(state, action) {	
	switch(action.type) {
		case 'loading':
			return {
				...state,
				isLoading: true
			}
		case 'cities/loaded':
			return {
				...state,
				isLoading: false, 
				cities: action.payload
			}
		case 'cities/created':
		case 'cities/deleted':
		case 'rejected':
			return {
				...state,
				isLoading: false,
				error: action.payload
			}
		default:
			throw new Error ('Unknown action')
	}
}

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: ''
}

function CitiesProvider({children}) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)
 //  const [cities, setCities] = useState([])
 //  const [isLoading, setIsLoading] = useState(false)
	// const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    async function fetchCities() {
			dispatch({type: "loading"})
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
				dispatch({type: 'cities/loaded', payload: data})
      } catch(err) {
        dispatch({
					type: 'rejected',
					payload: 'There was an error loading data...'
				})
      }
    }
    fetchCities()
  }, [])
	
	async function getCity(id) {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        setCurrentCity(data)
      } catch(err) {
        throw new Error('There was an error loading data...', err)
      } finally {
        setIsLoading(false)
      }
  }

	async function createCity(newCity) {
		try {
			setIsLoading(true)
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json'
				}	
			})
			const data = await res.json()

			setCities(cities => [...cities, data])	
		} catch(err) {
			throw new Error('There was an error creating the city...', err)
		} finally {
			setIsLoading(false)
		}
	}
	
	async function deleteCity(id) {
		try {
			setIsLoading(true)
			const res = await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			})

			setCities(cities => cities.filter(city => city.id !== id))	
		} catch(err) {
			throw new Error('There was an error deleting the city...', err)
		} finally {
			setIsLoading(false)
		}
	}

	return <CitiesContext.Provider value={{
		cities,
		isLoading,
		currentCity,
		getCity,
		createCity,
		deleteCity
	}}>{children}</CitiesContext.Provider>
}

function useCities() {
	const context = useContext(CitiesContext)
	if(context === undefined) throw new Error('CitiesContext was used outsides of CitiesProvider')
	return context
}

export {CitiesProvider, useCities} 
