import React from 'react';
import propTypes from 'prop-types';
import s from './ImageGallery.module.css';

export default function ImageGalleryItem({ id, tags, img, onClick }) {
	return (
		<li className={s.item} onClick={() => onClick(id)}>
			<img src={img} alt={tags} className={s.image} />
		</li>
	);
}

ImageGalleryItem.propTypes = {
	id: propTypes.number,
	tags: propTypes.string,
	img: propTypes.string,
	onClick: propTypes.func,
};
