import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ img, onClose }) {
	useEffect(() => {
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, []);

	function handleKeydown(e) {
		if (e.code === 'Escape') {
			onClose();
		}
	}

	const handleClickOnBackdrop = (e) => {
		if (e.currentTarget === e.target) {
			onClose();
		}
	};

	const { largeImageURL, tags } = img;

	return createPortal(
		<div className={s.overlay} onClick={handleClickOnBackdrop}>
			<div className={s.modal}>
				<img src={largeImageURL} alt={tags} />
			</div>
		</div>,
		modalRoot
	);
}

Modal.propTypes = {
	img: propTypes.object,
	onClose: propTypes.func,
};
