import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useDeleteCabin = () => {
	const queryClient = useQueryClient();

	const { mutate: deleteCabin, error, isPending: isDeleting } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
			toast.success('Cabin deleted!');
		},
		onError: (err) => {
			console.error(err);
			toast.error(err.message);
		},
	});

	return {deleteCabin, error, isDeleting};
};

export default useDeleteCabin;