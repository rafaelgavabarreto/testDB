const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  var someId = process.argv[2];

  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1`, [someId], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    let results = result.rows
    console.log("Found " + result.rows.length + " person(s) by the name '" + someId + "':");
    for (let i = 0; i < result.rows.length; i++) {
      console.log("- ", (i + 1), ":", results[i].first_name, results[i].last_name, "born '" + results[i].birthdate.toLocaleDateString() + "'");
    }

    client.end();
  });
});
