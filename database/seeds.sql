SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `roles`;
TRUNCATE TABLE `users`;
TRUNCATE TABLE `cartoons`;
TRUNCATE TABLE `cartoon_categories`;
TRUNCATE TABLE `cartoon_episodes`;
TRUNCATE TABLE `author_cartoon`;
TRUNCATE TABLE `cartoons_category_lists`;

-- 1. ROLES
INSERT INTO `roles` (`id`, `name`) VALUES 
(1, 'admin'),
(2, 'provider'),
(3, 'member');

-- 2. USERS (Admin and Authors)
INSERT INTO `users` (`id`, `email`, `password`, `roles_id`, `coin`) VALUES 
(1, 'admin@owlbook.com', '$2b$10$7vB9u5768S4y72H6u540OOn3W6pT6p386Z2N96p8K2q0j789w5n4i', 1, 9999),
(2, 'bigakimkkulppal@author.owlbook.com', '$2b$10$7vB9u5768S4y72H6u540OOn3W6pT6p386Z2N96p8K2q0j789w5n4i', 2, 0),
(3, 'haiendeumodoteamthej@author.owlbook.com', '$2b$10$7vB9u5768S4y72H6u540OOn3W6pT6p386Z2N96p8K2q0j789w5n4i', 2, 0),
(4, 'thebullymanga@author.owlbook.com', '$2b$10$7vB9u5768S4y72H6u540OOn3W6pT6p386Z2N96p8K2q0j789w5n4i', 2, 0),
(5, 'wuermanhuayexiao@author.owlbook.com', '$2b$10$7vB9u5768S4y72H6u540OOn3W6pT6p386Z2N96p8K2q0j789w5n4i', 2, 0),
(6, 'unknown@author.owlbook.com', '$2b$10$7vB9u5768S4y72H6u540OOn3W6pT6p386Z2N96p8K2q0j789w5n4i', 2, 0),
(7, 'moodyuju@author.owlbook.com', '$2b$10$7vB9u5768S4y72H6u540OOn3W6pT6p386Z2N96p8K2q0j789w5n4i', 2, 0),
(8, 'limhyeongsdcknight@author.owlbook.com', '$2b$10$7vB9u5768S4y72H6u540OOn3W6pT6p386Z2N96p8K2q0j789w5n4i', 2, 0);

-- 3. CARTOONS
INSERT INTO `cartoons` (`id`, `name`, `description`) VALUES 
(1, 'Chronicles of the Lazy Sovereign', 'นักรบผู้ยิ่งใหญ่ผู้ยุติความโกลาหลที่รุมเร้าโลก...'),
(2, 'Echoes of the Reverse Planet', 'แบคอูฮยอน นักศึกษาธรรมดาๆ ที่ต้องกลับมาจากการเป็นสตรีมเมอร์ในเกม VR...'),
(3, 'I Cleared 999 Floors in Advance', 'เรื่องราวของลู่หมิงที่เคลียร์หอคอยไปแล้ว 999 ชั้นก่อนใครเพื่อน...'),
(4, 'Magic Emperor', 'จักรพรรดิปีศาจ จั๋ว ฟาน เกิดใหม่เป็นพ่อบ้านในตระกูลที่กำลังตกอับ...'),
(5, 'Paranoid CEO Please Let Go', 'กู่เสี่ยวหรานถูกบังคับแต่งงานเพื่อช่วยชีวิตบิดา...'),
(6, 'Putting My Life on the Line', 'อามาโนะ เคียวเฮย์ ชายผู้ถูกโชคทอดทิ้งแต่กลับกลายเป็นกระแสไวรัล...'),
(7, 'Solo Farming In The Tower', 'เซจุน ชายหนุ่มที่ติดอยู่ในพื้นที่ลับของหอคอยและต้องทำฟาร์มเพื่อเอาชีวิตรอด...');

-- 4. CATEGORIES
INSERT INTO `cartoon_categories` (`id`, `name`) VALUES 
(1, 'Action'), (2, 'Adventure'), (3, 'Comedy'), (4, 'Martial Arts'), 
(5, 'Shonen'), (6, 'Manhwa (เกาหลี)'), (7, 'Drama'), (8, 'Fantasy'), 
(9, 'Psychological'), (10, 'Revenge'), (11, 'Manhua (จีน)'), (12, 'Romance'), 
(13, 'Dungeon');

-- 5. AUTHOR MAPPING
INSERT INTO `author_cartoon` (`users_id`, `cartoons_id`) VALUES 
(2, 1), (3, 2), (4, 3), (5, 4), (6, 5), (7, 6), (8, 7);

-- 6. CATEGORY MAPPING (Fixed from 'map' to IDs)
INSERT INTO `cartoons_category_lists` (`cartoon_categories_id`, `cartoons_id`) VALUES 
(1,1), (4,1), (6,1), -- Lazy Sovereign: Action, Martial Arts, Manhwa
(1,2), (8,2), (6,2), -- Echoes: Action, Fantasy, Manhwa
(1,3), (2,3), (13,3), -- 999 Floors: Action, Adventure, Dungeon
(1,4), (4,4), (11,4), -- Magic Emperor: Action, Martial Arts, Manhua
(7,5), (12,5), (9,5), -- Paranoid CEO: Drama, Romance, Psychological
(1,6), (8,6), (2,6),  -- Life on Line: Action, Fantasy, Adventure
(2,7), (3,7), (13,7); -- Solo Farming: Adventure, Comedy, Dungeon

-- 7. EPISODES
INSERT INTO `cartoon_episodes` (`cartoon_id`, `number`, `title`, `price`) VALUES 
(1, 1, 'Episode 1', 0), (1, 2, 'Episode 2', 0), (1, 3, 'Episode 3', 10),
(2, 1, 'Episode 1', 0), (2, 2, 'Episode 2', 0), (2, 3, 'Episode 3', 10),
(3, 1, 'Episode 1', 0), (3, 2, 'Episode 2', 0), (3, 3, 'Episode 3', 10),
(4, 1, 'Episode 1', 0), (4, 2, 'Episode 2', 0), (4, 3, 'Episode 3', 10),
(5, 1, 'Episode 1', 0), (5, 2, 'Episode 2', 0), (5, 3, 'Episode 3', 10),
(6, 1, 'Episode 1', 0), (6, 2, 'Episode 2', 0), (6, 3, 'Episode 3', 10),
(7, 1, 'Episode 1', 0), (7, 2, 'Episode 2', 0), (7, 3, 'Episode 3', 10);

SET FOREIGN_KEY_CHECKS = 1;