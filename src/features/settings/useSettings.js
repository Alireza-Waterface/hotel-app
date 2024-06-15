import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";


const useSettings = () => {
	const {isLoading, error, data: settings} = useQuery({
		queryKey: ['settings'],
		queryFn: getSettings,
	});

	return {settings, isLoading, error};
};

export default useSettings;