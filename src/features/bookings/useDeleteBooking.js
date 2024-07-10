import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings'
import toast from "react-hot-toast";

const useDeleteBooking = () => {
	const queryClient = useQueryClient();

	const { mutate: deleteBooking, error, isPending: isDeleting } = useMutation({
		mutationFn: deleteBookingApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ active: true });
			toast.success(`Booking deleted successfully`);
		},
		onError: (err) => {
			console.error(err);
			toast.error(err.message);
		},
	});

	return {deleteBooking, error, isDeleting};
};

export default useDeleteBooking;