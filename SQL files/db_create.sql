-- CREATE TABLES 
-- Create Region

-- DROP TABLE IF EXISTS `regions`;
CREATE TABLE `regions` (
  `region_id` int(11) NOT NULL AUTO_INCREMENT,
  `regionName` varchar(255) NOT NULL,
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT regions (regionName) 
VALUES 
	("KR"),
	("CN"),
	("EU"),
	("NA");


/*
We actually dont need this becausew we can get the list of regions through teams
CREATE TABLE `regions_teams` (
    `rid` int(11) NOT NULL DEFAULT '0',
    `tid` int(11) NOT NULL DEFAULT '0',
    PRIMARY KEY (`rid`,`tid`),
  	KEY `rid` (`rid`),
    CONSTRAINT `region_team_fk1` FOREIGN KEY (`rid`) REFERENCES `regions` (`region_id`),
	CONSTRAINT `region_team_fk2` FOREIGN KEY (`tid`) REFERENCES `teams` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
*/

-- DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `teamName` varchar(255) NOT NULL,
  `region_id` int(11) NOT NULL,
  PRIMARY KEY (`team_id`),
  	FOREIGN KEY (region_id) REFERENCES regions (region_id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT teams(teamName, region_id) 
VALUES 
	("Cloud9", "1"),
	("G2", "2"),
	("SKT", "1"),
	("TSM", "3");

-- CreatePlayer
-- DROP TABLE IF EXISTS `players`;
CREATE TABLE `players`(
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  `playerName` varchar(255) NOT NULL,
    `team_id` int(11) NOT NULL,
  	PRIMARY KEY (`player_id`),
	FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT players (playerName, team_id) 
VALUES 
	("Faker", 1), 
	("Caps", 2); 

-- Create ROLES
-- DROP TABLE IF EXISTS `roless`;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `roles`(roleName) 
VALUES
    ("ADC"),
    ("SUPPORT"),
    ("MID"),
    ("TOP"),
    ("JUNGLER");


-- CreateCharacter
-- DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters` (
  `character_id` int(11) NOT NULL AUTO_INCREMENT,
  `characterName` varchar(255) NOT NULL,
  PRIMARY KEY (`character_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO characters (characterName) 
VALUES 
	("Jax"), 
	("Ashe"),
	('Lucian'),
	('Azir'),
	('Amumu'),
	('Bard');

-- Create players_roles TABLE
-- DROP TABLE IF EXISTS `players_roles`;
CREATE TABLE players_roles (
	player_id int(11),
	role_id int(11),
	PRIMARY KEY(player_id, role_id),
	FOREIGN KEY (player_id) REFERENCES players (player_id) ON DELETE CASCADE,
	FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE
);

insert INTO players_roles(player_id, role_id) 
VALUES 
	(1,1),
	(2,3);

-- Create players_characters TABLE
-- DROP TABLE IF EXISTS `players_characters`;
CREATE TABLE players_characters (
	player_id INT,
	character_id INT,
	PRIMARY KEY(player_id, character_id),
	FOREIGN KEY (player_id) REFERENCES players (player_id) ON DELETE CASCADE,
	FOREIGN KEY (character_id) REFERENCES characters (character_id) ON DELETE CASCADE
);
insert INTO players_characters(player_id, character_id) 
VALUES 
	(1,1),
	(2,2);
