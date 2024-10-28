import axios from "axios"
import { environment } from "../../src/environments/environment"

export const executeSeed = async () => {
  try {
    const response = await axios.post(`${environment.apiUrl}seed`);
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

export const loginSuperAdmin = async () => {
  try {
    const response = await axios.post(`${environment.apiUrl}auth/login`, {
      username: 'SuperAdmin',
      password: 'SuperAdmin',
    });
    console.log('response', response.data);
    return response.data.accessToken;
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export const createCompany = async (token: string) => {
  try {
    const response = await axios.post(`${environment.apiUrl}companies`, {
      name: 'Vantino',
      password: '12345689A',
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

