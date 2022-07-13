import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';



class CountryDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {

            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v2/products/get', pages, config)
    }



    get(id) {
        return axios.post(`/api/v2/product/get/${id}`);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v2/products/create", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/product/update/${id}`, data, config);
    }

    delete(id) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/product/delete/${id}`, [0], config);
    }

    deleteAll() {
        return axios.delete(`/api/v2/products/delete`);
    }

    findByProductName(name) {
        return axios.post(`/api/v2/products?name=${name}`);
    }
}

export default new CountryDataService();