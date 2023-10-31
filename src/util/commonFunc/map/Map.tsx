import { useEffect, useState } from 'react';
import {
  NavermapsProvider,
  useNavermaps,
  NaverMap,
  Marker,
  Container as MapDiv,
} from 'react-naver-maps';

type MapProps = {
  lat: number;
  lon: number;
};
const MapTest = ({ lat, lon }: MapProps) => {
  const navermaps = useNavermaps();
  return (
    <MapDiv className="w-1/2 h-72 max-md:w-full">
      <NaverMap defaultCenter={new navermaps.LatLng(lat, lon)} defaultZoom={15}>
        <Marker defaultPosition={new navermaps.LatLng(lat, lon)} />
      </NaverMap>
    </MapDiv>
  );
};
export default MapTest;

// const MapTest = ({ lat, lon }: MapProps) => {
//   const { naver } = window;
//   const [myLocation, setMyLocation] = useState<
//     { latitude: number; longitude: number } | string
//   >('');
//   const otherLatLngs = [
//     { lat: 33.5162356, lng: 126.5249651 },
//     { lat: 33.5162356, lng: 126.5259551 },
//     { lat: 33.5162356, lng: 126.5269451 },
//     { lat: 33.5162356, lng: 126.5279351 },
//   ];

//   // 현재 위치 받아오기
//   useEffect(() => {
//     // if (navigator.geolocation) {
//     //   navigator.geolocation.getCurrentPosition((position) => {
//     //     setMyLocation({
//     //       latitude: position.coords.latitude,
//     //       longitude: position.coords.longitude,
//     //     });
//     //   });
//     // } else {

//     // }
//     setMyLocation({ latitude: lat, longitude: lon });
//   }, []);

//   useEffect(() => {
//     if (window.naver && window.naver.maps) {
//       // window.naver.maps 객체 사용

//       if (typeof myLocation !== 'string') {
//         const currentPosition = [myLocation.latitude, myLocation.longitude];

//         const map = new naver.maps.Map('map', {
//           center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//           zoomControl: true,
//         });

//         const currentMarker = new naver.maps.Marker({
//           position: new naver.maps.LatLng(
//             currentPosition[0],
//             currentPosition[1]
//           ),
//           map,
//         });

//         // 주변 마커 나타내기
//         for (let i = 0; i < otherLatLngs.length; i++) {
//           const otherMarkers = new naver.maps.Marker({
//             position: new naver.maps.LatLng(
//               otherLatLngs[i].lat,
//               otherLatLngs[i].lng
//             ),
//             map,
//           });
//         }
//       }
//     } else {
//       console.error('Naver Maps API has not been loaded.');
//     }
//   }, [myLocation]);

//   // 주변마커 오버레이 클릭 이벤트 적용하기
//   useEffect(() => {
//     if (typeof myLocation !== 'string') {
//       const currentPosition = [myLocation.latitude, myLocation.longitude];

//       const map = new naver.maps.Map('map', {
//         center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//         zoomControl: true,
//       });

//       const currentMarker = new naver.maps.Marker({
//         position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
//         map,
//       });

//       // 주변 마커 나타내기
//       const markers: naver.maps.Marker[] = [];
//       const infowindows: naver.maps.InfoWindow[] = [];
//       const contentTags =
//         '<div class="naver-container"><p class="ptag">여깁니다</p><span class="spantag">맞아요</span></div>';

//       // 반복문을 통해 찍어준다
//       for (let i = 0; i < otherLatLngs.length; i += 1) {
//         const otherMarkers = new naver.maps.Marker({
//           position: new naver.maps.LatLng(
//             otherLatLngs[i].lat,
//             otherLatLngs[i].lng
//           ),
//           map,
//         });

//         const infowindow = new naver.maps.InfoWindow({
//           content: contentTags,
//           borderWidth: 1,
//           anchorSize: new naver.maps.Size(10, 10),
//           pixelOffset: new naver.maps.Point(10, -10),
//         });

//         markers.push(otherMarkers);
//         infowindows.push(infowindow);
//       }

//       naver.maps.Event.addListener(map, 'idle', () => {
//         updateMarkers(map, markers);
//       });

//       const updateMarkers = (
//         isMap: naver.maps.Map,
//         isMarkers: naver.maps.Marker[]
//       ) => {
//         const mapBounds: any = isMap.getBounds();
//         let marker;
//         let position;

//         for (let i = 0; i < isMarkers.length; i += 1) {
//           marker = isMarkers[i];
//           position = marker.getPosition();

//           if (mapBounds.hasLatLng(position)) {
//             showMarker(isMap, marker);
//           } else {
//             hideMarker(marker);
//           }
//         }
//       };

//       const showMarker = (isMap: naver.maps.Map, marker: naver.maps.Marker) => {
//         marker.setMap(isMap);
//       };

//       const hideMarker = (marker: naver.maps.Marker) => {
//         marker.setMap(null);
//       };

//       const getClickHandler = (seq: number) => {
//         return () => {
//           const marker = markers[seq];
//           const infoWindow = infowindows[seq];

//           if (infoWindow.getMap()) {
//             infoWindow.close();
//           } else {
//             infoWindow.open(map, marker);
//           }
//         };
//       };

//       for (let i = 0; i < markers.length; i += 1) {
//         naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
//       }
//     }
//   }, [myLocation]);

//   return <div id="map" className="w-1/2 h-72 max-md:w-full" />;
// };
