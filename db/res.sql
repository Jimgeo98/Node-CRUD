
CREATE DATABASE people;

USE people;

-- people table

CREATE TABLE users (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
pname VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
am INT NOT NULL,
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--Tests
-- DROP TABLE users;

INSERT INTO users(pname, email, am)
VALUES('Lisa','lis@gmail.com',22);

INSERT INTO users(pname, email, am)
VALUES('John','john@gmail.com',28);

INSERT INTO users(pname, email, am)
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





-- logs table

CREATE TABLE loggs (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(30) NOT NULL,
actionKind VARCHAR(30) NOT NULL,
actionTime DATETIME NOT NULL,
tableName VARCHAR(30) NOT NULL,
oldName VARCHAR(30),
oldemail VARCHAR(30),
oldAm INT,
newName VARCHAR(30),
newEmail VARCHAR(30),
newAm INT
);

-- DROP TABLE loggs;




-- trigger for insert
delimiter |

CREATE TRIGGER insertTrigger AFTER INSERT ON users FOR EACH ROW
  BEGIN
	INSERT INTO loggs(username,actionKind,actionTime,tableName,newName,newEmail,newAge)
    VALUES(current_user(),'INSERT',current_time(),'STUDENTS',new.pname,new.email,new.am);
  END;
|

delimiter ;



-- trigger for update
delimiter |

CREATE TRIGGER updateTrigger AFTER UPDATE ON users FOR EACH ROW
  BEGIN
	IF OLD.pname <> NEW.pname OR OLD.email <> NEW.email THEN
		INSERT INTO loggs(username,actionKind,actionTime,tableName,oldName,oldemail,oldAge,newName,newEmail,newAge)
		VALUES(current_user(),'UPDATE',current_time(),'STUDENTS',old.pname,old.email,old.age,new.pname,new.email,new.am);
        UNLOCK TABLES;
	END IF;
  END
|

delimiter ;



-- trigger for delete

delimiter |

CREATE TRIGGER deleteTrigger AFTER DELETE ON users FOR EACH ROW
  BEGIN
	INSERT INTO loggs(username,actionKind,actionTime,tableName,oldName)
	VALUES(current_user(),'DELETE',current_time(),'STUDENTS',old.pname);
    UNLOCK TABLES;
  END
|

delimiter ;


--Tests

-- SET SQL_SAFE_UPDATES = 0;
-- DELETE FROM loggs;
-- DELETE FROM users;


-- DROP TRIGGER insertTrigger;
-- DROP TRIGGER updateTrigger;

--Tests
