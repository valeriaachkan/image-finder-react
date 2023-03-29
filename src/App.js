import React, { Component } from 'react';
import './App.css';
import getImages from './services/image-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import Button from './components/Button';
import Modal from './components/Modal';

class App extends Component {
	state = {
		query: '',
		images: null,
		status: 'idle',
		error: null,
		page: 1,
		showModal: false,
		imageOnModal: null,
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.query !== this.state.query) {
			this.setState({ status: 'pending' });

			getImages(this.state.query)
				.then((images) => this.setState({ images, status: 'resolved' }))
				.catch((error) => this.setState({ error, status: 'rejected' }));
		}

		if (prevState.page < this.state.page) {
			this.setState({ status: 'pending' });

			getImages(this.state.query, this.state.page)
				.then((newImages) =>
					this.setState(({ images }) => ({
						images: [...images, ...newImages],
						status: 'resolved',
					}))
				)
				.catch((error) => this.setState({ error, status: 'rejected' }));
		}
	}

	handleQuerySubmit = (query) => {
		this.setState({ query, page: 1 });
	};

	handleLoadMoreButton = () => {
		this.setState(({ page }) => {
			return { page: page + 1 };
		});
	};

	toogleModal = () => {
		this.setState(({ showModal }) => ({ showModal: !showModal }));
	};

	handleOpenModal = (id) => {
		const imageOnModal = this.state.images.find((image) => image.id === id);
		this.setState({ showModal: true, imageOnModal });
	};

	render() {
		const { images, status, showModal, imageOnModal } = this.state;
		const {
			handleQuerySubmit,
			handleLoadMoreButton,
			handleOpenModal,
			toogleModal,
		} = this;

		return (
			<div className="App">
				<Searchbar onSubmit={handleQuerySubmit} />

				{images !== null && (
					<>
						<ImageGallery images={images} onItemClick={handleOpenModal} />
						<Button loadMore={handleLoadMoreButton} />
					</>
				)}

				{status === 'pending' && (
					<ThreeDots
						color="#3f51b5"
						secondaryColor="white"
						wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
					/>
				)}

				{showModal && <Modal img={imageOnModal} onClose={toogleModal} />}
			</div>
		);
	}
}

export default App;
