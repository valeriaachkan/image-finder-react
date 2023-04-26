import React, { useState, useEffect } from 'react';
import './App.css';
import getImages from './services/image-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import Button from './components/Button';
import Modal from './components/Modal';

function App() {
	const [query, setQuery] = useState('');
	const [images, setImages] = useState(null);
	const [status, setStatus] = useState('idle');
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [imageOnModal, setImageOnModal] = useState(null);

	useEffect(() => {
		if (query === '') {
			return;
		}

		setStatus('pending');
		getImages(query)
			.then((images) => {
				setImages(images);
				setStatus('resolved');
			})
			.catch((error) => {
				setError(error);
				setStatus('rejected');
			});
	}, [query]);

	useEffect(() => {
		if (page === 1) {
			return;
		}

		setStatus('pending');

		getImages(query, page)
			.then((newImages) => {
				setImages((images) => [...images, ...newImages]);
				setStatus('resolved');
			})
			.catch((error) => {
				setError(error);
				setStatus('rejected');
			});
	}, [query, page]);

	const handleQuerySubmit = (query) => {
		setQuery(query);
		setPage(1);
	};

	const handleLoadMoreButton = () => {
		setPage((s) => s + 1);
	};

	const toogleModal = () => {
		setShowModal((s) => !s);
	};

	const handleOpenModal = (id) => {
		const imageOnModal = images.find((image) => image.id === id);
		setShowModal(true);
		setImageOnModal(imageOnModal);
	};

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

export default App;
