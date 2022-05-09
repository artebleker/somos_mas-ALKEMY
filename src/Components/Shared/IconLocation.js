import { icon } from 'leaflet';
import iconLoc from '../../assets/leaflet/iconLocation.svg';

const iconLocation = icon({
	iconUrl: iconLoc,
	iconRetinaUrl: iconLoc,
    iconSize: [60, 60],
    className: 'leaflet-venue-icon',
});

export default iconLocation;
