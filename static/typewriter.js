var input_len = 0
var last_val = ""

var ta = document.getElementsByClassName('typing-area')[0]

ta.addEventListener("input", function (e) {
    effectTyping()
    if (e.target.value.length < input_len || e.target.value.endsWith("\n")) {
        e.target.value = last_val
    }
    else if (e.target.value.length >= evaluateAnswerLength()) {
        evaluateInput(e.target.value)
        calculateWord()
        input_len = 0
        last_val = ""
        e.target.value = ""
        evaluateClear()
        showNewSentence()
    }
    else {
        input_len = e.target.value.length
        last_val = e.target.value
        evaluateInput(e.target.value)
        if (e.target.value.endsWith(" ") && !e.target.value.endsWith("  ")) {
            calculateWord()
        }
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
