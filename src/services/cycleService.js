import _ from 'lodash';
import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';

function url(id = null) {
    return `${apiUrl[currentEnvironment]}/cycles` + (id ? `/${id}` : '');
}

export function getCycle(id) {
    return http.get(url(id));
}

export function getCycles() {
    return http.get(url());
}

export function getCyclesByProject(project) {
    return http.get(`${url()}?project._id=${project._id}`);
}

export function getCyclesByProjectId(id) {
    return http.get(`${url()}?project._id=${id}`);
}

export function saveCycle(cycle) {
    if (!cycle._id) return http.post(url(), cycle);
    else {
        return http.put(url(cycle._id), _.pick(cycle, ['name', 'version', 'startDate', 'endDate', 'projectId']));
    }
}

export default {
    getCycle,
    getCycles,
    getCyclesByProject,
    getCyclesByProjectId,
    saveCycle
};
