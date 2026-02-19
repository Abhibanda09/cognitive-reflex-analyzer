# 🧠 Cognitive Reflex Analyzer

A real-time behavioural analytics system that captures user interaction events from a reflex-based game and streams them into Snowflake to derive cognitive performance insights using SQL.

---

## 🚨 Problem Statement

Modern digital products lack real-time behavioural analytics to measure how users interact cognitively with interfaces — such as reaction speed, attention span, and interaction accuracy.

Understanding these metrics can help:

- Improve UX design
- Optimize engagement
- Identify performance bottlenecks
- Detect user fatigue patterns

---

## 🎯 Solution

We built a cognitive reflex game that generates real-time interaction events such as:

- Target Click
- Reaction Time
- Missed Interaction
- Timestamp

These behavioural events are streamed into a Snowflake-backed analytics pipeline to derive performance metrics using SQL queries.

---

## 🏗️ System Architecture

# 🧠 Cognitive Reflex Analyzer

A real-time behavioural analytics system that captures user interaction events from a reflex-based game and streams them into Snowflake to derive cognitive performance insights using SQL.

---

## 🚨 Problem Statement

Modern digital products lack real-time behavioural analytics to measure how users interact cognitively with interfaces — such as reaction speed, attention span, and interaction accuracy.

Understanding these metrics can help:

- Improve UX design
- Optimize engagement
- Identify performance bottlenecks
- Detect user fatigue patterns

---

## 🎯 Solution

We built a cognitive reflex game that generates real-time interaction events such as:

- Target Click
- Reaction Time
- Missed Interaction
- Timestamp

These behavioural events are streamed into a Snowflake-backed analytics pipeline to derive performance metrics using SQL queries.

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

| Layer        | Technology        |
|-------------|-------------------|
Frontend      | HTML, CSS, JS     |
Backend       | Node.js, Express  |
Data Pipeline | REST API          |
Warehouse     | Snowflake         |
Hosting       | Vercel, Render    |

---

## 📡 Event Streaming

Each interaction emits an event:

```json
{
  "event_type": "target_click",
  "reaction_time": 312,
  "timestamp": "2026-02-19T10:23:45Z"
}


---

## ⚙️ Tech Stack

| Layer        | Technology        |
|-------------|-------------------|
Frontend      | HTML, CSS, JS     |
Backend       | Node.js, Express  |
Data Pipeline | REST API          |
Warehouse     | Snowflake         |
Hosting       | Vercel, Render    |

---

## 📡 Event Streaming

Each interaction emits an event:

```json
{
  "event_type": "target_click",
  "reaction_time": 312,
  "timestamp": "2026-02-19T10:23:45Z"
}

Events are sent via:
POST /api/events
and stored in:
BUILDATHON_DB.GAME_SCHEMA.EVENTS


📊 Behaviour Analytics using Snowflake

Average Reaction Time

sql
    SELECT ROUND(AVG(REACTION_TIME))
    FROM BUILDATHON_DB.GAME_SCHEMA.EVENTS
    WHERE EVENT_TYPE='target_click';

Accuracy %

sql
    SELECT
    ROUND(
    COUNT_IF(EVENT_TYPE='target_click')*100.0/
    COUNT(*)
    )
    FROM BUILDATHON_DB.GAME_SCHEMA.EVENTS;

🚀 Live Demo

🎮 Game:

https://vercel.com/abhibanda09s-projects/cognitive-reflex-analyzer

📊 Dashboard:

https://cognitive-reflex-analyzer.onrender.com/dashboard

📂 GitHub Repository

https://github.com/Abhibanda09/cognitive-reflex-analyzer


🏁 Buildathon Submission

This project demonstrates:
  - Event-driven architecture
  - Real-time streaming pipeline
  - Snowflake data ingestion
  - SQL-based behavioural analytics
  - for cognitive performance measurement in interactive systems.


---

# ⚠️ IMPORTANT

Find this line:

https://cognitive-reflex-analyzer.vercel.app/