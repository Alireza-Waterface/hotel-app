import { useQuery } from "@tanstack/react-query";
import {getCabins} from '../../services/apiCabins';

const useCabins = () => {
	const { isLoading, data: cabins, error } = useQuery({
      queryKey: ['cabins'],
      queryFn: getCabins,
   });

	return {cabins, isLoading, error};
};

export default useCabins;