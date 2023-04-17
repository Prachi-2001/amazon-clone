import axios from 'axios';

const instance = axios.create({
    // this is the local api endpoint url
    baseURL: 'http://127.0.0.1:5001/clone-606ca/us-central1/api'
});

export default instance;