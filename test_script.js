const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  var someId = process.argv[2];

  if (err) {
    return console.error("Connection Error", err);
  }
  // client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    client.query(`SELECT * FROM famous_people WHERE first_name = $1 `, [someId], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    // console.log(result.rows[0].number); //output: 1
    console.log(result.rows);
    client.end();
  });
});

