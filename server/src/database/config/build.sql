BEGIN;

DROP TABLE IF EXISTS course;

CREATE TABLE course
(
	id SERIAL PRIMARY KEY,
	source INTEGER NOT NULL,
	url VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	image VARCHAR(255),
	rating REAL,
	reviews INTEGER,
	description TEXT,
	categories INTEGER[],
	date DATE
);

COMMIT;
