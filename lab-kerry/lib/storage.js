'use strict';

const logger = require('./logger');
const fsExtra = require('fs-extra');

fsExtra.pathExists(process.env.STORAGE_PATH)
	.then(result => {
		if (!result) {
			logger.log('verbose', 'STORAGE - creating an empty file');
			fsExtra.writeJSON(process.env.STORAGE_PATH, []);
		}
	});

const storage = module.exports = {};

storage.fetchAll = () => {
	logger.log('verbose', 'STORAGE - fetching all files');
	return fsExtra.readJSON(process.env.STORAGE_PATH);
};

storage.addItem = (mountain) => {
	logger.log('verbose', 'STORAGE - adding the following mountain');
	logger.log('verbose', mountain);

	if (!mountain.id)
		return Promise.reject(new Error('__STORAGE_ERROR__', 'item must have an id'));

	return storage.fetchAll()
		.then(database => {
			return fsExtra.writeJSON(process.env.STORAGE_PATH,
				[...database, mountain]);
		});
};

storage.fetchItem = (id) => {
	logger.log('verbose', `STORAGE - fetching an item with a specific id ${id}`);
	return storage.fetchAll()
		.then(database => {
			return database.find(mountain => mountain.id === id);
		})
		.then(mountain => {
			if (mountain === undefined)
				throw new Error('__STORAGE_ERROR__', 'item not found');

			return mountain;
		});
};

storage.deleteItem = (id) => {
	logger.log('verbose', `STORAGE - deleting an item with a specific id ${id}`);

	return storage.fetchAll()
		.then(database => {
			return database.filter(mountain => mountain.id !== id);
		})
		.then(filteredItems => {
			return fsExtra.writeJSON(process.env.STORAGE_PATH, filteredItems);
		});
};