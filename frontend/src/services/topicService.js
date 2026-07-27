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

    getAll() {
        return axios.get(API_URL, getConfig());
    },

    getById(id) {
        return axios.get(`${API_URL}/${id}`, getConfig());
    },

    create(data) {
        return axios.post(API_URL, data, getConfig());
    },

    update(id, data) {
        return axios.put(`${API_URL}/${id}`, data, getConfig());
    },

    remove(id) {
        return axios.delete(`${API_URL}/${id}`, getConfig());
    },

    approve(id) {
        return axios.patch(
            `${API_URL}/${id}/approve`,
            {},
            getConfig()
        );
    },

    reject(id) {
        return axios.patch(
            `${API_URL}/${id}/reject`,
            {},
            getConfig()
        );
    }
};

export default topicService;