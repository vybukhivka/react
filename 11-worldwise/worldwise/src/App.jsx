import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"

const BASE_URL = 'http://localhost:8000'

function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        console.log(data)
        setCities(data)
      } catch(err) {
        throw new Error('There was an error loading data...', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  // console.log(cities, isLoading)

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='product' element={<Product />} />
					<Route path='pricing' element={<Pricing />} />
					<Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate replace to='cities' />} />
            <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
            <Route path='cities/:id' element={<City />} />
						<Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
						<Route path='form' element={<Form />} />
					</Route>
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
