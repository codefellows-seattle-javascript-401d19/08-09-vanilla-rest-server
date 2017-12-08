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

//every method returns promises

storage.fetchAll = () => {
	logger.log('verbose', 'STORAGE - fetching all files');
	return fsExtra.readJSON(process.env.STORAGE_PATH);
};

storage.addItem = (mountain) => {
	logger.log('verbose', 'STORAGE - adding the following mountain');
	logger.log('verbose', mountain);

	if (!mountain.id)
		return Promise.reject(new Error('__STORAGE_ERROR__', 'item must have an id'));
	// here we could add more tests for validity

	return storage.fetchAll()
		.then(database => {
			return fsExtra.writeJSON(process.env.STORAGE_PATH,
				[...database, mountain]);
			//simplified ES6 syntax that creates array like [database[0], database[1], database[0], mountain]
			//placing the mountain object after '...database' appends where [mountain,...database] would prepend
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


//fetchAll
// SELECT 

//add item
// INSERT

//fetch item
// SELECT

//delete item
// DELETE