import axios from 'axios'


class ComopanyDataService {

    getAll() {
        return axios.get('/api/v1/companies')
    }

    get(id) {
        return axios.get(`/api/v1/companies/${id}`);
    }

    create(data) {
        return axios.post("/api/v1/companies", data);
    }

    update(id, data) {
        return axios.put(`/api/v1/companies/${id}`, data);
    }

    delete(id) {
        return axios.delete(`/api/v1/companies/${id}`);
    }

    deleteAll() {
        return axios.delete(`/api/v1/companies`);
    }

    findByTitle(title) {
        return axios.get(`/api/v1/companies?title=${title}`);
    }
}

export default new ComopanyDataService();