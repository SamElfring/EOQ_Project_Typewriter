const offset_multiplier = 27

var answerObj = document.getElementsByClassName('sentence-to-type')[0]
var offset = 0
var errCount = 0

function evaluateAnswerLength() {
    return answerObj.textContent.length
}

function evaluateInput(input) {
    answers = document.getElementsByClassName('sentence-to-type')
    answerObj = answers[answers.length-1]
    i = input.length-1

    correct = (input[i] == answerObj.textContent[i])
    if (!correct) errCount++
    result = correct ? "right" : "wrong"

    i += offset*offset_multiplier
    initial_content = answerObj.innerHTML
    new_content = `${initial_content.slice(0,i)}<span class='${result}'>${initial_content[i]}</span>${initial_content.slice(i+1)}`
    answerObj.innerHTML = new_content
    offset++

    calculateAccuracy(correct)
    effect(correct ? input.at(-1).toLowerCase() : "boom")
    if (errCount == 50) {
        effect("&&$%", volume=0.6)
    }
}

function evaluateClear() {
    offset = 0
}
