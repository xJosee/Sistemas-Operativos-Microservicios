import { GoogleMap, withScriptjs, withGoogleMap, Circle, Polygon } from 'react-google-maps'
import polygons from './polygons'

const Map = (props) => {
    console.log(props)
    return (
        <GoogleMap
            defaultZoom={7.1}
            defaultCenter={{ lat: 15.400000, lng: -90.3623474 }}
        >
            <Polygon
                path={props.selectedRegion}
                key={1}
                options={{
                    fillColor: props.color,
                    fillOpacity: 0.6,
                    strokeColor: '#000',
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    title: 'Peten',
                    label: 'Peten',
                }} />


        </GoogleMap>
    )
}

export default withScriptjs(
    withGoogleMap(
        Map
    )
)