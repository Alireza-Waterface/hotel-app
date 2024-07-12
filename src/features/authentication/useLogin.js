import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: login, isPending: isLoggingIn } = useMutation({
		mutationFn: ({email, password}) => loginApi({email, password}),

		onSuccess: (user) => {
			queryClient.setQueryData(['user'], user.user);
			navigate('/dashboard', {replace: true});
			toast.success('Login successfull');
		},

		onError: (error) => {
			toast.error(error.message);
		}
	})

	return { login, isLoggingIn };
}

export default useLogin;