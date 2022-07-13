import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class CompaniesDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {
            fields,
            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v3/companies/list', dataVals, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v3/companies/${id}`, config);
    }

    create(data) {


        return axios.post(`/api/v3/companies`, data);
    }

    update(id, data) {
        console.log(data)
        return axios.put(`/api/v3/companies/${id}`, data);
    }

    delete(id) {

        return axios.delete(`/api/v3/companies/${id}`);
    }

    deleteAll() {
        return axios.post(`/api/v2/companies`);
    }

    findByBrandName(name) {
        return axios.post(`/api/v2/companies?name=${name}`);
    }
}

export default new CompaniesDataService();