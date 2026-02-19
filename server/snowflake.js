const snowflake = require("snowflake-sdk");

// ❗ Replace ONLY username & password below

const connection = snowflake.createConnection({
  account: "VBFVLLQ-PN67140",  // Azure Account ID
  username: process.env.SNOW_USER,
  password: process.env.SNOW_PASS,
  warehouse: "COMPUTE_WH",
  database: "BUILDATHON_DB",
  schema: "GAME_SCHEMA"
});

// Connect to Snowflake
connection.connect(function(err, conn) {
  if (err) {
    console.error("Unable to connect to Snowflake:", err);
  } else {
    console.log("Connected to Snowflake!");
  }
});

// Insert event into Snowflake table
function insertEvent(event) {

  if (!event.reaction_time) return;

  const sql = `
    INSERT INTO EVENTS (EVENT_TYPE, REACTION_TIME, TIMESTAMP)
    VALUES (?, ?, ?)
  `;

  connection.execute({
    sqlText: sql,
    binds: [
      event.event_type,
      event.reaction_time,
      new Date(event.timestamp)
    ],
    complete: function(err, stmt, rows) {
      if (err) {
        console.error("Insert Failed:", err);
      }
    }
  });
}

module.exports = { insertEvent };
