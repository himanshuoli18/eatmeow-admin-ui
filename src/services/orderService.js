import axios from 'axios';

const BASE_URL = 'https://eatmeow-api.onrender.com/api/orders';

export const getAllOrders = async () => {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
}

export const updateOrderStatus = async (orderId, newStatus) => {
    await axios.patch(`${BASE_URL}/status/${orderId}?status=${newStatus}`);
}

