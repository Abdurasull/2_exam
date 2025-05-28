

CREATE DATABASE IF NOT EXISTS avto_shop;
USE avto_shop;

SHOW DATABASES;


CREATE TABLE IF NOT EXISTS costumers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phoneNumber VARCHAR(15) NOT NULL,
    passport_number VARCHAR(20) NOT NULL UNIQUE
);

SELECT * FROM costumers;
CREATE TABLE IF NOT EXISTS cars(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL ,
    model VARCHAR(100) NOT NULL,    
    description TEXT,
    engine_capacity DECIMAL(5, 2), -- Litr
    fuel_type VARCHAR(50), -- Benzin, Dizel, Elektr
    transmission VARCHAR(50), -- Avtomatik, Mexanik
    color VARCHAR(50),
    year INT, -- Ishlab chiqarilgan yil
    mileage INT, -- Yurgan masofa (km)
    conditionn VARCHAR(50), -- Yangi, Ishlatilgan
    created_at DATE,
    price DECIMAL(12, 2) NOT NULL,
    count INT DEFAULT 0 -- Avtomobillar soni
    UNIQUE (name, model, year, color) -- Har bir avtomobil uchun yagona nom, model va yil kombinatsiyasi
);

SHOW TABLES;
DROP TABLE IF EXISTS cars;
INSERT INTO cars (name, model, description, engine_capacity, fuel_type, transmission, color, year, mileage, conditionn, created_at, price, count) VALUES
('Chevrolet', 'Malibu', 'Yangi Chevrolet Malibu 2023 model', 2.0, 'Benzin', 'Avtomatik', 'qizil', 2023, 0, 'Yangi', CURRENT_DATE(), 30000.00, 10);

SELECT * FROM cars;

CREATE TABLE IF NOT EXISTS status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE -- active, completed, cancelled, pending, failed
);

INSERT INTO status (name) VALUES
('active'),
('completed'),
('cancelled'),
('pending'),
('failed');


CREATE TABLE IF NOT EXISTS discount_conditions(
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    initial_payment DECIMAL(12, 2) NOT NULL, -- Boshlang‘ich to‘lov
    term_months INT NOT NULL, -- Muddat (oylarda),
    interest_rate DECIMAL(5, 2) NOT NULL, -- oylik foiz stavkasi
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

SELECT * FROM discount_conditions;
SHOW TABLES;

CREATE TABLE IF NOT EXISTS contract(
    id INT AUTO_INCREMENT PRIMARY KEY,
    costumer_id INT NOT NULL,
    car_id INT NOT NULL,
    discount_id INT NOT NULL,
    FOREIGN KEY (costumer_id) REFERENCES costumers(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
    FOREIGN KEY (discount_id) REFERENCES discount_conditions(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 1, -- active, completed, cancelled
    FOREIGN KEY (status) REFERENCES status(id)
);

CREATE TABLE IF NOT EXISTS payments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT,
    amount DECIMAL(12, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contract(id) ON DELETE CASCADE,
    status INT NOT NULL DEFAULT 1, -- pending, completed, failed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (status) REFERENCES status(id)
);

DROP TABLE IF EXISTS payments;

SHOW TABLES;


