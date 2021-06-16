DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(150),
	password VARCHAR(100)
);

CREATE TABLE profile (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id),
	name VARCHAR(100),
	sex VARCHAR(10),
	age INT,
	fav_language VARCHAR(100),
	loves_mac BOOL,
	preference 	VARCHAR(10),
	years_coding INT,
	state VARCHAR(2)
);

CREATE TABLE matches (
	id SERIAL PRIMARY KEY,
	profile_1 INT REFERENCES profile(id),
	profile_2 INT REFERENCES profile(id)
);