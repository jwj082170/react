import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function Youtube() {
	const [Vids, setVids] = useState([]);

	useEffect(() => {
		const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
		const playlist = 'PLHtvRFLN5v-VD95TBpr5Dh2zguWCjjmMG';
		const num = 6;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;
		axios.get(url).then((json) => {
			console.log(json.data.items);
			setVids(json.data.items);
		});
	}, []);

	return (
		<Layout name={'Youtube'}>
			{Vids.map((vid) => (
				<article key={vid.id}>
					<h2>
						{vid.snippet.title.length > 30
							? vid.snippet.title.substr(0, 30) + '...'
							: vid.snippet.title}
					</h2>

					<div className='txt'>
						<p>
							{vid.snippet.description.length > 200
								? vid.snippet.description.substr(0, 200) +
								  '...'
								: vid.snippet.description}
						</p>
						<span>
							{vid.snippet.publishedAt.split('T')[0]}
						</span>
					</div>

					<div className='pic'>
						<img
							src={vid.snippet.thumbnails.standard.url}
							alt={vid.title}
						/>
						<FontAwesomeIcon icon={faYoutube} />
					</div>
				</article>
			))}
		</Layout>
	);
}

export default Youtube;
