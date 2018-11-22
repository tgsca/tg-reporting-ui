import http from './basic/httpService';
import { apiUrl, currentEnvironment } from '../config/config.json';

function url(id = null) {
    return `${apiUrl[currentEnvironment]}/milestones` + (id ? `/${id}` : '');
}

export function getMilestone(id) {
    return http.get(url(id));
}

export function getMilestonesByProject(project) {
    return http.get(`${url()}?project._id=${project._id}`);
}

export function getMilestonesByProjectId(id) {
    return http.get(`${url()}?project._id=${id}`);
}

export default {
    getMilestone,
    getMilestonesByProject,
    getMilestonesByProjectId
};
