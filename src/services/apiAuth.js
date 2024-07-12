import supabase from './supabase';

export async function signup({fullName, email, password}) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			}
		}
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function login({email, password}) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export async function getCurrentUser() {
	const {data: sessionData} = await supabase.auth.getSession();
	if (!sessionData.session) return null;

	const { data: userData, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return userData?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}