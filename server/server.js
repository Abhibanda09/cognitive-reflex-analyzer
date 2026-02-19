const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { insertEvent } = require("./snowflake");

const app = express();

app.use(cors());
app.use(express.json());

// ---------------- RECEIVE EVENTS ----------------

app.post("/api/events", (req, res) => {

  const events = req.body;

  console.log("Received Events:", events);

  // Save locally also
  fs.appendFileSync(
    "events.json",
    JSON.stringify(events) + "\n"
  );

  // Insert into Snowflake
  events.forEach(ev => {
    insertEvent(ev);
  });

  res.json({
    message: "Events stored successfully"
  });
});

// ---------------- ANALYTICS API ----------------

app.get("/api/analytics", (req, res) => {

  try {

    const raw = fs.readFileSync("events.json", "utf-8")
                  .split("\n")
                  .filter(Boolean);

    let reactionTimes = [];
    let clicks = 0;
    let misses = 0;

    raw.forEach(line => {

      const events = JSON.parse(line);

      events.forEach(ev => {

        if(ev.event_type === "target_click") {
          reactionTimes.push(ev.reaction_time);
          clicks++;
        }

        if(ev.event_type === "target_miss") {
          misses++;
        }

      });

    });

    const avgReaction =
      reactionTimes.reduce((a,b)=>a+b,0)
      / reactionTimes.length || 0;

    const accuracy =
      (clicks / (clicks + misses)) * 100 || 0;

    res.json({
      avgReaction: Math.round(avgReaction),
      accuracy: Math.round(accuracy)
    });

  } catch(err) {

    res.json({
      avgReaction: 0,
      accuracy: 0
    });
  }

});

// ---------------- DASHBOARD PAGE ----------------

app.get("/dashboard", (req,res)=>{
  res.sendFile(__dirname + "/dashboard.html");
});

// ---------------- START SERVER ----------------

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
