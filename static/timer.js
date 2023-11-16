const taEl = document.getElementsByClassName("typing-area")[0];
const timerEl = document.getElementById("timer-span");

let time = 60;
let interval = null;

window.onload = () => {
    taEl.addEventListener("input", () => {
        if (interval == null) {
            interval = setInterval(() => {
                time -= 0.01;
                timerEl.innerText = time.toFixed(2);

                if (time <= 0) {
                    stopTimer();
                }
            }, 10);
        }
    });
}

function stopTimer() {
    clearInterval(interval);
    taEl.disabled = true
    timerEl.innerText = "0.00";

    accuracy = document.getElementsByClassName("accuracy-value")[0].innerHTML;
    wpm = document.getElementsByClassName("wpm-value")[0].innerHTML;
    
    document.getElementById("accuracy-popup").innerHTML = accuracy;
    document.getElementById("wpm-popup").innerHTML = wpm;
    document.getElementById("accuracy-input").value = accuracy;
    document.getElementById("wpm-input").value = wpm;

    const leaderboardPopup = document.getElementsByClassName("leaderboard-popup-container")[0];
    leaderboardPopup.style.display = "flex";
}
