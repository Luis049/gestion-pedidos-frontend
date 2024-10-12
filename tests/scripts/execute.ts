import axios from "axios"
import { environment } from "../../src/environments/environment"

export const executeSeed = async () => {
  return await axios.post(`${environment.apiUrl}seed`);
}
