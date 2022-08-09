import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Department() {
	const [Members, setMembers] = useState([]);
	useEffect(() => {
		axios
			.get(process.env.PUBLIC_URL + '/DB/members.json')
			.then((json) => {
				setMembers(json.data.members);
			});
	}, []);

	useEffect(() => {
		console.log(Members);
	}, [Members]);

	return <Layout name={'Department'}></Layout>;
}

export default Department;
