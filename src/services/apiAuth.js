import supabase from './supabase';
import { supabaseUrl } from './supabase';

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

export async function updateCurrentUser({password, fullName, avatar}) {
	let updateData;

	if (password) updateData = {password};
	else if (fullName) updateData = {data: {fullName}};

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) throw new Error(error.message);

	if (!avatar) return data;
	
	const fileName = `avatar-${data.user.id}-${Math.random()}`;
	const { error: StorageError } = await supabase.storage.from('avatars').upload(fileName, avatar);

	if (StorageError) throw new Error(StorageError.message);

	const { data: updatedUserData, error: updateUserError } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
		},
	});

	if (updateUserError) throw new Error(updateUserError.message);
	return updatedUserData;
}