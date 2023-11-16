var input_len = 0
var last_val = ""

ta = document.getElementsByClassName('typing-area')[0]

ta.addEventListener("input", function (e) {
    console.log(last_val.length, e.target.value.length)
    if (e.target.value.length < input_len) {
        e.target.value = last_val
    }
    else if (e.target.value.endsWith(" ")) {
        last_val = e.target.value
        input_len = e.target.value.length
    }
    else if (e.target.value.endsWith(".")) {
        input_len = 0
        last_val = ""
        e.target.value = ""
    }
    else {
        input_len = e.target.value.length
        last_val = e.target.value
        calculateAccuracy(e.target.value)
    }
})
