// src/services/ApiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9876/numbers';

const fetchNumbers = (numberId) => {
    return axios.get(`${API_BASE_URL}/${numberId}`)
                .then(response => response.data)
                .catch(error => {
                    console.error("Error fetching numbers:", error);
                    return null;
                });
};

export default { fetchNumbers };
