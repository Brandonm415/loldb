module.exports = function () {
    var express = require('express');
    var router = express.Router();


    /* the following function help add everything all together*/
    // add to context which loads everything
    function getAll(res, mysql, context, complete) {
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
            res.render('add', { context: context });
        }
    });

    /* Adds a new entry, redirects to the people page after adding */
    router.post('/', function (req, res) {
        console.log(req.body)
        // select which is gonna be important
        var sql = "";
        var inserts = [];
        // check for both the body and to make sure that there is something within each value
        // so that sql doesnt get loaded up and then we can submit properly.
        if (req.body.playerName != null & req.body.playerName != "" ) {
            //console.log("Starting to get warmer")
            sql = "INSERT INTO players (`playerName`, `team_id`) VALUES (?,?)";
            inserts = [req.body.playerName, req.body.team_id];
        } else if (req.body.characterName != null & req.body.characterName != "") {
            sql = "INSERT INTO characters (characterName) VALUES (?)";
            inserts = [req.body.characterName];
        } else if (req.body.teamName != null & req.body.teamName != "") {
            sql = "INSERT INTO teams (`teamName`, `region_id`) VALUES (?,?)";
            inserts = [req.body.teamName, req.body.region_id];
        } else if (req.body.regionName != null & req.body.regionName != "") {
            sql = "INSERT INTO regions (regionName) VALUES (?)";
            inserts = [req.body.regionName];
        } 

        // check to see if the user has submited something
        if (sql.length !== 0) {
            //console.log("Do something heere")
            var mysql = req.app.get('mysql');

            sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
                if (error) {
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    console.log("ERROR HAPPENED")
                    res.end();
                } else {
                    //console.log(results.insertId)
                    if (req.body.playerName != null) {
                        sql = "INSERT INTO players_roles (`player_id`, `role_id`) VALUES (?,?)";
                        //HERE IT IS IF IT GETS BUGGY USING INSERT ID - A much better version would be to use a sql for search 
                        // then attempt to try again. and upload and add the roles 
                        inserts = [results.insertId, req.body.role_id];
                        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
                            if (error) {
                                console.log(JSON.stringify(error))
                                res.write(JSON.stringify(error));
                                console.log("ERROR HAPPENED within the player add loop. ")
                                res.end();
                            } else {
                            }

                        });
                        sql = "INSERT INTO players_characters (`player_id`, `character_id`) VALUES (?,?)";
                        //HERE IT IS IF IT GETS BUGGY USING INSERT ID - A much better version would be to use a sql for search 
                        // then attempt to try again. and upload and add the roles 
                        inserts = [results.insertId, req.body.character_id];
                        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
                            if (error) {
                                console.log(JSON.stringify(error))
                                res.write(JSON.stringify(error));
                                console.log("ERROR HAPPENED within the player add loop. ")
                                res.end();
                            } else {
                            }

                        });
                    }

                }
            });

        }
        // if it failed then it will route back to add page
        res.redirect('/add');
    }); // end of the route getter

    return router;
}();
