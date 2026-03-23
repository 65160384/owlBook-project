-- Use the schema
USE `mydb`;

-- -----------------------------------------------------
-- Insert Roles
-- -----------------------------------------------------
INSERT INTO `roles` (`name`) VALUES 
('Admin'),
('Author'),
('Reader');

-- -----------------------------------------------------
-- Insert Users
-- -----------------------------------------------------
-- Note: Passwords are just placeholders. 
-- Role 1: Admin, 2: Author, 3: Reader
INSERT INTO `users` (`email`, `password`, `roles_id`, `coin`) VALUES 
('admin@webtoon.th', 'hashed_pass_1', 1, 9999),
('somchai_author@gmail.com', 'hashed_pass_2', 2, 500),
('jane_doe@outlook.com', 'hashed_pass_3', 2, 120),
('kanya_reader@gmail.com', 'hashed_pass_4', 3, 50),
('user_test01@gmail.com', 'hashed_pass_5', 3, 0);

-- -----------------------------------------------------
-- Insert Cartoon Categories
-- -----------------------------------------------------
INSERT INTO `cartoon_categories` (`name`) VALUES 
('Romance (โรแมนติก)'),
('Action (แอคชั่น)'),
('Horror (สยองขวัญ)'),
('Comedy (ตลก)'),
('Fantasy (แฟนตาซี)');

-- -----------------------------------------------------
-- Insert Cartoons
-- -----------------------------------------------------
INSERT INTO `cartoons` (`name`, `description`) VALUES 
('Love in Bangkok', 'A sweet story about life in the big city. เรื่องราวความรักวุ่นๆ กลางกรุงกรุงเทพฯ'),
('The Legend of Siam', 'An epic fantasy set in ancient Thailand. มหากาพย์แฟนตาซีในยุคกรุงศรีอยุธยา'),
('Office Ghost (ผีออฟฟิศ)', 'Every office has a secret. Working late might be a mistake. ทุกออฟฟิศมีเรื่องเล่า... การอยู่ดึกอาจทำให้คุณเจอดี'),
('Cat Master (นายท่านเหมียว)', 'Daily life of a cat owner who is actually a servant. ชีวิตประจำวันของทาสแมวกับเจ้านายสุดป่วน');

-- -----------------------------------------------------
-- Link Authors to Cartoons
-- -----------------------------------------------------
INSERT INTO `author_cartoon` (`users_id`, `cartoons_id`) VALUES 
(2, 1), -- Somchai wrote Love in Bangkok
(2, 2), -- Somchai wrote Legend of Siam
(3, 3), -- Jane wrote Office Ghost
(3, 4); -- Jane wrote Cat Master

-- -----------------------------------------------------
-- Link Cartoons to Categories
-- -----------------------------------------------------
INSERT INTO `cartoons_category_lists` (`cartoon_categories_id`, `cartoons_id`) VALUES 
(1, 1), -- Romance
(4, 1), -- Comedy
(2, 2), -- Action
(5, 2), -- Fantasy
(3, 3), -- Horror
(4, 4); -- Comedy

-- -----------------------------------------------------
-- Insert Cartoon Episodes
-- -----------------------------------------------------
INSERT INTO `cartoon_episodes` (`cartoon_id`, `number`, `title`, `price`) VALUES 
(1, 1, 'The Meeting (การพบกันครั้งแรก)', 0),
(1, 2, 'First Date (เดทแรกสุดเขิน)', 5),
(2, 1, 'The Awakening (การตื่นขึ้นของพลัง)', 0),
(3, 1, 'Overtime (ทำงานล่วงเวลา)', 0),
(3, 2, 'The Elevator (ลิฟต์อาถรรพ์)', 10),
(4, 1, 'Welcome Home (ยินดีต้อนรับนายท่าน)', 0);

-- -----------------------------------------------------
-- Insert Payments (Buying Coins)
-- -----------------------------------------------------
INSERT INTO `payments` (`users_id`, `srcid`, `amount`, `status`) VALUES 
(4, 'PAY-998877', 100, 1), -- Success
(5, 'PAY-112233', 50, 0);   -- Pending

-- -----------------------------------------------------
-- Insert User Favourites
-- -----------------------------------------------------
INSERT INTO `user_favourites` (`user_id`, `cartoons_id`) VALUES 
(4, 1),
(4, 4);

-- -----------------------------------------------------
-- Insert User Cartoon Histories (Purchased/Read episodes)
-- -----------------------------------------------------
INSERT INTO `user_cartoon_histories` (`cartoon_ep_id`, `user_id`, `paid_amount`) VALUES 
(1, 4, 0), -- Read Free EP
(2, 4, 5), -- Paid 5 coins for EP 2
(5, 4, 10); -- Paid 10 coins for Office Ghost EP 2