import {MarkerF} from "@react-google-maps/api";
import {Fragment, useState} from "react";
import InfoWindow from "./InfoWindow";
import moment from "moment";
import 'moment/locale/ko';

const MarkerLists = (props) => {
    const {
        data
    } = props;

    const [activeMarker, setActiveMarker] = useState(null);
    const handleInfoWindow = (marker) => {
        console.log('marker:', marker)
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    }

    const makeColor = (day) => {
        if (day === '월') return "red"
        if (day === '화') return "orange"
        if (day === '수') return "yellow"
        if (day === '목') return "green"
        if (day === '금') return "skyblue"
        if (day === '토') return "gray"
        if (day === '일') return "pink"

    }

    const markerUrl = `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1.5rem" height="2rem" viewBox="0 0 384 512"%3E%3Cpath fill="${makeColor(`${moment(data.planDate).format('ddd')}`)}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192C0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67c-9.535 13.774-29.93 13.773-39.464 0z"%2F%3E%3C%2Fsvg%3E`;

    return (
        <Fragment>
            {data !== null ? (
                data.places.map((singleData) => (
                    <Fragment key={singleData.placeId}>
                        <MarkerF
                            position={{
                                lat: singleData.latitude,
                                lng: singleData.longitude
                            }}
                            onClick={() => handleInfoWindow(singleData.placeId)}
                            label={`${moment(data.planDate).format('ddd')}`}
                            options={{
                                icon: {
                                    url: markerUrl,
                                }
                            }}
                        />
                        {activeMarker === singleData.placeId ? (
                            <InfoWindow
                                key={singleData.planDateId}
                                singleData={singleData}
                                setActiveMarker={setActiveMarker}
                            />
                        ) : null}
                    </Fragment>
                ))) : null
            }
        </Fragment>
    )
};

export default MarkerLists;