import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from 'prop-types';


const RegisterMap = ({stateLat, stateLng}) => {
  const Mark = ({ text }) => <div>{text}</div>;
  
    const defaultVar = {
    center: {
      lat: stateLat,
      lng: stateLng,
    },
    zoom: 17,
  };

  return (
    <div>

      <div style={{ height: "50vh", width: "50vw" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API }}
          defaultCenter={defaultVar.center}
          defaultZoom={defaultVar.zoom}
        > 
          <Mark
            lat={stateLat}
            lng={stateLng}
            text={<div className="pointer">
                <p>Aqui esta Usted</p>
              <div className="circle">
              </div>
              </div>
            }
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};
export default RegisterMap;

RegisterMap.propTypes = {	
		text: PropTypes.string.isRequired,
		stateLat: PropTypes.number.isRequired,
		stateLng: PropTypes.number.isRequired
};