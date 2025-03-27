import axios from "axios";

class UserService {
    static BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

    static async register(userData) {
        try {
            const registerResponse = await axios.post(`${UserService.BASE_URL}/auth/register`, userData);
            return registerResponse;
        } catch (err) {
            throw err;
        }
    }

    static async login(username, password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { username, password });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }
}

export default UserService;
