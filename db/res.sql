
CREATE DATABASE people;

USE people;

-- people table

CREATE TABLE users (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
am INT NOT NULL,
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tests
-- DROP TABLE users;

INSERT INTO users(name, email, am)
VALUES('Lisa','lis@gmail.com',22);

INSERT INTO users(name, email, am)
VALUES('John','john@gmail.com',28);

INSERT INTO users(name, email, am)
VALUES('Alex','ale@yahoo.com',19);



-- Tests

-- UPDATE users
-- SET pname='maria'
-- WHERE id=1;

-- UPDATE users
-- SET pname='mitsos', email='mit@uowm.gr', am = 33
-- WHERE id=2;

-- UPDATE users
-- SET email='prok@uowm.com'
-- WHERE id=2;

-- DELETE FROM users WHERE id = 1;

-- Tests



