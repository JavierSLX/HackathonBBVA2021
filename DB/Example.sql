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

CREATE TABLE promociones
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(30) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    imagen VARCHAR(100) NOT NULL
);

INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Tarjeta de Crédito', 'Solicita tu tarjeta de crédito con tasa preferencial', 'tarjeta_credito');
INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Préstamo Personal', '¿Necesitas un préstamo? Presiona aquí y solicítalo', 'prestamo');
INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Seguro de Auto', 'Con BBVA tu auto tiene el mejor seguro. ¡Garantizado!', 'seguro_auto');
INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Seguro de Vida', 'Nosotros también nos preocupamos por tus seres queridos, ve tu propuesta de seguro para ellos', 'seguro_vida');
INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Reestructuración de Deuda', 'Nos preocupamos por la situación que te dejó la pandemia, acércate para ver nuestro apoyo', 'pandemia');
INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Garantía Extendida', 'Extendemos la garantía con los productos que adquieras con nosotros', 'garantia_extendida');
INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Comercio Electrónico', 'Gustas algún producto con nuestros asociados, observa las ofertas que tienen', 'comercio');
INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Seguro de Mascotas', 'Tu mascota tiene la mejor protección con los mejores servicios', 'seguro_mascota');
INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Pago de Puntos', 'A partir de ahora hasta el fin del mes, tus puntos valen el doble en cualquier restaurante', 'restaurant');
INSERT INTO promociones(titulo, descripcion, imagen) VALUES ('Crédito Hipotecario', 'El mejor crédito hipotecario al alcance de tu mano', 'credito_hipotecario');

CREATE TABLE user_promo
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED REFERENCES users(id),
    promocion_id INT UNSIGNED REFERENCES promociones(id),
    activo BOOLEAN DEFAULT true
);

INSERT INTO user_promo(user_id, promocion_id) VALUES (1, 1);
INSERT INTO user_promo(user_id, promocion_id) VALUES (1, 2);
INSERT INTO user_promo(user_id, promocion_id) VALUES (1, 3);
INSERT INTO user_promo(user_id, promocion_id) VALUES (1, 5);
INSERT INTO user_promo(user_id, promocion_id) VALUES (1, 6);
INSERT INTO user_promo(user_id, promocion_id) VALUES (1, 8);
INSERT INTO user_promo(user_id, promocion_id) VALUES (1, 9);
INSERT INTO user_promo(user_id, promocion_id) VALUES (1, 10);
INSERT INTO user_promo(user_id, promocion_id) VALUES (2, 1);
INSERT INTO user_promo(user_id, promocion_id) VALUES (2, 2);
INSERT INTO user_promo(user_id, promocion_id) VALUES (2, 5);
INSERT INTO user_promo(user_id, promocion_id) VALUES (2, 7);
INSERT INTO user_promo(user_id, promocion_id) VALUES (2, 9);