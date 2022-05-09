import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './leaflet.css'
import 'leaflet/dist/leaflet.css';
import Markers from './Markers';

const Leaflet = () => {
	return (
		<MapContainer center={[-34.5974162, -58.3795922]} zoom={13} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
            <Markers />
		</MapContainer>
	);
};

export default Leaflet;
