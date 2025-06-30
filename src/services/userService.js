import axios from 'axios';

const BASE_URL = 'https://eatmeow-api-production.up.railway.app/api/users';

export const getAllUsers = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}