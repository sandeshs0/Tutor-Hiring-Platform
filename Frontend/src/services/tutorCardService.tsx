import { myAxios } from "./helper";

export const getAllTutors = () => {
    // updateTokenInHeaders();

    return myAxios.get('/user/sortByMonthlyFee')
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching futsals:', error);
        throw error;
    });
    };

    export const sortTutorsByExperience = () => {
    return myAxios.get('/user/sortByYearsOfExp')
        .then(response => response.data)
        .catch(error => {
            console.error('Error sorting tutors by experience:', error);
            throw error;
        });
};

export const filterTutorsBySubject = (subject: string) => {
    return myAxios.get(`/user/filterBySubject?subject=${subject}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error filtering tutors by subject:', error);
            throw error;
        });
};

export const getTutorById = (id: number) => {
    return myAxios.get(`/user/getById/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error getting user by ID:', error);
            throw error;
        });
};

