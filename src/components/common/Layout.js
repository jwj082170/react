function Layout({ children, name }) {
	return (
		<section className={`content ${name}`}>
			<figure>
				<img
					src={`${process.env.PUBLIC_URL}/img/${name}.jpg`}
					alt={name}
				/>
				<h1>{name}</h1>
			</figure>

			<div className='inner'>{children}</div>
		</section>
	);
}

export default Layout;
