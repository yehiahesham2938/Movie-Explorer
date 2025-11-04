const mongoose = require('mongoose');

const DEFAULT_URI = 'mongodb+srv://yehiahesham:XufK5QFWV1PikUsm@next-scene.i8icl8s.mongodb.net/Next-Scene?appName=Next-Scene&retryWrites=true&w=majority';

function getMongoUri() {
	return process.env.MONGO_URI || DEFAULT_URI;
}

async function connectToDatabase() {
	const mongoUri = getMongoUri();
	if (!mongoUri) {
		throw new Error('MONGO_URI is not set. Please define it in the environment.');
	}

	mongoose.set('strictQuery', true);

	try {
		await mongoose.connect(mongoUri, {
			serverSelectionTimeoutMS: 30000,
			socketTimeoutMS: 45000,
			retryWrites: true,
			w: 'majority',
		});

		console.log('Connected to MongoDB');
		console.log('Database:', mongoose.connection.db.databaseName);
	} catch (error) {
		console.error('MongoDB connection error:', error.message);
		console.error('Error code:', error.code);
		console.error('Error name:', error.name);
		throw error;
	}
}
 
 module.exports = { connectToDatabase };

