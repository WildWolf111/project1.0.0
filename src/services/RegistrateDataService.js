import axios from 'axios'


class RegistrateDataService {



    create(data) {
        console.log("---------------------")
        console.log(data)
        console.log("---------------------")
        return axios.post("/api/v2/users/register", data);

    }




}

export default new RegistrateDataService();