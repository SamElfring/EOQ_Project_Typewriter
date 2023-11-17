var input_len = 0
var last_val = ""

var ta = document.getElementsByClassName('typing-area')[0]

ta.addEventListener("input", function (e) {
    if (e.target.value.length < input_len) {
        e.target.value = last_val
    }
    else if (e.target.value.endsWith("\n")) {
        e.target.value = last_val
    }
    else if (e.target.value.length >= evaluateAnswerLength()-1) {
        evaluateInput(e.target.value)
        calculateWord()
        input_len = 0
        last_val = ""
        e.target.value = ""
        evaluateClear()
        showNewSentence()
    }
    else if (e.target.value.endsWith(" ")) {
        last_val = e.target.value
        input_len = e.target.value.length
        if (!e.target.value.endsWith("  ")) {
            calculateWord()
        }
        evaluateInput(e.target.value)
    }
    else {
        input_len = e.target.value.length
        last_val = e.target.value
        evaluateInput(e.target.value)
    }
})

async function showNewSentence() {
    const response = await fetch("/new-sentence");
    const sentenceJson = await response.json();
    
    const new_sentence = document.createElement("p");
    new_sentence.innerText = sentenceJson.sentence;
    new_sentence.classList.add("sentence-to-type");
    
    const sentenceContainer = document.getElementsByClassName("sentence-container")[0];
    sentenceContainer.appendChild(new_sentence);
}
