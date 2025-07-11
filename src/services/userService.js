import axios from 'axios';

const BASE_URL = 'https://eatmeow-api.onrender.com/api/users';

export const getAllUsers = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}
