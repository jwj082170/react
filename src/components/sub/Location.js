import Layout from '../common/Layout';
import { useEffect, useRef } from 'react';

function Location() {
	const container = useRef(null);
	const { kakao } = window;

	const option = {
		center: new kakao.maps.LatLng(37.5116828, 127.059151),
		level: 3,
	};

	useEffect(() => {
		new kakao.maps.Map(container.current, option);
	}, []);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Location;
