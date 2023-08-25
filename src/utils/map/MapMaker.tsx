import { useEffect, useState } from 'react';
import {
  useNavermaps,
  NaverMap,
  Marker,
  Container as MapDiv,
} from 'react-naver-maps';
import { Pub } from 'src/domain/Pub.model';

type MapProps = {
  pubsData: Pub[];
};
const MapMakers = ({ pubsData }: MapProps) => {
  const navermaps = useNavermaps();
  const jeju = new navermaps.LatLng(33.3590628, 126.534361);
  return (
    <MapDiv className="w-full h-[300px] max-md:w-full">
      <NaverMap defaultCenter={jeju} defaultZoom={9}>
        {pubsData.map((v, i) => (
          <Marker
            key={i}
            defaultPosition={new navermaps.LatLng(v.lat, v.lon)}
          />
        ))}
      </NaverMap>
    </MapDiv>
  );
};
export default MapMakers;
