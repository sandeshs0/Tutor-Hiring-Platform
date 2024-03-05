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

    export const sortTutorsByExperience = async (): Promise<any[]> => {
        try {
            const response = await myAxios.get('/user/sortByYearsOfExp');
            let tutors = response.data;
    
            // Sort tutors by experience in descending order
            tutors.sort((a: any, b: any) => b.yearsOfExp - a.yearsOfExp);
    
            return tutors;
        } catch (error) {
            console.error('Error sorting tutors by experience:', error);
            throw error;
        }
    };

export const filterTutorsBySubject = (subject: string) => {
    return myAxios.get(`/user/filterBySubject?subject=${subject}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error filtering tutors by subject:', error);
            throw error;
        });
};
export const sortTutorsByFee = async (): Promise<any[]> => {
    try {
        const response = await myAxios.get('/user/sortByMonthlyFee');
        let tutors = response.data;

        // Sort tutors by fee in ascending order
        tutors.sort((a: any, b: any) => a.monthlyFee - b.monthlyFee);

        return tutors;
    } catch (error) {
        console.error('Error sorting tutors by fee:', error);
        throw error;
    }
};
export const getTutorById = (id: number) => {
    return myAxios.get(`/user/getById/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error getting user by ID:', error);
            throw error;
        });
};

