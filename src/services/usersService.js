import apiUtil from '../utils/api';
import imageApiUtil from '../utils/imageApi';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
};

export default {
    async getAll () {
        try {
            const response = await apiUtil.get(buildUrl('/'));
            console.log(response.data);
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    },
    async create (newOne) {
        const response = await apiUtil.post(buildUrl('/'), newOne);
        return response.data;
    },
    async delete (id) {
        const response = await apiUtil.delete(buildUrl(`/${id}`));
        return response.data;
    },
    async updateCompletionStatus (id, isCompleted) {
        const response = await apiUtil.update(buildUrl(`/${id}`),
            isCompleted,
        );
        return response.data;
    },
    async uploadImage (formData) {
        const response = await imageApiUtil.post(buildUrl('/avatar-upload'), formData);
        return response.data;
    },
    async likeUser (currentUserId, likedUserId) {
        const response = await apiUtil.update(buildUrl(`/like/${currentUserId}`), 
            { _id: likedUserId}
        );
        return response.data;
    }
};