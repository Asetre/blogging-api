exports.DATABASE_URL = process.env.DATABASE_URL ||
		       global.DATABASE_URL ||
		       'mongodb://localhost/postsDb';


exports.TEST_DATABASE_URL = (
		process.env.TEST_DATABASE_URL ||
		'mongodb://localhost/test-postsDb');

exports.PORT = process.env.PORT || 8000;
