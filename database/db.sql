create database if not exists BrewingDB;
use BrewingDB;
create table if not exists Users (
    Id          int unsigned auto_increment
        primary key,
    Username    varchar(64)   not null,
    Password    varchar(64)   not null,
    SumOfPoints int default 0 not null,
    constraint Username
        unique (Username),
    constraint CHK_Username
        check (octet_length(`Username`) >= 8)
);

create table if not exists Attempts (
    Id        int unsigned auto_increment
        primary key,
    TimeTaken time         not null,
    Points    int unsigned not null,
    DateOn    date         not null,
    UserId    int unsigned not null,
    constraint FK_Attempts_UserID_Users_ID
        foreign key (UserId) references Users (Id)
);

create table if not exists LeaderboardPoints (
    UserId int unsigned not null,
    Points int unsigned not null,
    constraint FK_LeaderboardPoints_UserId_Users_Id
        foreign key (UserId) references Users (Id)
);

create table if not exists LeaderboardTime (
    UserId    int unsigned not null,
    TimeTaken time         not null,
    DateOn    date         not null,
    constraint FK_LeaderboardTime_UserId_Users_Id
        foreign key (UserId) references Users (Id)
);

create procedure Users_registerUser(IN UsernameNew varchar(64), IN PasswordNew varchar(64))
BEGIN

    IF NOT EXISTS(SELECT Username FROM Users WHERE Username = UsernameNew)
        THEN INSERT INTO Users(Username, Password) VALUES(UsernameNew, PasswordNew);
        SELECT 1;
    ELSE
        SELECT 0;

    END IF;

END;
