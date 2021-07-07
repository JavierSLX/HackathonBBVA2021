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

CREATE TABLE accounts
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(10) NOT NULL,
    tarjeta VARCHAR(12) NOT NULL,
    clabe VARCHAR(18) NOT NULL,
    saldo DOUBLE NOT NULL,
    user_id INT UNSIGNED REFERENCES users(id)
);

INSERT INTO accounts(numero, tarjeta, clabe, saldo, user_id) VALUES ('1579234467', '415231678965', '012264829712578815', 543.67, 1);
INSERT INTO accounts(numero, tarjeta, clabe, saldo, user_id) VALUES ('3451234551', '415283667125', '017263726732352455', 1450.34, 1);
INSERT INTO accounts(numero, tarjeta, clabe, saldo, user_id) VALUES ('3768819231', '415276276316', '012376723725324222', 23098.29, 2);
INSERT INTO accounts(numero, tarjeta, clabe, saldo, user_id) VALUES ('3878127661', '415725653451', '018719092989283799', 124561.12, 2);
INSERT INTO accounts(numero, tarjeta, clabe, saldo, user_id) VALUES ('1872863762', '415276376251', '018723087821379919', 23452.10, 2);