import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';



// eslint-disable-next-line no-unused-vars
class UniversalDataService {

    path = '/api/v2/data'
    mpath = '';
    setPath(pth) {
        this.mpath = this.path + '/' + pth;
    }
    list(params) {

        let config = {
            headers: authHeader(),
            body: params

        }
        console.log("---------------------")
        console.log(config)
        return axios.post(this.mpath, config)

    }
    create(id, params) {
        let config = {
            headers: authHeader(),
        }
        return axios.post(this.mpath, params, config)
    }

    update(id, params) {
        let config = {
            headers: authHeader(),
        }
        return axios.put(this.mpath + '/' + id, params, config)
    }

    delete(id) {
        let config = {
            headers: authHeader(),
        }
        return axios.delete(this.mpath + '/' + id, config)
    }

}
export default new UniversalDataService();