import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";


function useSignup() {


	const { mutate: signup, isPending: isSigningUp } = useMutation({
		mutationFn: signupApi,

		onSuccess: (user) => {
			toast.success('User created successfully! Please verify your email ASAP');
		},

		onError: (error) => {
			toast.error(error.message);
		}
	});

	return { signup, isSigningUp };
}

export default useSignup;