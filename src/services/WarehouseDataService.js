import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class WarehouseDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {
            fields,
            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v3/warehouses/list', config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v3/warehouses/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v3/warehouses", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.put(`/api/v3/warehouses/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v3/warehouses/delete/${id}`, data, config);
    }

    deleteAll() {
        return axios.delete(`/api/v3/warehouses`);
    }

    findByWarehouseName(name) {
        return axios.post(`/api/v3/warehouses?name=${name}`, config);
    }
}

export default new WarehouseDataService();