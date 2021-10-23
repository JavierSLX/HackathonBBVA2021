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
INSERT INTO credential (pass) VALUES ('oscarm');
INSERT INTO credential (pass) VALUES ('adiim');
INSERT INTO credential (pass) VALUES ('virio');
INSERT INTO credential (pass) VALUES ('rafam');

CREATE TABLE users
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    credential_id INT UNSIGNED REFERENCES credential(id)
);

INSERT INTO users(nombre, apellido, credential_id) VALUES ('Javier', 'Serrano', 1);
INSERT INTO users(nombre, apellido, credential_id) VALUES ('Oscar', 'Martínez', 2);
INSERT INTO users(nombre, apellido, credential_id) VALUES ('Adriana', 'Molina', 3);
INSERT INTO users(nombre, apellido, credential_id) VALUES ('Viridiana', 'Ortiz', 4);
INSERT INTO users(nombre, apellido, credential_id) VALUES ('Rafael', 'Mendoza', 5);

CREATE TABLE accounts
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(10) NOT NULL,
    tarjeta VARCHAR(12) NOT NULL,
    clabe VARCHAR(18) NOT NULL,
    user_id INT UNSIGNED REFERENCES users(id)
);

INSERT INTO accounts(numero, tarjeta, clabe, user_id) VALUES ('1579234467', '415231678965', '012264829712578815', 1);
INSERT INTO accounts(numero, tarjeta, clabe, user_id) VALUES ('3451234551', '415283667125', '017263726732352455', 1);
INSERT INTO accounts(numero, tarjeta, clabe, user_id) VALUES ('3768819231', '415276276316', '012376723725324222', 2);
INSERT INTO accounts(numero, tarjeta, clabe, user_id) VALUES ('3878127661', '415725653451', '018719092989283799', 2);
INSERT INTO accounts(numero, tarjeta, clabe, user_id) VALUES ('1872863762', '415276376251', '018723087821379919', 2);

INSERT INTO accounts(numero, tarjeta, clabe, user_id) VALUES ('3748215231', '415482486316', '012376723725324222', 3);
INSERT INTO accounts(numero, tarjeta, clabe, user_id) VALUES ('3815245161', '415575454451', '018719092989283799', 4);
INSERT INTO accounts(numero, tarjeta, clabe, user_id) VALUES ('1478454762', '415554244551', '018723087821379919', 5);

CREATE TABLE categoria
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL,
    activado BOOLEAN DEFAULT TRUE
);

INSERT INTO categoria(nombre) VALUES ('Transferencia');
INSERT INTO categoria(nombre) VALUES ('Salida');

CREATE TABLE saldo_corte
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    cantidad DOUBLE NOT NULL,
    fecha DATETIME DEFAULT now(),
    activado BOOLEAN DEFAULT TRUE,
    account_id INT UNSIGNED REFERENCES account(id)
);

INSERT INTO saldo_corte(cantidad, account_id) VALUES (10000, 1);
INSERT INTO saldo_corte(cantidad, account_id) VALUES (15500, 2);
INSERT INTO saldo_corte(cantidad, account_id) VALUES (16300, 3);
INSERT INTO saldo_corte(cantidad, account_id) VALUES (5250, 4);
INSERT INTO saldo_corte(cantidad, account_id) VALUES (74200, 5);

CREATE TABLE movimientos
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    cantidad DOUBLE NOT NULL,
    fecha DATETIME DEFAULT now(),
    account_entrada INT UNSIGNED REFERENCES users(id),
    account_salida INT UNSIGNED REFERENCES users(id),
    categoria_id INT UNSIGNED REFERENCES categoria(id)
);

INSERT INTO movimientos(cantidad, account_entrada, account_salida, categoria_id) VALUES (500, 1, 3, 1);
INSERT INTO movimientos(cantidad, account_entrada, account_salida, categoria_id) VALUES (1520, 4, 5, 1);
INSERT INTO movimientos(cantidad, account_entrada, account_salida, categoria_id) VALUES (875, 1, 3, 1);

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

CREATE TABLE pagos_automaticos
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    accounts_id INT UNSIGNED REFERENCES accounts(id)
);