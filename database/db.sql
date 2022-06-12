create database if not exists brewingdb;

use brewingdb;

create table if not exists users
(
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

create table if not exists attempts
(
    Id        int unsigned auto_increment
        primary key,
    TimeTaken time         not null,
    Points    int unsigned not null,
    DateOn    date         not null,
    UserId    int unsigned not null,
    constraint FK_Attempts_UserID_Users_ID
        foreign key (UserId) references users (Id)
);

create table if not exists leaderboardpoints
(
    UserId int unsigned not null,
    Points int unsigned not null,
    constraint FK_LeaderboardPoints_UserId_Users_Id
        foreign key (UserId) references users (Id)
);

create table if not exists leaderboardtime
(
    UserId    int unsigned not null,
    TimeTaken time         not null,
    DateOn    date         not null,
    constraint FK_LeaderboardTime_UserId_Users_Id
        foreign key (UserId) references users (Id)
);

