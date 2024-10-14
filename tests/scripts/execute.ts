import axios from "axios"
import { environment } from "../../src/environments/environment"

export const executeSeed = async () => {
  console.log('Seeding started');
  try {
    const response = await axios.post(`${environment.apiUrl}seed`);
    console.log('Seed response:', response.data);
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};
