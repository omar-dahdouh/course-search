import axios from 'axios';

async function getRequest(url) {
    const { data } = await axios.get(url);
    return data;
}

export {
    getRequest,
}
