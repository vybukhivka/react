import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'

function Map() {
	const { cities } = useCities()
	const [mapPosition, setMapPosition] = useState([40, 0])
	const { isLoading: isLoadingPosition, position: geoloactionPosition, getPosition} = useGeolocation()
	const [mapLat, mapLng] = useUrlPosition()

	useEffect(() => {
		if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
	} ,[mapLat, mapLng])

	useEffect(() => {
		if(geoloactionPosition) setMapPosition([geoloactionPosition.lat, geoloactionPosition.lng])
	}, [geoloactionPosition])

	return (
		<div className={styles.mapContainer}>
			{!geoloactionPosition && (
				<Button type='position' onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use your position'}
				</Button>
			)}
			<MapContainer 
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.mapContainer}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map(city => <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
					<Popup>
						<span>{city.emoji}</span> <span>{city.cityName}</span>
					</Popup>
				</Marker>)}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	)
}

function ChangeCenter({position}) {
	const map = useMap()
	map.setView(position)
	return null
}

function DetectClick() {
	const navigate = useNavigate()

	useMapEvents({
		click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`) 
	})
}

export default Map
