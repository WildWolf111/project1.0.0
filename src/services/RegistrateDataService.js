import axios from 'axios'


class RegistrateDataService {



    create(data) {
        return axios.post("/api/v2/users/registrate", data);
    }




}

export default new RegistrateDataService();