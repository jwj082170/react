import Layout from '../common/Layout';
import Pop from '../common/Pop';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function Youtube() {
	const wrapper = useRef(null);
	const icon = useRef(null);
	const [Vids, setVids] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);
	const [Len, setLen] = useState(null);

	useEffect(() => {
		const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
		const playlist = 'PLHtvRFLN5v-VD95TBpr5Dh2zguWCjjmMG';
		const num = 6;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;
		axios.get(url).then((json) => {
			setVids(json.data.items);
		});
	}, []);

	useEffect(() => {
		if (!icon.current) return;
		const svgItem = icon.current.querySelector('path');
		const svgLen = svgItem.getTotalLength();
		setLen(svgLen);

		const pathAll =
			wrapper.current.querySelectorAll('path');

		pathAll.forEach((path) => {
			path.style.strokeDasharray = svgLen;
			path.style.strokeDashoffset = svgLen;
		});
	}, [Vids]);

	return (
		<>
			<Layout name={'Youtube'}>
				<div className='wrapper' ref={wrapper}>
					{Vids.map((vid, idx) => (
						<article key={vid.id}>
							<h2>
								{vid.snippet.title.length > 30
									? vid.snippet.title.substr(0, 30) + '...'
									: vid.snippet.title}
							</h2>

							<div className='txt'>
								<p>
									{vid.snippet.description.length > 200
										? vid.snippet.description.substr(
												0,
												200
										  ) + '...'
										: vid.snippet.description}
								</p>
								<span>
									{vid.snippet.publishedAt.split('T')[0]}
								</span>
							</div>

							<div
								className='pic'
								onMouseEnter={(e) => {
									e.currentTarget.querySelector(
										'path'
									).style.strokeDashoffset = 0;
								}}
								onMouseLeave={(e) => {
									e.currentTarget.querySelector(
										'path'
									).style.strokeDashoffset = Len;
								}}>
								<img
									src={vid.snippet.thumbnails.standard.url}
									alt={vid.title}
								/>
								<FontAwesomeIcon
									ref={icon}
									icon={faYoutube}
									onClick={() => {
										setOpen(true);
										setIndex(idx);
									}}
								/>
							</div>
						</article>
					))}
				</div>
			</Layout>

			{Open && (
				<Pop setOpen={setOpen}>
					<iframe
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
						frameBorder='0'></iframe>
				</Pop>
			)}
		</>
	);
}

export default Youtube;
