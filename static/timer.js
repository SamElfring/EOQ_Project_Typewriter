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
                    taEl.disabled = true
                    timerEl.innerText = "0.00";
                    alert("Time is up!");
                    clearInterval(interval);
                }
            }, 10);
        }
    });
}
