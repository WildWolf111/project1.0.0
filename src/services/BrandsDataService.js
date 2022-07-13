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
        return axios.post('/api/v2/brands/get', pages, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/brand/get/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v2/brands/post", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/brands/update/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/brand/delete/${id}`, data, config);
    }

    deleteAll() {
        return axios.post(`/api/v2/brands`);
    }

    findByBrandName(name) {
        return axios.post(`/api/v2/brands?name=${name}`);
    }
}

export default new BrandDataService();