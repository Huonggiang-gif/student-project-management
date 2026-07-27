import api from "./api";

const progressService = {
    getAll() {
        return api.get("/progress");
    },

    getById(id) {
        return api.get(`/progress/${id}`);
    },

    create(data) {
        return api.post("/progress", data);
    },

    update(id, data) {
        return api.put(`/progress/${id}`, data);
    },

    remove(id) {
        return api.delete(`/progress/${id}`);
    }
};

export default progressService;