import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class BrandDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {
            fields,
            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v3/countries/list', dataVals, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v3/countries/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v3/countries", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.put(`/api/v3/countries/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v3/country/delete/${id}`, data, config);
    }

    deleteAll() {
        return axios.post(`/api/v3/countries`);
    }

    findByBrandName(name) {
        return axios.post(`/api/v3/countries?name=${name}`);
    }
}

export default new BrandDataService();