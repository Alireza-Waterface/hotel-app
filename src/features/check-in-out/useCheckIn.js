import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from '../../services/apiBookings';
import toast from "react-hot-toast";

const useCheckIn = () => {
	const queryClient = useQueryClient();

	const { mutate: checkIn, isPending: isCheckingIn, error } = useMutation({
		mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {
				status: 'checked-in',
				isPaid: true,
				...breakfast,
			}),

		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);
			queryClient.invalidateQueries({ active: true });
		},

		onError: () => toast.error('Failed to check-in the guest'),
	});

	return { checkIn, isCheckingIn, error };
};

export default useCheckIn;