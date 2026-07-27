import axios from "axios";

const API_URL = "http://localhost:3000/api/topics";

function getConfig() {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

const topicService = {

    async getAll() {
        const response = await axios.get(API_URL, getConfig());
        return response.data;
    },

    async getById(id) {
        const response = await axios.get(`${API_URL}/${id}`, getConfig());
        return response.data;
    },

    async create(data) {
        const response = await axios.post(
            API_URL,
            data,
            getConfig()
        );
        return response.data;
    },

    async update(id, data) {
        const response = await axios.put(
            `${API_URL}/${id}`,
            data,
            getConfig()
        );
        return response.data;
    },

    async remove(id) {
        const response = await axios.delete(
            `${API_URL}/${id}`,
            getConfig()
        );
        return response.data;
    },

    async approve(id) {
        const response = await axios.patch(
            `${API_URL}/${id}/approve`,
            {},
            getConfig()
        );
        return response.data;
    },

    async reject(id) {
        const response = await axios.patch(
            `${API_URL}/${id}/reject`,
            {},
            getConfig()
        );
        return response.data;
    },

    async getAvailableTopics() {
        const response = await axios.get(
            `${API_URL}/available`,
            getConfig()
        );
        return response.data;
    },

    async registerTopic(data) {
        const response = await axios.post(
            `${API_URL}/register`,
            data,
            getConfig()
        );
        return response.data;
    }

};

export default topicService;