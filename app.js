function generateStat(type, category, score, icon) {
  return `<div class="stat ${type}">
    <div class="stat-info">
      <img
        class="stat-icon"
        src="${icon}"
        alt="${type}-icon"
      />
      <p class="stat-name-${type}">${category}</p>
    </div>
    <div class="stat-ratings">
      <p class="stat-score">${score}</p>
      <span>/</span>
      <p class="stat-max">100</p>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  const resultScoreNumber = document.querySelector(".result-score-number");

  const achievedScore = 76;
  const interval = 10;
  const step = achievedScore / (2000 / interval);

  let currentCount = 0;

  function updateScore() {
    resultScoreNumber.textContent = Math.round(currentCount);

    if (currentCount >= achievedScore) {
      clearInterval(counterInterval);
    }
    const difference = achievedScore - currentCount;
    if (difference > 20) {
      currentCount += step;
    } else if (difference > 10) {
      currentCount += step / 2;
    } else if (difference > 5) {
      currentCount += step / 4;
    } else if (difference > 2) {
      currentCount += step / 8;
    } else {
      currentCount += step / 16;
    }
  }

  const counterInterval = setInterval(updateScore, interval);
});

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const stats = data.map((stat) =>
      generateStat(
        stat.category.toLowerCase(),
        stat.category,
        stat.score,
        stat.icon
      )
    );
    document.querySelector(".stats").innerHTML = stats.join("");
  });
