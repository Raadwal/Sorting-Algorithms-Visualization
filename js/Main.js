// Basic array information
let arraySize = 0;
let sortingSpeed = 0;
let chosenAlgorithm = "";
let sorting = false;
let isSorted = false;
let playingAnimation = false;

let isAnyInformationOpend = false;
let previouslyInformationAboutAlgorithm = null;

// Canvas to draw ElementArray
const canvas = document.getElementById("canvas");
const canvasContext2D = canvas.getContext('2d');

// Array of Elements
let array = new ElementArray(100, canvas.width, canvas.height, "#FFA200");

// Basic controls
const randomizeArrayButton = document.getElementById("randomizeArray");
const startSortingButton = document.getElementById("startSortingArray");
const stopSortingButton = document.getElementById("stopSortingArray");
const arraySizeSlider = document.getElementById("arraySize");
const sortingSpeedSlider = document.getElementById("sortingSpeed");
const algorithmDropDownMenu = document.getElementById("algorithmList");
const soundCheckBox = document.getElementById("sound");

// Output 
const chosenAlgorithmInfo = document.getElementById("chosenAlgorithm");
const elementValueInfo = document.getElementById("arrayElementValue");

// Initializing events listeners
document.addEventListener("DOMContentLoaded", init);

function init() {
    // Initializing events
    randomizeArrayButton.addEventListener("click", randomize);
    startSortingButton.addEventListener("click", startSorting);
    stopSortingButton.addEventListener("click", stopSorting);
    arraySizeSlider.addEventListener("click", updateArraySize);
    sortingSpeedSlider.addEventListener("click", updateSortingSpeed);
    soundCheckBox.addEventListener("click", updateSound);
    canvas.addEventListener("mousemove", updateElementValue);

    // Initializing tutorial
    document.getElementById("closeTutorialWindow").addEventListener("click", () => {
        document.getElementById("tutorialWindow").style.display = "none";
    });

    // Implemented algorithms

    // Bubble Sort
    document.getElementById("bubbleSort").addEventListener("click", () => {
        updateChosenAlgorithmInfo("Bubble Sort");
    });

    document.getElementById("bubbleSortInfo").addEventListener("click", () => {
        if(isAnyInformationOpend === true) {
            previouslyInformationAboutAlgorithm.style.display = "none";
        }
        
        previouslyInformationAboutAlgorithm = document.getElementById("bubbleSortInformation");
        previouslyInformationAboutAlgorithm.style.display = "block";

        isAnyInformationOpend = true;
    });
    document.getElementById("closeBubbleSortInformation").addEventListener("click", () => {
        document.getElementById("bubbleSortInformation").style.display = "none";

        isAnyInformationOpend = false;
    });

    // Selection Sort
    document.getElementById("selectionSort").addEventListener("click", () => {
        updateChosenAlgorithmInfo("Selection Sort");
    });

    document.getElementById("selectionSortInfo").addEventListener("click", () => {
        if(isAnyInformationOpend === true) {
            previouslyInformationAboutAlgorithm.style.display = "none";
        }
        previouslyInformationAboutAlgorithm = document.getElementById("selectionSortInformation");
        previouslyInformationAboutAlgorithm.style.display = "block";

        isAnyInformationOpend = true;
    });
    document.getElementById("closeSelectionSortInformation").addEventListener("click", () => {
        document.getElementById("selectionSortInformation").style.display = "none";
        
        isAnyInformationOpend = false;
    });

    // Insertion Sort
    document.getElementById("insertionSort").addEventListener("click", () => {
        updateChosenAlgorithmInfo("Insertion Sort")
    });

    document.getElementById("insertionSortInfo").addEventListener("click", () => {
        if(isAnyInformationOpend === true) {
            previouslyInformationAboutAlgorithm.style.display = "none";
        }

        previouslyInformationAboutAlgorithm = document.getElementById("insertionSortInformation");
        previouslyInformationAboutAlgorithm.style.display = "block";

        isAnyInformationOpend = true;
    });
    document.getElementById("closeInsertionSortInformation").addEventListener("click", () => {
        document.getElementById("insertionSortInformation").style.display = "none";
        
        isAnyInformationOpend = false;
    });

    // Shell Sort
    document.getElementById("shellSort").addEventListener("click", () => {
        updateChosenAlgorithmInfo("Shell Sort");
    });

    document.getElementById("shellSortInfo").addEventListener("click", () => {
        if(isAnyInformationOpend === true) {
            previouslyInformationAboutAlgorithm.style.display = "none";
        }

        previouslyInformationAboutAlgorithm = document.getElementById("shellSortInformation");
        previouslyInformationAboutAlgorithm.style.display = "block";

        isAnyInformationOpend = true;
    });
    document.getElementById("closeShellSortInformation").addEventListener("click", () => {
        document.getElementById("shellSortInformation").style.display = "none";
        
        isAnyInformationOpend = false;
    });

    // Quick Sort
    document.getElementById("quickSort").addEventListener("click", () => {
        updateChosenAlgorithmInfo("Quick Sort");
    });

    document.getElementById("quickSortInfo").addEventListener("click", () => {
        if(isAnyInformationOpend === true) {
            previouslyInformationAboutAlgorithm.style.display = "none";
        }

        previouslyInformationAboutAlgorithm = document.getElementById("quickSortInformation");
        previouslyInformationAboutAlgorithm.style.display = "block";

        isAnyInformationOpend = true;
    });
    document.getElementById("closeQuickSortInformation").addEventListener("click", () => {
        document.getElementById("quickSortInformation").style.display = "none";
        
        isAnyInformationOpend = false;
    });

    // Merge Sort
    document.getElementById("mergeSort").addEventListener("click", () => {
        updateChosenAlgorithmInfo("Merge Sort");
    });

    document.getElementById("mergeSortInfo").addEventListener("click", () => {
        if(isAnyInformationOpend === true) {
            previouslyInformationAboutAlgorithm.style.display = "none";
        }

        previouslyInformationAboutAlgorithm = document.getElementById("mergeSortInformation");
        previouslyInformationAboutAlgorithm.style.display = "block";

        isAnyInformationOpend = true;
    });
    document.getElementById("closeMergeSortInformation").addEventListener("click", () => {
        document.getElementById("mergeSortInformation").style.display = "none";
        
        isAnyInformationOpend = false;
    });

    // Bogo Sort
    document.getElementById("bongoSort").addEventListener("click", () => {
        updateChosenAlgorithmInfo("Bogo Sort");
    });

    document.getElementById("bongoSortInfo").addEventListener("click", () => {
        if(isAnyInformationOpend === true) {
            previouslyInformationAboutAlgorithm.style.display = "none";
        }

        previouslyInformationAboutAlgorithm = document.getElementById("bongoSortInformation");
        previouslyInformationAboutAlgorithm.style.display = "block";

        isAnyInformationOpend = true;
    });
    document.getElementById("closeBongoSortInformation").addEventListener("click", () => {
        document.getElementById("bongoSortInformation").style.display = "none";
        
        isAnyInformationOpend = false;
    });

    // Stop button is disabled as default (nothing to stop)
    enableButtons();

    // Getting default array size and sorting speed
    updateArraySize();
    updateSortingSpeed();

    // Inserting info about default sorting algorithm
    updateChosenAlgorithmInfo("Bubble Sort");
}

// Events listeners functions
function randomize() {
    isSorted = false;
    playingAnimation = false;
    array.randomizeArray();
    array.deactivateAllElements();
}

function startSorting() {
    disableButtons();
    
    switch(chosenAlgorithm) {
        case "Selection Sort":
            startSelectionSort();
            break;
        case "Bubble Sort":
            startBubbleSort();
            break;
        case "Insertion Sort":
            startInsertionSort();
            break;
        case "Shell Sort":
            startShellSort();
            break;
        case "Quick Sort":
            startQuickSort();
            break;
        case "Merge Sort":
            startMergeSort();
            break;
        case "Bogo Sort":
            startBongoSort();
            break;
        default:
            console.log("Error: Unknown Algorithm!");
    }
}

function stopSorting() {
    array.deactivateAllElements();
    enableButtons();
}

function updateArraySize() {
    arraySize = arraySizeSlider.value;
    array.updateArraySize(arraySize);
    array.drawElements(canvasContext2D);
}

function updateSortingSpeed() {
    sortingSpeed = sortingSpeedSlider.value;
}

function updateSound() {
    alert("Sound!");
}

function updateElementValue(event) {
    const rectangle = canvas.getBoundingClientRect();
    const positionOnCanvasX = event.pageX - rectangle.x;
    const positionOnCanvasY = event.pageY - rectangle.y;

    // Normalizing positiong (canvas size = 1920x1080), but its scalling, so position need to be normalize
    let normPosX = (positionOnCanvasX * canvas.width) / rectangle.width;
    let normPosY = (positionOnCanvasY * canvas.height) / rectangle.height;
    const elementValue = array.getValueOnPosition(normPosX, normPosY);

    if(elementValue != false) {
        elementValueInfo.innerHTML = "Element Value: " + elementValue;
    } else {
        elementValueInfo.innerHTML = "Element Value: None";
    }
}

// Helper function
function disableButtons() {
    startSortingButton.disabled = true;
    randomizeArrayButton.disabled = true;
    arraySizeSlider.disabled = true;
    sortingSpeedSlider.disabled = true;

    stopSortingButton.disabled = false;

    sorting = true;
}

function enableButtons() {
    startSortingButton.disabled = false;
    randomizeArrayButton.disabled = false;
    arraySizeSlider.disabled = false;
    sortingSpeedSlider.disabled = false;

    stopSortingButton.disabled = true;

    sorting = false;
}

function updateChosenAlgorithmInfo(algorithmName) {
    // Can't change current algorithm while sorting visualization is working
    if(!sorting) {
        chosenAlgorithm = algorithmName;
        chosenAlgorithmInfo.innerHTML = "Algorithm: " + chosenAlgorithm;
    }
}

function drawOnCanvas() {
    array.drawElements(canvasContext2D);
}

// Checking if array is sorted to play end animation!
function checkIfSorted() {
    if(isSorted && !playingAnimation) {
        sortEndingAnimation();
        playingAnimation = true;
    }
}

setInterval(drawOnCanvas, 10);
setInterval(checkIfSorted, 10);