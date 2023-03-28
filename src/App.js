// import './App.css';
import React, { Component } from 'react';
import Searchbar from './components/Searchbar';

class App extends Component {
	state = {
		query: '',
	};

	handleQuerySubmit = (query) => {
		this.setState({ query });
	};

	render() {
		return <Searchbar onSubmit={this.handleQuerySubmit} />;
	}
}

export default App;
