import axios from 'axios'


class CountryDataService {

    getAll() {
        return axios.get('/api/v1/countries')
    }

    get(id) {
        return axios.get(`/api/v1/countries/${id}`);
    }

    create(data) {
        return axios.post("/api/v1/countries", data);
    }

    update(id, data) {
        return axios.put(`/api/v1/countries/${id}`, data);
    }

    delete(id) {
        return axios.delete(`/api/v1/countries/${id}`);
    }

    deleteAll() {
        return axios.delete(`/api/v1/countries`);
    }

    findByTitle(title) {
        return axios.get(`/api/v1/countries?title=${title}`);
    }
}

export default new CountryDataService();