class Element {
    #value;
    #color;
    #width;
    #height;
    #posX;
    #posY;

    constructor(value, color, posX, posY, width, height) {
        this.#value = value;
        this.#color = color;
        this.#posX = posX;
        this.#posY = posY;
        this.#width = width;
        this.#height = height;
    }

    get value() {
        return this.#value;
    }

    set value(newValue) {
        this.#value = newValue;
    }

    get color() {
        return this.#color;
    }

    set color(newColor) {
        this.#color = newColor;
    }

    get width() {
        return this.#width;
    }

    set width(newWidth) {
        this.#width = newWidth;
    }

    get height() {
        return this.#height;
    }

    set height(newHeight) {
        this.#height = newHeight;
    }

    get posX() {
        return this.#posX;
    }

    set posX(newPosX) {
        this.#posX = newPosX;
    }

    get posY() {
        return this.#posY;
    }

    set posY(newPosY) {
        this.#posY = newPosY;
    }
    
    setValues(value, color, posX, posY, width, height) {
        this.#value = value;
        this.#color = color;
        this.#posX = posX;
        this.#posY = posY;
        this.#width = width;
        this.#height = height;
    }

    // Works as = sign
    setEqual(otherElement) {
        this.#value = otherElement.value;
        this.#posY = otherElement.posY;
        this.#height = otherElement.height;
    }

    // Work as = sign, but copy all elements, not only essential -> used in Merge Sort
    copy(otherElement) {
        this.#value = otherElement.value;
        this.#color = otherElement.color;
        this.#posX = otherElement.posX;
        this.#posY = otherElement.posY;
        this.#width = otherElement.width;
        this.#height = otherElement.height;
    }

    drawElement(canvasContext2D) {
        canvasContext2D.fillStyle = this.#color;
        canvasContext2D.fillRect(this.#posX, this.#posY, this.#width, this.#height); 
    }
}