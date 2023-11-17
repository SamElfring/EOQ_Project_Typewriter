function effect(char) {
    if (!" \n".includes(char)) {
        var src = new Audio(`static/media/${char}.wav`)
        src.play()
    }
}
