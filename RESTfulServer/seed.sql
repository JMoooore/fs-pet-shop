DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    petID SERIAL,
    name varchar(50),
    age int,
    kind varchar(100),
    PRIMARY KEY (petID)
);

INSERT INTO pets (age, kind, name) VALUES (7, 'rainbow', 'fido');
INSERT INTO pets (age, kind, name) VALUES (5, 'snake', 'Buttons');


--SELECT name, age, kind FROM pets WHERE petID = X;
--DELETE FROM pets WHERE petID = X;
--INSERT INTO pets (age, kind, name) VALUES (69, 'cat', 'dog');
--FIND current and update values in variables then update all with one SQL statement
--UPDATE pets SET age = 72, kind='fish', name='catfish' WHERE petID = 1;