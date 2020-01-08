-- These are some Database Manipulation queries for a partially implemented Project Website 
-- using the bsg database.
-- Your submission should contain ALL the queries required to implement ALL the
-- functionalities listed in the Project Specs.


-- basic 
-- Get all Player information ( PlayerID, inGame_name, roleID, TeamID)
	SELECT * FROM players;
-- get all regions(regionId, RegionName, TeamId)
	SELECT * FROM regions;
-- Get all teams(teamId, TeamName) from regions
	SELECT * FROM teams;
--get all teams names with respective players
	SELECT teamName, playerName FROM players;
-- Get roles from players 
	SELECT role_id FROM players;
-- Get all characters played by a player
	SELECT characterName FROM `players` 
	INNER JOIN players_characters ON players.player_id = players_characters.player_id
	INNER JOIN characters on players_characters.character_id = characters.character_id
	where playerName = ':playerName';

-- Get ALL regions with matching teams
	SELECT regionName, teamName FROM
	regions
	INNER JOIN teams ON regions.region_id = teams.region_id
	GROUP BY regionName

-- add a new regionId
	INSERT INTO regions(regionName) VALUES(":regionName");
-- add a new TeamID
	INSERT INTO teams(teamName, region_id) VALUES(":teamName", ":region_id");
-- add a new players
	INSERT INTO players(Playername, role_id, team_id) VALUES(":playerName", ":role_id", ":team_id");
-- add a new role
	INSERT INTO roles(roleName) VALUES(":roleName");
-- add a new character
	INSERT INTO characters(characterName) VALUES(":characterName");

-- UPDATE

-- update region name
	UPDATE regions
	SET regionName =  ":regionName"
	WHERE region_id = ":region_id";
-- update a team name
	UPDATE teams
	SET teamName = ":teamName"
	WHERE team_id = ":team_id";

-- update players
	UPDATE players
	SET playerName = ":playerName"
	WHERE player_id = ":player_id";

-- update a character
	UPDATE characters
	SET characterName = ":characterName"
	WHERE character_id = ":character_id";
	
-- delete

-- delete region
	DELETE FROM regions WHERE regionName = ":regionName"

-- delete team
	DELETE FROM teams WHERE teamName = ":teamName";

-- delete players
	DELETE FROM players WHERE playerName = ":playerName";

-- delete role
	DELETE FROM roles WHERE roleName = ":roleName";

-- delete character
	DELETE FROM characters WHERE characterName = ":characterName";


