import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { myAxios } from './helper';


export interface BookingFormData {
    userId: number;
    studentName: string;
    time: string;
    grade: string;
    requirements: string;
    location: string;
    tutorEmail: string;
    offeredFee: number;
}

export const submitBookingForm = async (formData: BookingFormData): Promise<void> => {
    try {
        const response = await myAxios.post('/bookings/request', formData);
        console.log('Booking request submitted successfully:', response.data);
        toast.success("Booking Requested Successfully.")
        
        
        // You can handle success scenario here (e.g., show a success message)
    } catch (error) {
        console.error('Error submitting booking request:', error);
        toast.error("Couldn't place booking")
        // You can handle error scenario here (e.g., show an error message)
    }
};
