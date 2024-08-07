import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from '../../services/apiBookings';
import toast from "react-hot-toast";

const useCheckOut = () => {
	const queryClient = useQueryClient();

	const { mutate: checkOut, isPending: isCheckingOut, error } = useMutation({
		mutationFn: (bookingId) => updateBooking(bookingId, {	status: 'checked-out' }),

		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked-out`);
			queryClient.invalidateQueries({ active: true });
		},

		onError: () => toast.error('Failed to check-out the guest'),
	});

	return { checkOut, isCheckingOut, error };
};

export default useCheckOut;