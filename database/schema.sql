-- MariaDB Script
-- Converted from MySQL Workbench output

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb4;
USE `mydb`;

-- -----------------------------------------------------
-- Table `mydb`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(24) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `roles_id` INT NOT NULL,
  `coin` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_roles1_idx` (`roles_id`),
  UNIQUE INDEX `email_UNIQUE` (`email`),
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `mydb`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cartoons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cartoons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cartoon_episodes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cartoon_episodes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cartoon_id` INT NOT NULL,
  `number` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL DEFAULT 0,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cartoon_episodes_cartoons_idx` (`cartoon_id`),
  UNIQUE INDEX `uq_catoon_episodes` (`cartoon_id`, `number`),
  CONSTRAINT `fk_cartoon_episodes_cartoons`
    FOREIGN KEY (`cartoon_id`)
    REFERENCES `mydb`.`cartoons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cartoon_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cartoon_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `srcid` VARCHAR(45) NOT NULL,
  `amount` INT NOT NULL,
  `status` TINYINT NOT NULL COMMENT '0=pending,1=paid,2=failed',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_payments_users1_idx` (`users_id`),
  CONSTRAINT `fk_payments_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_cartoon_histories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user_cartoon_histories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cartoon_ep_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `paid_amount` INT NOT NULL DEFAULT 0,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cartoon_episodes_has_users_users1_idx` (`user_id`),
  INDEX `fk_cartoon_episodes_has_users_cartoon_episodes1_idx` (`cartoon_ep_id`),
  UNIQUE INDEX `uq_user_cartoon_hist` (`user_id`, `cartoon_ep_id`),
  CONSTRAINT `fk_cartoon_episodes_has_users_cartoon_episodes1`
    FOREIGN KEY (`cartoon_ep_id`)
    REFERENCES `mydb`.`cartoon_episodes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cartoon_episodes_has_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_favourites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user_favourites` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `cartoons_id` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_has_cartoons_cartoons1_idx` (`cartoons_id`),
  INDEX `fk_users_has_cartoons_users1_idx` (`user_id`),
  UNIQUE INDEX `uq_user_cartoon` (`cartoons_id`, `user_id`),
  CONSTRAINT `fk_users_has_cartoons_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_cartoons_cartoons1`
    FOREIGN KEY (`cartoons_id`)
    REFERENCES `mydb`.`cartoons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cartoons_category_lists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cartoons_category_lists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cartoon_categories_id` INT NOT NULL,
  `cartoons_id` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cartoon_categories_has_cartoons_cartoons1_idx` (`cartoons_id`),
  INDEX `fk_cartoon_categories_has_cartoons_cartoon_categories1_idx` (`cartoon_categories_id`),
  UNIQUE INDEX `uq_cartoon_category_list` (`cartoons_id`, `cartoon_categories_id`),
  CONSTRAINT `fk_cartoon_categories_has_cartoons_cartoon_categories1`
    FOREIGN KEY (`cartoon_categories_id`)
    REFERENCES `mydb`.`cartoon_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cartoon_categories_has_cartoons_cartoons1`
    FOREIGN KEY (`cartoons_id`)
    REFERENCES `mydb`.`cartoons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`author_cartoon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`author_cartoon` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `cartoons_id` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_has_cartoons_cartoons2_idx` (`cartoons_id`),
  INDEX `fk_users_has_cartoons_users2_idx` (`users_id`),
  UNIQUE INDEX `uq_author_catoon` (`users_id`, `cartoons_id`),
  CONSTRAINT `fk_users_has_cartoons_users2`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_cartoons_cartoons2`
    FOREIGN KEY (`cartoons_id`)
    REFERENCES `mydb`.`cartoons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;