import Layout from '../common/Layout';
import { useEffect, useRef } from 'react';

function Location() {
	const container = useRef(null);
	const { kakao } = window;

	const option = {
		center: new kakao.maps.LatLng(37.51271224560607, 127.06069135102807),
		level: 3,
	};

	const marker = new kakao.maps.Marker({
		position: option.center,
	});

	useEffect(() => {
		const map_instance = new kakao.maps.Map(container.current, option);
		marker.setMap(map_instance);
	}, []);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Location;
