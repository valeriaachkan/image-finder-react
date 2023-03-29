import React from 'react';
import propTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ loadMore }) {
	return (
		<button type="button" className={s.button} onClick={loadMore}>
			Load more
		</button>
	);
}

Button.propTypes = {
	loadMore: propTypes.func,
};
