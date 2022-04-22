import axios from 'axios'


class WarehouseDataService {

    getAll() {
        return axios.get('/api/v1/warehouses')
    }

    get(id) {
        return axios.get(`/api/v1/warehouses/${id}`);
    }

    create(data) {
        return axios.post("/api/v1/warehouses", data);
    }

    update(id, data) {
        return axios.put(`/api/v1/warehouses/${id}`, data);
    }

    delete(id) {
        return axios.delete(`/api/v1/warehouses/${id}`);
    }

    deleteAll() {
        return axios.delete(`/api/v1/warehouse`);
    }

    findByTitle(title) {
        return axios.get(`/api/v1/warehouse?title=${title}`);
    }
}

export default new WarehouseDataService();