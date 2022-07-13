import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class CategoriesDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {
            fields,
            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v2/categories/get', dataVals, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/categories/get/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v2/categories/post", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/categories/update/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/categories/delete/${id}`, data, config);
    }

    deleteAll() {
        return axios.post(`/api/v2/categories`);
    }

    findByCategoryName(name) {
        return axios.post(`/api/v2/categories?name=${name}`);
    }
}

export default new CategoriesDataService();