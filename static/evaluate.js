const offset_multiplier = 27
var offset = 0
var errors = []

function evaluateInput(input) {
    answerObj = document.getElementsByClassName('sentence-to-type')[0]
    
    i = input.length-1

    correct = (input[i] == answerObj.textContent[i])
    result = correct ? "right" : "wrong"

    i += offset
    initial_content = answerObj.innerHTML
    new_content = `${initial_content.slice(0,i)}<span class='${result}'>${initial_content[i]}</span>${initial_content.slice(i+1)}`
    answerObj.setHTML(new_content)
    offset += offset_multiplier

    calculateAccuracy(correct)
}

function evaluateClear() {
    offset = 0
    errors = []
}
