import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import iconLocation from './IconLocation';

const Markers = () => {
	return (
		<Marker position={[-34.5974162, -58.3795922]} icon={iconLocation}>
			<Popup>Acá estamos ubicados</Popup>
		</Marker>
	);
};

export default Markers;
