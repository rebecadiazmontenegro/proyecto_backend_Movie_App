-- Hace que no puedan entrar títulos repetidos
ALTER TABLE entries
ADD CONSTRAINT unique_title UNIQUE (title);

-- Crear tabla users
CREATE TABLE users (
  id_user serial NOT NULL PRIMARY KEY, 
  userName varchar(45) NOT NULL UNIQUE, 
  email varchar(100) NOT NULL UNIQUE,
  role varchar(15) NOT NULL,
  password varchar NOT NULL
);

-- Crear tabla favorites
CREATE TABLE favorites (
  id_favorite serial NOT NULL PRIMARY KEY,
  id_user integer NOT NULL REFERENCES users(id_user),
  id_movie integer NOT NULL
);
