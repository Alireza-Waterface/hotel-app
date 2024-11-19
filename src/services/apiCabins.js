import supabase from './supabase';

import {supabaseUrl} from './supabase'

export async function getCabins() {	
	const { data, error } = await supabase
		.from('cabins')
		.select('*')

	if (error) {
		console.error(error);
		throw new Error('Failed to fetch cabins data');
	}

	return data;
}

export async function createEditCabin(newCabin, id) {	
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
	const imageName = `${Math.random()}-${newCabin.image?.name}`.replace('/', '');
	const imagePath = hasImagePath ?
		newCabin.image :
		`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	let query = supabase.from('cabins');

	if (!id) {
		query = query.insert([{...newCabin, image: imagePath}]);
	} else {
		query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Failed to create the cabin!');
	}

	if (hasImagePath) return data;

	const {error: storageError} = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);
	
	if (storageError) {
		await supabase
			.from('cabins')
			.delete()
			.eq('id', data.id);
		
		console.error(storageError);

		throw new Error('Failed to upload cabin image!');
	}

	return data;
}

export async function deleteCabin(id) {	
	const { data, error } = await supabase
	.from('cabins')
	.delete()
	.eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Failed to delete the cabin');
	}

	return data;
}