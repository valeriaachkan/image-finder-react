import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeydown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeydown);
	}

	handleKeydown = (e) => {
		if (e.code === 'Escape') {
			this.props.onClose();
			console.log('close');
		}
	};

	handleClickOnBackdrop = (e) => {
		if (e.currentTarget === e.target) {
			this.props.onClose();
		}
	};

	render() {
		const { largeImageURL, tags } = this.props.img;

		return createPortal(
			<div className={s.overlay} onClick={this.handleClickOnBackdrop}>
				<div className={s.modal}>
					<img src={largeImageURL} alt={tags} />
				</div>
			</div>,
			modalRoot
		);
	}
}

Modal.propTypes = {
	img: propTypes.object,
	onClose: propTypes.func,
};
