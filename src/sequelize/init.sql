CREATE DATABASE IF NOT EXISTS jokes;

USE jokes;

CREATE TABLE
    IF NOT EXISTS `anek` (
        `id` int NOT NULL auto_increment,
        `cat` int NOT NULL,
        `text` text NOT NULL,
        PRIMARY KEY (`id`)
    );