class ElementArray {
    #array;
    #size;
    #canvasWidth;
    #canvasHeight;
    #color;

    constructor(size, canvasWidth, canvasHeight, color) {
        this.#size = size;
        this.#canvasWidth = canvasWidth;
        this.#canvasHeight = canvasHeight;
        this.#color = color;

        this.#array = new Array(this.#size);

        this.#createArrayValues();
        this.randomizeArray();
    }

    updateArraySize(newSize) {
        this.#size = newSize;

        this.#array = new Array(this.#size);

        this.#createArrayValues();
        this.randomizeArray();
    }

    randomizeArray() {
        for(let i = 0; i < this.#size; i++) {
            let elementIndex = Math.floor(Math.random() * (this.#size));

            this.#swapTwoElements(this.#array[i], this.#array[elementIndex])
        }
    }

    drawElements(canvasContext2D) {
        canvasContext2D.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);

            for(let i = 0; i < this.#size; i++) {
                this.#array[i].drawElement(canvasContext2D);
            }
    }

    /*
    Assumption: When user will move mouse over the canvas, the function will check if mouse is over 
    visual representation of element. When it is the value of this element will be returned, otherwise
    the false will be returned. 
    */
    getValueOnPosition(posX, posY) {
        let value = false;

        for(let i = 0; i < this.#size; i++) {
            let element = this.#array[i];

            if(posX >= element.posX && posX <= (element.posX + element.width)) {
                if(posY >= element.posY && posY <= (element.posY + element.height)) {
                    value = element.value;
                }
            }       
        }

        return value;
    }

    getElementAtPos(index) {
        return this.#array[index];
    }

    deactivateAllElements() {
        for(let i = 0; i < this.#size; i++) {
            this.#array[i].color = "#FFA200";
        }
    }

    /*
    Function is creating sorted array of size equal to #size.
    Each array element has value this.#canvasHeight / this.#size higher than one before.
    The function is also applying spaces between each element (canvas drawing => more readable for end user).
    */
    #createArrayValues() {
        // How much value of each element will increase (equal steps => better look)
        const step = this.#canvasHeight / this.#size;
        // Initializing value of first element in array
        let elementValue = step;

        // Single element width
        let elementWidth = this.#canvasWidth / this.#size;

        // Space between each element in array (Drawing purposes only => more readable)
        // 10% of element width is changed to empty space (5% before element and 5% after element)
        const space = elementWidth * 0.1;
        elementWidth = elementWidth - space;

        // Variable that helps to maintain equal spaces between values
        let applySpace = space / 2.0;

        
        for(let i = 0; i < this.#size; i++) {
            // Element height has to be calcaute every time, because its scalling with elementValue
            const elementHeight = (canvas.height * elementValue) / this.#canvasHeight;

            // Position X of N-th element
            const posX = (i * elementWidth) + applySpace;

            applySpace += space;

            // Transforming position Y of N-th element (without it the array is drawn upside down)
            const posY = canvas.height - (canvas.height * elementValue / this.#canvasHeight)

            this.#array[i] = new Element(elementValue, this.#color, posX, posY, elementWidth , elementHeight);
            elementValue += step;
        }
        
    }

    /*
    Warning: Function designeted only to swap Element objects.
    */
    #swapTwoElements(firstElement, secondElement) {
        const tmpValue = firstElement.value;
        const tmpPosY = firstElement.posY;
        const tmpHeight = firstElement.height;

        firstElement.value = secondElement.value;
        firstElement.posY = secondElement.posY;
        firstElement.height = secondElement.height;

        secondElement.value = tmpValue;
        secondElement.posY = tmpPosY;
        secondElement.height = tmpHeight;
    }
}

/*
External function for swapping two elements -> necessary for sorting
*/
function swapTwoElements(firstElement, secondElement) {
    const tmpValue = firstElement.value;
    const tmpPosY = firstElement.posY;
    const tmpHeight = firstElement.height;

    firstElement.value = secondElement.value;
    firstElement.posY = secondElement.posY;
    firstElement.height = secondElement.height;

    secondElement.value = tmpValue;
    secondElement.posY = tmpPosY;
    secondElement.height = tmpHeight;
}