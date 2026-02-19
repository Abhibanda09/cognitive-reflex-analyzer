import { spawnTarget } from "./target.js";
import { gameStateData } from "./gameState.js";
import { emitEvent, sendEventsToServer } from "./events.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let activeTarget = null;
let targetVisibleTime = 1500;

// ------------------ DRAW TARGET ------------------

function drawTarget(target) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
  ctx.fill();
}

// ------------------ ADAPTIVE DIFFICULTY ------------------

function adjustDifficulty() {

  if (gameStateData.reactionTimes.length < 5) return;

  const lastFive = gameStateData.reactionTimes.slice(-5);
  const avg = lastFive.reduce((a, b) => a + b) / 5;

  const accuracy = gameStateData.successfulClicks /
                   gameStateData.totalClicks;

  if (avg < 350 && accuracy > 0.8) {

    targetVisibleTime -= 100;
    if (targetVisibleTime < 500) targetVisibleTime = 500;

    console.log("Difficulty Increased");
  }

  else if (avg > 600) {

    targetVisibleTime += 100;
    if (targetVisibleTime > 2000) targetVisibleTime = 2000;

    console.log("Difficulty Reduced");
  }
}

// ------------------ CLICK DETECTION ------------------

canvas.addEventListener("click", function (e) {

  if (gameStateData.gameState !== "RUNNING") return;
  if (!activeTarget) return;

  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  const dx = clickX - activeTarget.x;
  const dy = clickY - activeTarget.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < activeTarget.radius) {

    const reactionTime = performance.now() - activeTarget.spawnTime;

    gameStateData.reactionTimes.push(reactionTime);
    gameStateData.successfulClicks++;

    emitEvent("target_click", {
      reaction_time: reactionTime
    });

    adjustDifficulty();

    activeTarget = null;
  }
});

// ------------------ END SESSION ------------------

function endSession() {

  gameStateData.gameState = "ENDED";

  let avgReaction = 0;
  if (gameStateData.reactionTimes.length > 0) {
    avgReaction =
      gameStateData.reactionTimes.reduce((a, b) => a + b) /
      gameStateData.reactionTimes.length;
  }

  let accuracy = 0;
  if (gameStateData.totalClicks > 0) {
    accuracy =
      (gameStateData.successfulClicks /
        gameStateData.totalClicks) * 100;
  }

  emitEvent("session_end", {
    avg_reaction: avgReaction,
    accuracy: accuracy
  });

  // ✅ THIS IS WHERE DATA IS SENT TO BACKEND
  sendEventsToServer();

  let skill = "Beginner";
  if (avgReaction < 300) skill = "Pro";
  else if (avgReaction < 500) skill = "Intermediate";

  document.getElementById("avgReaction").innerText =
    "Avg Reaction: " + Math.round(avgReaction) + " ms";

  document.getElementById("accuracy").innerText =
    "Accuracy: " + Math.round(accuracy) + "%";

  document.getElementById("skillClass").innerText =
    "Skill: " + skill;

  document.getElementById("summaryScreen").style.display = "block";
}

// ------------------ TIMER ------------------

function startTimer() {

  const timer = setInterval(() => {

    gameStateData.timeRemaining--;

    if (gameStateData.timeRemaining <= 0) {
      clearInterval(timer);
      endSession();
    }

  }, 1000);
}

// ------------------ GAME LOOP ------------------

function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameStateData.gameState === "RUNNING") {

    if (!activeTarget) {
      activeTarget = spawnTarget(canvas);
      gameStateData.totalClicks++;

      emitEvent("target_spawn");
    }

    else {

      const now = performance.now();

      if (now - activeTarget.spawnTime > targetVisibleTime) {

        emitEvent("target_miss");

        activeTarget = null;
      }
    }

    if (activeTarget) {
      drawTarget(activeTarget);
    }
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

// ------------------ START BUTTON ------------------

document.getElementById("startBtn").onclick = () => {

  gameStateData.gameState = "RUNNING";

  emitEvent("session_start");

  startTimer();
};
