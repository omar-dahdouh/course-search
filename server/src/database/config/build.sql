BEGIN;

DROP TABLE IF EXISTS course;

CREATE TABLE course
(
	id SERIAL PRIMARY KEY,
	categories INTEGER[],
	title VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL ,
	url VARCHAR(255) NOT NULL,
	rate INTEGER,
	reviews REAL,
	description TEXT,
	source INTEGER,
);

COMMIT;
