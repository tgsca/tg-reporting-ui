import _ from 'lodash';
import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';

function url(id = null) {
    return `${apiUrl[currentEnvironment]}/projects` + (id ? `/${id}` : '');
}

export function getProjects() {
    return http.get(url());
}

export function getProject(id) {
    return http.get(url(id));
}

export function saveProject(project) {
    if (!project._id) return http.post(url(), project);
    else {
        return http.put(url(project._id), _.pick(project, ['name', 'description']));
    }
}

export function deleteProject(id) {
    return http.delete(url(id));
}

export default {
    getProject,
    getProjects,
    saveProject,
    deleteProject
};
