function effect(char, volume=1.0) {
    if (!"., \n".includes(char)) {
        var src = new Audio(`static/media/${char}.wav`)
        src.volume = volume
        src.play()
    }
}
