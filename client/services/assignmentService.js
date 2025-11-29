const API_URL = '/api/assignments';

export const assignmentService = {
    // Get all assignments
    getAllAssignments: async (token) => {
        const response = await fetch(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch assignments');
        return response.json();
    },

    // Get single assignment
    getAssignmentById: async (id, token) => {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch assignment');
        return response.json();
    },

    // Create assignment (Admin)
    createAssignment: async (data, token) => {
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
            throw new Error(error.error || 'Failed to create assignment');
        }
        return response.json();
    },

    // Upload submission (Student)
    uploadSubmission: async (id, formData, token) => {
        // Note: Content-Type header is not set manually for FormData, browser sets it with boundary
        const response = await fetch(`${API_URL}/${id}/submit`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to upload submission');
        }
        return response.json();
    },

    // Get submissions for assignment (Admin)
    getSubmissions: async (id, token) => {
        const response = await fetch(`${API_URL}/${id}/submissions`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch submissions');
        return response.json();
    },

    // Get my submissions (Student)
    getMySubmissions: async (token) => {
        const response = await fetch(`${API_URL}/my-submissions`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch your submissions');
        return response.json();
    },

    // Grade submission (Admin)
    gradeSubmission: async (submissionId, data, token) => {
        const response = await fetch(`${API_URL}/submissions/${submissionId}/grade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to grade submission');
        }
        return response.json();
    },

    // Get submissions for peer review (Student)
    getPeerReviews: async (assignmentId, token) => {
        const response = await fetch(`${API_URL}/${assignmentId}/peer-review`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch peer reviews');
        return response.json();
    },

    // Submit peer review (Student)
    submitPeerReview: async (submissionId, data, token) => {
        const response = await fetch(`${API_URL}/submissions/${submissionId}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to submit review');
        }
        return response.json();
    },
};
