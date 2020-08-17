// Import Main Components

import React, { Component } from 'react';
import axios from 'axios';
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect
} from "react-router-dom";

// Import App Components
import Nav from './components/Nav';
import Search from './components/SearchForm';
import PhotoList from './components/PhotoList';
import NotFound from './components/NotFound';

// Import api key

import apiKey from './components/config';

// Set api key to varaible
const key = apiKey;

class App extends Component {
	
	constructor() {
		super();
		this.state = {
			cats: [],
			dogs: [],
			computers: [],
			searchResults: []
		};
	}
	
	componentDidMount() {
		this.searchCats();
		this.searchDogs();
		this.searchComputers();
	}
	
	// Get photo data for the search input.
	
	search = (query) => {
		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
		.then(response => {
			this.setState({
				searchResults: response.data.photos.photo
			});	
		})
		.catch(error => {
		console.log('Error fetching and parsing data', error);
		});
	}
	
	// Get photo data for the default cats nav button.
	
	searchCats = () => {
		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
		.then(response => {
			this.setState({
				cats: response.data.photos.photo
			});	
		})
		.catch(error => {
		console.log('Error fetching and parsing data', error);
		});
	}
	
	// Get photo data for the default dogs nav button.
	
	searchDogs = () => {
		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
		.then(response => {
			this.setState({
				dogs: response.data.photos.photo
			});	
		})
		.catch(error => {
		console.log('Error fetching and parsing data', error);
		});
	}
	
	// Get photo data for the default computers nav button.
	
	searchComputers = () => {
		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
		.then(response => {
			this.setState({
				computers: response.data.photos.photo
			});	
		})
		.catch(error => {
		console.log('Error fetching and parsing data', error);
		})
	}
	
	render(){
		return (
			<BrowserRouter>
				<div className = "container">
					<Search onSearch = {this.search} />
					<Nav />
					{/*Routing for photo containers*/}
					<div className = "photo-container">
						<Switch>
							<Route exact path='/' > <Redirect to='/cats'></Redirect> </Route>
							<Route path = '/cats' render = { () => <PhotoList data = {this.state.cats} />} />
							<Route path = '/dogs' render = { () => <PhotoList data = {this.state.dogs} />} />
							<Route path = '/computers' render = { () => <PhotoList data = {this.state.computers} />} />
							<Route path = '/search/:topic' render = { () => <PhotoList data = {this.state.searchResults} />} />
							<Route exact component = {NotFound} />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
