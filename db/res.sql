USE uowmerg;

-- people table

CREATE TABLE people (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
pname VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
age INT NOT NULL,
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


DROP TABLE people;

INSERT INTO people(pname, email, age)
VALUES('giannis','gian@gmail.com',22);

INSERT INTO people(pname, email, age)
VALUES('john','john@gmail.com',28);

INSERT INTO people(pname, email, age)
VALUES('jim','jim@yahoo.com',19);

UPDATE people
SET pname='maraki'
WHERE id=1;

UPDATE people
SET pname='mitsos', email='mit@uowm.gr', age = 33
WHERE id=2;

UPDATE people
SET email='prok@uowm.com'
WHERE id=2;

DELETE FROM people WHERE id = 1;



-- logs table

CREATE TABLE loggs (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(30) NOT NULL,
actionKind VARCHAR(30) NOT NULL,
actionTime DATETIME NOT NULL,
tableName VARCHAR(30) NOT NULL,
oldName VARCHAR(30),
oldemail VARCHAR(30),
oldAge INT,
newName VARCHAR(30),
newEmail VARCHAR(30),
newAge INT
);

DROP TABLE loggs;




-- trigger for insert
delimiter |

CREATE TRIGGER insertTrigger AFTER INSERT ON people FOR EACH ROW
  BEGIN
	INSERT INTO loggs(username,actionKind,actionTime,tableName,newName,newEmail,newAge)
    VALUES(current_user(),'INSERT',current_time(),'STUDENTS',new.pname,new.email,new.age);
  END;
|

delimiter ;



-- trigger for update
delimiter |

CREATE TRIGGER updateTrigger AFTER UPDATE ON people FOR EACH ROW
  BEGIN
	IF OLD.pname <> NEW.pname OR OLD.email <> NEW.email THEN
		INSERT INTO loggs(username,actionKind,actionTime,tableName,oldName,oldemail,oldAge,newName,newEmail,newAge)
		VALUES(current_user(),'UPDATE',current_time(),'STUDENTS',old.pname,old.email,old.age,new.pname,new.email,new.age);
        UNLOCK TABLES;
	END IF;
  END
|

delimiter ;



-- trigger for delete

delimiter |

CREATE TRIGGER deleteTrigger AFTER DELETE ON people FOR EACH ROW
  BEGIN
	INSERT INTO loggs(username,actionKind,actionTime,tableName,oldName)
	VALUES(current_user(),'DELETE',current_time(),'STUDENTS',old.pname);
    UNLOCK TABLES;
  END
|

delimiter ;



SET SQL_SAFE_UPDATES = 0;
DELETE FROM loggs ;
DELETE FROM people;


DROP TRIGGER insertTrigger;
DROP TRIGGER updateTrigger;










