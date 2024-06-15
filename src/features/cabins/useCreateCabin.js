import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";


const useCreateCabin = () => {
	const queryClient = useQueryClient();

   const { mutate: createCabin, error: creationError, isPending: isCreating } = useMutation({
      mutationFn: createEditCabin,

      onSuccess: () => {
         toast.success('Cabin created!');

         queryClient.invalidateQueries({
            queryKey: ['cabins'],
         });
      },

      onError: (err) => {
         console.error(creationError);
         toast.error(err.message);
      }
   });

	return {createCabin, isCreating};
};

export default useCreateCabin;