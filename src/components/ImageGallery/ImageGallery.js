import React from 'react';
import propTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images, onItemClick }) {
	return (
		<ul className={s.gallery}>
			{images.map(({ id, tags, webformatURL, largeImageURL }) => (
				<ImageGalleryItem
					key={id}
					id={id}
					tags={tags}
					img={webformatURL}
					onClick={onItemClick}
				/>
			))}
		</ul>
	);
}

ImageGallery.propTypes = {
	images: propTypes.arrayOf(propTypes.object),
	onItemClick: propTypes.func,
};
