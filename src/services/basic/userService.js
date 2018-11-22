import http from './httpService';
import { apiUrl, currentEnvironment } from '../../config/config.json';

const apiEndpoint = `${apiUrl[currentEnvironment]}/users`;

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.email,
        password: user.password,
        name: user.name
    });
}

export default {
    register
};
