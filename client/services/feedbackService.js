const API_URL = '/api/feedback';

export const feedbackService = {
    // Get all feedback with pagination, sorting, filtering, and search
    getAllFeedback: async (params = {}) => {
        const {
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc',
            rating,
            course,
            student,
            search
        } = params;

        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sortBy,
            order
        });

        if (rating) queryParams.append('rating', rating.toString());
        if (course) queryParams.append('course', course);
        if (student) queryParams.append('student', student);
        if (search) queryParams.append('search', search);

        const response = await fetch(`${API_URL}?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch feedback');
        return response.json();
    },

    // Get current student's feedback
    getMyFeedback: async (page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', token) => {
        const response = await fetch(
            `${API_URL}/my-feedback?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) throw new Error('Failed to fetch your feedback');
        return response.json();
    },

    // Get single feedback by ID
    getFeedbackById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch feedback');
        return response.json();
    },

    // Get feedback statistics
    getStats: async () => {
        const response = await fetch(`${API_URL}/stats`);
        if (!response.ok) throw new Error('Failed to fetch statistics');
        return response.json();
    },

    // Create new feedback
    createFeedback: async (data, token) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to submit feedback');
        }
        return response.json();
    },

    // Update feedback
    updateFeedback: async (id, data, token) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update feedback');
        }
        return response.json();
    },

    // Delete feedback
    deleteFeedback: async (id, token) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete feedback');
        }
        return response.json();
    },

    // Toggle like
    toggleLike: async (id, token) => {
        const response = await fetch(`${API_URL}/${id}/like`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to like feedback');
        }
        return response.json();
    },
};
