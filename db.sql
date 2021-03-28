CREATE DATABASE
IF NOT EXISTS `trace`;
USE trace;


DROP TABLE IF EXISTS `user`;
CREATE TABLE
IF NOT EXISTS `user` (

  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NULL,
  `password` VARCHAR(80) NOT NULL,
  `role` VARCHAR(30) NOT NULL,
  UNIQUE INDEX `uq_email`(`email` ASC),
  PRIMARY KEY(`id`)
  );

  DROP TABLE IF EXISTS `qrcode`;
CREATE TABLE
IF NOT EXISTS `qrcode` (
  `key` TEXT NOT NULL DEFAULT 'haxplore',
  `pid` BIGINT NOT NULL AUTO_INCREMENT,
  `producer` TEXT DEFAULT '',
  `supplier` TEXT DEFAULT '',
  `seller` TEXT DEFAULT '',
  `dat` TEXT NOT NULL,
  `rights` TEXT,
  PRIMARY KEY(`pid`)
  );

  DROP TABLE IF EXISTS `product`;
CREATE TABLE
IF NOT EXISTS `product` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  PRIMARY KEY(`id`)
  );
