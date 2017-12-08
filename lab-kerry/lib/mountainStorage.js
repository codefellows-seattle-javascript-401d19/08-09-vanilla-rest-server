'use strict';

const logger = require('./logger');
const fsExtra = require('fs-extra');

fsExtra.pathExists(process.env.STORAGE_PATH)
	.then(result => {
		if(!result) {
			logger.log('verbose', 'STORAGE - creating an empty file');
			fsExtra.writeJSON(process.env.STORAGE_PATH, []);
	}	
});

const mountainStorage = module.exports = {};

mountainStorage.fetchAll = () => {
	logger.log('verbose', 'STORAGE - fetching all moutains');
	logger.log('verbose', mountain)

	if(mountain.id)
		return Promise.reject(new Error('__STORAGE_ERROR__', 'a new item must have an id'));

		return mountainStorage.fetchAll()
			.then(database => {
				return fsExtra.writeJSON(process.env.STORAGE_PATH,
					[...database, mountain]);
			});
};

mountainStorage.fetchItem = (id) => {
	logger.log('verbose', 
	`STORAGE - fetching an item with this specific id ${id}`);
	return mountainStorage.fetchAll()
		.then(database => {
			return database.find(mountain => mountain.id === id);
		})
		.then(mountain => {
			if (mountain === undefined)
				throw new Error('__STORAGE_ERROR_', 'item not found');

				return mountain;
		});
};

mountainStorage.deleteItem = (id) => {
	logger.log('verbose', `STORAGE - deleting an item with this specific id ${id}`);

	return mountainStorage.fetchAll()
		.then(database => {
			return database.filter(mountain => mountain.id !== id);
		})
		.then(filteredMountains => {
			return fsExtra.writeJSON(process.env.STORAGE_PATH);
		});
};

