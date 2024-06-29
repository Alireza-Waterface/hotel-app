import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
   const [searchParams] = useSearchParams();

   const filterValue = searchParams.get('status');
   const filter = !filterValue || filterValue === 'all' ? null : {field: 'status', value: filterValue};

   const rawSortValue = searchParams.get('sortBy') || 'startDate-desc';
   const [field, direction] = rawSortValue.split('-');
   const sortBy = {field, direction};
   

	const { isLoading, data: bookings, error } = useQuery({
      queryKey: ['bookings', filter, sortBy],
      queryFn: () => getBookings({filter, sortBy}),
   });

	return {bookings, isLoading, error};
};

export default useBookings;