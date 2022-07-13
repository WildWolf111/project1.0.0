import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class GTDDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {

            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v3/gtd/list', dataVals, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v3/gtd/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        console.log(data)
        return axios.post("/api/v3/gtd", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        console.log("<<<<<<<<<>>>>>>>>>>>>>>>>")
        console.log(data)
        console.log(`/api/v3/gtd/${id}`)
        return axios.put(`/api/v3/gtd/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v3/GTD/${id}`, data, config);
    }

    deleteAll() {
        return axios.post(`/api/v3/GTD`);
    }

    findByGTDName(name) {
        return axios.post(`/api/v3/GTD?name=${name}`);
    }
}

export default new GTDDataService();