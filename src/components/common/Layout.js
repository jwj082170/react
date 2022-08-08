function Layout({ children }) {
	return (
		<section>
			<figure>
				<h1>Title</h1>
			</figure>

			<div className='inner'>{children}</div>
		</section>
	);
}

export default Layout;
