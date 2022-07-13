import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class DocumentsDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {

            pages
        };


        let config = {
            headers: authHeader(),
        }

        let test = {
            "pg_number": 1,
            "pg_length": 7
        }
        console.log("<<<<<<>>>>>>>")
        console.log(pages)
        console.log(config)
        console.log("<<<<<<>>>>>>>")


        return axios.post('/api/v3/documents/list', test, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v3/documents/${id}`, config);
    }

    create(data) {
        console.log("DocumentDataService CREATE FUNCTION")
        console.log(data)


        return axios.post(`/api/v3/documents`, data);
    }

    update(id, data) {
        console.log(data)
        console.log(`/api/v3/documents/${id}`)
        return axios.put(`/api/v3/documents/${id}`, data);

    }

    delete(id) {

        return axios.delete(`/api/v3/documents/delete/${id}`);
    }

    deleteAll() {
        return axios.post(`/api/v3/documents`);
    }

    findByBrandName(name) {
        return axios.post(`/api/v3/documents?name=${name}`);
    }

    holddocument(id) {
        return axios.post(`/api/v3/documents/hold/${id}`);

    }
    unholddocument(id) {
        return axios.post(`/api/v3/documents/unhold/${id}`);

    }
}

export default new DocumentsDataService();