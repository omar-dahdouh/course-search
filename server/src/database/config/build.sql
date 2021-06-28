BEGIN;

DROP TABLE IF EXISTS users, course, comment, favorite CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE course
(
	id SERIAL PRIMARY KEY,
	url VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	image VARCHAR(255),
	rating REAL DEFAULT 0,
	reviews INTEGER DEFAULT 0,
	description TEXT,
	category INTEGER[],
	date DATE
);

CREATE TABLE comment
(
	id SERIAL PRIMARY KEY ,
	content VARCHAR(255) NOT NULL,
	user_id INTEGER NOT NULL REFERENCES users(id),
	created_at TIMESTAMPTZ DEFAULT NOW(),
	course_id INTEGER NOT NULL REFERENCES course(id)
);

CREATE TABLE favorite
(
	user_id INTEGER NOT NULL REFERENCES users(id),
	course_id INTEGER NOT NULL REFERENCES course(id),
	PRIMARY KEY (user_id, course_id)
);

COMMIT;
