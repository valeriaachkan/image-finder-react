import React, { Component } from 'react';
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
		return (
			<header class={s.searchbar}>
				<form class={s.form}>
					<button type="submit" class={s.button} onClick={this.handleSubmit}>
						<span class={s.label}>Search</span>
					</button>

					<input
						class={s.input}
						type="text"
						onChange={this.handleInputChange}
						value={this.state.query}
						autocomplete="off"
						autofocus
						placeholder="Search images and photos"
					/>
				</form>
			</header>
		);
	}
}

export default Searchbar;
