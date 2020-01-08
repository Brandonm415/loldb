module.exports = function () {
    var express = require('express');
    var router = express.Router();


    function getPlayers(res, mysql, context, complete) {

        var newSql = 'SELECT * FROM players' +
            ' LEFT JOIN teams on players.team_id = teams.team_id' +
            ' LEFT JOIN players_roles ON players.player_id = players_roles.player_id' +
            ' LEFT JOIN players_characters ON players.player_id = players_characters.player_id' +
            ' LEFT JOIN roles ON players_roles.role_id = roles.role_id' +
            ' LEFT JOIN characters ON players_characters.character_id = characters.character_id' +
            ' LEFT JOIN regions ON teams.region_id = regions.region_id';

        mysql.pool.query(newSql, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.players = results;
            complete();
        });
    }




    /* Find people whose fname starts with a given string in the req 
    function getPeopleWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = "SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_people.fname LIKE " + mysql.pool.escape(req.params.s + '%');
        console.log(query)

        mysql.pool.query(query, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

    function getPerson(res, mysql, context, id, complete) {
        var sql = "SELECT character_id as id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results[0];
            complete();
        });
    }
*/
    /*Display all players for the home page*/
    router.get('/', function (req, res) {
        //var callbackCount = 0;
        //^^ used because they used multiple gets prior
        var context = {};
        //context.jsscripts = ["deleteperson.js", "filterpeople.js", "searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        function complete() {
            res.render('home', { context: context });

        }
    });

 
    return router;
}();
