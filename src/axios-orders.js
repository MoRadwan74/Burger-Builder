import Axios from 'axios';

const instance = Axios.create({
	baseURL: 'https://react-burger-dev.firebaseio.com/'
});

export default instance;