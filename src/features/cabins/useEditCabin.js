import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useEditCabin = () => {
	const queryClient = useQueryClient();

   const { mutate: editCabin, error: editionError, isPending: isEditing } = useMutation({
      mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id), 

      onSuccess: () => {
         toast.success('Cabin Edited!');

         queryClient.invalidateQueries({
            queryKey: ['cabins'],
         });
      },

      onError: (err) => {
         console.error(editionError);
         toast.error(err.message);
      }
   });

	return {editCabin, editionError, isEditing};
};

export default useEditCabin;