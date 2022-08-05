import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class Warehouse_cellDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {

            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v3//warehouseCells/list', pages, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v3/warehouseCells/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        console.log(data)
        return axios.post("/api/v3//warehouseCells", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.put(`/api/v3/warehouseCells/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v3/warehouseCells/${id}`, data, config);
    }

    deleteAll() {
        return axios.post(`/api/v3/warehouses_cells`, config);
    }

    findByWarehouse_cellName(name) {
        return axios.post(`/api/v3/warehouses_cells?name=${name}`);
    }
}

export default new Warehouse_cellDataService();