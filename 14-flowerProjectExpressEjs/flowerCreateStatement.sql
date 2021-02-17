drop database if exists flowerdb;
create database flowerdb;
use flowerdb;

create table flower(
    flowerId integer not null primary key,
    name varchar(26) not null,
    unitPrice integer not null,
    site varchar(15) not null,
    stock integer not null
);

drop user if exists 'leo'@'localhost';
create user 'leo'@'localhost' identified by 'g0SfVD7s';

grant all privileges on flowerdb.* to 'leo'@'localhost';

insert into flower values (1,'tulip',10,'sunny',200);
insert into flower values (2,'violet',5,'half shadow',100);