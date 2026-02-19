# 🧠 Cognitive Reflex Analyzer

A real-time behavioural analytics system that captures user interaction events from a reflex-based game and streams them into Snowflake to derive cognitive performance insights using SQL.

## 🚨 Problem Statement

Modern digital products often lack real-time behavioural analytics for measuring reaction speed, attention, and interaction accuracy. These metrics help teams improve UX, optimize engagement, and detect performance or fatigue issues.

---

## 🎯 Solution

This project provides a reflex-based game that emits user interaction events (clicks, reaction time, misses) which are forwarded to a Node.js backend and ingested into Snowflake for SQL-based analysis.

---

## 🏗️ System Architecture

User Interaction (Game)
↓
Frontend Event Emitter
↓
Node.js Backend API
↓
Snowflake EVENTS Table
↓
SQL-based Analytics
↓
Performance Dashboard

---

## ⚙️ Tech Stack

| Layer         | Technology        |
|---------------|-------------------|
| Frontend      | HTML, CSS, JS     |
| Backend       | Node.js, Express  |
| Data Pipeline | REST API (POST)   |
| Warehouse     | Snowflake         |
| Hosting       | Vercel, Render    |

---

## 📡 Event Streaming

Each interaction emits a JSON event. Example:

```json
{
    "event_type": "target_click",
    "reaction_time": 312,
    "timestamp": "2026-02-19T10:23:45Z"
}
```

Send events to the backend with a POST request (example using curl):

```bash
curl -X POST https://<your-backend>/api/events \
    -H "Content-Type: application/json" \
    -d '{"event_type":"target_click","reaction_time":312,"timestamp":"2026-02-19T10:23:45Z"}'
```

Events are stored in Snowflake at `BUILDATHON_DB.GAME_SCHEMA.EVENTS`.

---

## 📊 Example Snowflake Queries

Average reaction time (rounded):

```sql
SELECT ROUND(AVG(reaction_time)) AS avg_reaction_ms
FROM BUILDATHON_DB.GAME_SCHEMA.EVENTS
WHERE event_type = 'target_click';
```

Accuracy percentage (target clicks / total events):

```sql
SELECT
    ROUND(COUNT_IF(event_type = 'target_click') * 100.0 / COUNT(*), 2) AS accuracy_pct
FROM BUILDATHON_DB.GAME_SCHEMA.EVENTS;
```

---

## 🚀 Live Demo & Repository

- Game: https://cognitive-reflex-analyzer.vercel.app/
- Dashboard: https://cognitive-reflex-analyzer.onrender.com/dashboard
- GitHub: https://github.com/Abhibanda09/cognitive-reflex-analyzer

---

## 🛠️ Local Setup

1) Clone the repository

```bash
git clone https://github.com/Abhibanda09/cognitive-reflex-analyzer.git
cd cognitive-reflex-analyzer
```

2) Backend

```bash
cd server
npm install
node server.js
```

3) Frontend

Open `client/index.html` in a browser or use Live Server / static host for local testing.

4) Snowflake setup (create these objects in your Snowflake account):

```sql
CREATE DATABASE IF NOT EXISTS BUILDATHON_DB;
CREATE SCHEMA IF NOT EXISTS BUILDATHON_DB.GAME_SCHEMA;
CREATE TABLE IF NOT EXISTS BUILDATHON_DB.GAME_SCHEMA.EVENTS (
    event_type STRING,
    reaction_time NUMBER,
    timestamp TIMESTAMP_NTZ,
    metadata VARIANT
);
```

5) Verify data ingestion

```sql
SELECT * FROM BUILDATHON_DB.GAME_SCHEMA.EVENTS LIMIT 100;
```

---

## 🏁 Notes

- This project demonstrates an event-driven architecture, real-time streaming into Snowflake, and SQL-based behavioural analytics for cognitive performance measurement.
- If you want, I can also validate links and run a quick spell-check across the repo.
