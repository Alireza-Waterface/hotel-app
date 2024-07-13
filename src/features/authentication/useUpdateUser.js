import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateCurrentUser, isPending: isUpdating } = useMutation({
		mutationFn: updateCurrentUserApi,

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
			toast.success('User updated successfully');
		},

		onError: (err) => toast.error(err.message),
	});

	return { updateCurrentUser, isUpdating };
}

export default useUpdateUser;