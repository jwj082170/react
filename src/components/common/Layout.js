import { useEffect, useRef } from 'react';

function Layout({ children, name }) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${name}`} ref={frame}>
			<figure>
				<img
					src={`${process.env.PUBLIC_URL}/img/${name}.jpg`}
					alt={name}
				/>
				<h1>{name}</h1>
			</figure>

			<div className='inner'>
				<h1>{name}</h1>
				{children}
			</div>
		</section>
	);
}

export default Layout;
