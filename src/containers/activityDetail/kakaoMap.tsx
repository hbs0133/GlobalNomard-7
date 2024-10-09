import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';

function KakaoMap({ address }: { address: string }) {
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [buildingName, setBuildingName] = useState('');

  const handleMapLoad = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        };
        setLocation(coords);
        setBuildingName(
          result[0].road_address ? result[0].road_address.building_name : '',
        );
        setIsLoaded(true);
      }
    });
  };

  return (
    <Map
      center={{ lat: location.lat, lng: location.lng }}
      style={{ width: '100%', height: '360px' }}
      level={3}
      onCreate={handleMapLoad}
    >
      {isLoaded && (
        <MapMarker position={{ lat: location.lat, lng: location.lng }}>
          <div className="w-[160px] text-ellipsis whitespace-nowrap">
            {buildingName ? buildingName : '위치'}
          </div>
        </MapMarker>
      )}
    </Map>
  );
}

export default KakaoMap;
