var input_len = 0
var last_val = ""

var ta = document.getElementsByClassName('typing-area')[0]

ta.addEventListener("input", function (e) {
    if (e.target.value.length < input_len) {
        e.target.value = last_val
    }
    else if (e.target.value.length > 1 && e.target.value.endsWith("  ")) {
        e.target.value = last_val
    }
    else if (e.target.value.endsWith(" ")) {
        last_val = e.target.value
        input_len = e.target.value.length
        calculateWord()
        evaluateInput(e.target.value)
    }
    else if (e.target.value.endsWith(".")) {
        input_len = 0
        last_val = ""
        e.target.value = ""
        calculateWord()
        evaluateClear()
    }
    else {
        input_len = e.target.value.length
        last_val = e.target.value
        evaluateInput(e.target.value)
    }
})
