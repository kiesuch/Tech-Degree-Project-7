import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = props => {
	
	const results = props.data;
	let searchResults = results.map(photo => 
	<Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} key={photo.id} />);
	
	return (
		<ul>
			{searchResults}
			{(searchResults.length === 0) ? <NotFound /> : console.log(`${searchResults.length} results were found!`)}
		</ul>
	)
}

export default PhotoList;