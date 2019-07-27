import axios from "axios";
import * as Config from "../constants/config";

export default function callApi(endpoint, method = "GET", body, headers) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
    headers: headers
  }).catch(err => {
    console.log(err);
  });
}
