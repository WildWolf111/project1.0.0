import axios from 'axios'


class LoginDataService {



    create(data) {
        return axios.post("/api/v2/users/auth", data);
    }




}

export default new LoginDataService();