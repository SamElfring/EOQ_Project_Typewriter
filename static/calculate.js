var accuracy_counter = document.getElementsByClassName('accuracy-value')[0]
var wpm_counter = document.getElementsByClassName('wpm-value')[0]

var evaluations = []
var word_count = 0

function calculateWord() {
    word_count += 1
    wpm_counter.textContent = word_count.toString()
}

function calculateAccuracy(correct) {
    evaluations.push(correct)
    correct = evaluations.filter(x => x===true).length
    total = evaluations.length
    percentage = Math.round(correct / total * 100)

    accuracy_counter.textContent = percentage.toString()
}