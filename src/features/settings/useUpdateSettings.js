import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";

const useUpdateSettings = () => {
	const queryClient = useQueryClient();

	const { mutate: updateSettings, isPending: isUpdating } = useMutation({
		mutationFn: updateSettingsApi,

		onSuccess: () => {
			toast.success('Settings successfully updated');

			queryClient.invalidateQueries({
				queryKey: ['settings'],
			});
		},

		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { updateSettings, isUpdating };
};

export default useUpdateSettings;