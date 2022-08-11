import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

function Location() {
	const { kakao } = window;

	//각 지점별 정보값 배열에 추가
	const info = [
		{
			title: '삼성동 코엑스',
			latlng: new kakao.maps.LatLng(37.51271224560607, 127.06069135102807),
			imgUrl: process.env.PUBLIC_URL + '/img/marker1.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '올림픽 공원',
			latlng: new kakao.maps.LatLng(37.51881764760613, 127.11633054508519),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 90) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.566918804166775, 126.97863525321908),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 90) },
		},
	];

	const container = useRef(null);
	const [Location, setLocation] = useState(null);
	const [Traffic, setTraffic] = useState(false);
	const [Info, setInfo] = useState(info);
	//지점버튼 클릭시 변경되는 순서값이 저장될 스테이트 추가
	const [Index, setIndex] = useState(0);

	const option = {
		center: Info[Index].latlng,
		level: 3,
	};

	const imgSrc = Info[Index].imgUrl;
	const imgSize = Info[Index].imgSize;
	const imgPos = Info[Index].imgPos;

	const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);

	const marker = new kakao.maps.Marker({
		position: option.center,
		image: markerImage,
	});

	//기존에 의존성 배열이 비어져 있을때에는 그냥 컴포넌트 마운트시 지도가 한번 호출되고 마는 구조
	//의존성 배열에 Index스테이트를 등록하면 지점버튼을 클릭해서 Index스테이트가 변경될때마다 새로 변경된 Index값 정보를 토대로 지도 재호출
	useEffect(() => {
		const map_instance = new kakao.maps.Map(container.current, option);
		marker.setMap(map_instance);
		setLocation(map_instance);
	}, [Index]);

	useEffect(() => {
		if (!Location) return;
		Traffic
			? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>

			{/* 지점보기 버튼 추가후 버튼 클릭시 해당 버튼의 순서값으로 Index스테이트 변경 */}
			<ul className='branch'>
				<li onClick={() => setIndex(0)}>삼성동 코엑스</li>
				<li onClick={() => setIndex(1)}>올림픽 공원</li>
				<li onClick={() => setIndex(2)}>서울 시청</li>
			</ul>
		</Layout>
	);
}

export default Location;
