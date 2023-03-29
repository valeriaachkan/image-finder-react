// import React from 'react';
import axios from 'axios';

export default async function getImages(query, page = 1) {
	const searchParams = new URLSearchParams({
		key: '31523966-920ed1e34472d12ea8090a22f',
		q: query,
		page: page,
		image_type: 'photo',
		orientation: 'horizontal',
		per_page: 12,
	});
	const url = `https://pixabay.com/api/?${searchParams}`;

	const response = await axios.get(url);
	const images = response.data.hits;
	return images;
}

// class ImagesApi {}
