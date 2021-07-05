DROP DATABASE IF EXISTS appsec;
CREATE DATABASE IF NOT EXISTS appsec;
USE appsec;

CREATE TABLE credential
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pass VARCHAR(60) NOT NULL,
    activo BOOL DEFAULT TRUE
);

INSERT INTO credential (pass) VALUES ('12345');
INSERT INTO credential (pass) VALUES ('abcde');

CREATE TABLE users
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    credential_id INT UNSIGNED REFERENCES credential(id)
);

INSERT INTO users(nombre, apellido, credential_id) VALUES ('Javier', 'Serrano', 1);
INSERT INTO users(nombre, apellido, credential_id) VALUES ('Samuel', 'García', 2);

CREATE TABLE category
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    activo BOOL DEFAULT TRUE
);

CREATE TABLE movements
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME DEFAULT now(),
    user_id INT UNSIGNED REFERENCES users(id),
    category_id INT UNSIGNED REFERENCES category(id)
);