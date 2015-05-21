CREATE TABLE IF NOT EXISTS options
(
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	key TEXT UNIQUE, 
	value TEXT
);
CREATE TABLE IF NOT EXISTS users 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	name TEXT, 
	username TEXT UNIQUE, 
	password TEXT, 
	auth_token TEXT UNIQUE
);