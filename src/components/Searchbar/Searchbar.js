import React, { Component } from 'react';
import propTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
	state = {
		query: '',
	};

	handleInputChange = (e) => {
		this.setState({ query: e.currentTarget.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.onSubmit(this.state.query);
		this.setState({ query: '' });
	};

	render() {
		const { query } = this.state;
		const { handleSubmit, handleInputChange } = this;

		return (
			<header className={s.searchbar}>
				<form className={s.form}>
					<button type="submit" className={s.button} onClick={handleSubmit}>
						<span className={s.label}>Search</span>
					</button>

					<input
						className={s.input}
						type="text"
						onChange={handleInputChange}
						value={query}
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
					/>
				</form>
			</header>
		);
	}
}

Searchbar.propTypes = {
	onSubmit: propTypes.func,
};

export default Searchbar;
