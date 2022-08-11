import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

function Location() {
	const container = useRef(null);
	const { kakao } = window;
	const [Location, setLocation] = useState(null);
	//traffic 출력여부를 결정할 boolean값이 담길 state추가
	const [Traffic, setTraffic] = useState(false);

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

	//Traffic값이 바뀔때마다 호출되는 useEffect문
	useEffect(() => {
		if (!Location) return;
		//Traffic값이 true일때 교통량 표시
		//그렇지 않으면 교통량 표시제거
		Traffic
			? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			{/* 버튼을 클릭할때마다 기존의 Traffic정보값을 반전시킴 (토글) */}
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
		</Layout>
	);
}

export default Location;
