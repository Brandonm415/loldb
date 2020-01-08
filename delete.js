module.exports = function () {
    var express = require('express');
    var router = express.Router();


    /* the following function help add everything all together*/
    // add to context which loads everything
    function getAll(res, mysql, context, complete) {

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
            //complete();
        });

        var newSql = 'Select * from regions';
        mysql.pool.query(newSql, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.regions = results;
            //complete();
        });

        var newSql = 'Select * from teams';
        mysql.pool.query(newSql, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teams = results;
            //complete();
        });

        var newSql = 'Select * from roles';
        mysql.pool.query(newSql, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.roles = results;
            //complete();
        });

        var newSql = 'Select * from characters';
        mysql.pool.query(newSql, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

    /*Display all regions for the home page*/
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js", "filterpeople.js", "searchpeople.js"];
        var mysql = req.app.get('mysql');
        getAll(res, mysql, context, complete);

        function complete() {
            res.render('delete', { context: context });
        }
    });

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        // not accepting or taking in values?
        //plugging in numbers to ? works
        //console.log(req)
        var sql = "DELETE FROM players WHERE player_id = ?";
        // leave the id here. dont change back to region_id
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    });




    return router;
}();
