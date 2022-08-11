import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

function Location() {
	const container = useRef(null);
	const { kakao } = window;
	const [Location, setLocation] = useState(null);

	const option = {
		center: new kakao.maps.LatLng(37.51271224560607, 127.06069135102807),
		level: 3,
	};

	const imgSrc = process.env.PUBLIC_URL + '/img/marker1.png';
	const imgSize = new kakao.maps.Size(232, 99);
	const imgPos = { offset: new kakao.maps.Point(116, 99) };

	const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);

	const marker = new kakao.maps.Marker({
		position: option.center,
		image: markerImage,
	});

	useEffect(() => {
		const map_instance = new kakao.maps.Map(container.current, option);
		marker.setMap(map_instance);
		setLocation(map_instance);
	}, []);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<button onClick={() => Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>
				Traffic ON
			</button>
			<button onClick={() => Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>
				Traffic OFF
			</button>
		</Layout>
	);
}

export default Location;
