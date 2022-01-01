function restartGUI() {
    array.deactivateAllElements();
    enableButtons();
}

const defaultColor = "#FFA200"; // Applied when element of array isn't read by algorithm
const readColor = "#FF7B00"; // Applied when algorithm is reading value of element
const modifyColor = "#FFD000"; // Applied when algorithm is modyfing valye of element

const animantionSpeed = 2000; // It's only half of animation durtaion (given in ms)

// pomysl: Moze zrobic liste kolorow web workerem? wysylamy 2 kolory i liczbe odcieni a on zwroci nam list z kolorami!
const animationColors = ["#FF7B00", "#FF7F00", "#FF8200", "#FF8600", "#FF8900", "#FF8D00", 
                        "#FF9000", "#FF9400", "#FF9700", "#FF9B00", "#FF9E00", "#FFA200"]

// Variable that helps to stop merge sorting, without it the end sorting animation would play
let sortingStopped = false; 

/*============================== Sort Ending animation ==============================*/
async function sortEndingAnimation() {
    let pause = animantionSpeed / arraySize;

    for(let i = 0; i < arraySize; i++) {
        array.getElementAtPos(i).color = readColor;
        await sleep(pause);
    }

    for(let i = 0; i < animationColors.length; i++) {
        for(let j = 0; j < arraySize; j++) {
            array.getElementAtPos(j).color = animationColors[i];
        }

        await sleep(pause);
    }
}

/*============================== Sleep ==============================*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*============================== Bubble Sort ==============================*/
async function startBubbleSort() {
    let previousIndexes = [0, 1];
    let swapped = false;
    let applyColor = defaultColor;

    for(let i = 0; i < arraySize - 1; i++) {
        for(let j = 0; j < arraySize - i - 1; j++) {
            if(sorting) {
                if(array.getElementAtPos(j).value > array.getElementAtPos(j + 1).value) {
                    swapTwoElements(array.getElementAtPos(j), array.getElementAtPos(j + 1));
                    swapped = true;
                }

                if(swapped) {
                    applyColor = modifyColor;
                } else {
                    applyColor = readColor;
                }

                // Restoring default color to previous accessed array elements
                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
                array.getElementAtPos(previousIndexes[1]).color = defaultColor;

                // Applying color to accessed array elements
                array.getElementAtPos(j).color = applyColor;
                array.getElementAtPos(j + 1).color = applyColor;

                // Saving current indexes to restore values in next iteration
                previousIndexes = [j, j + 1];

                swapped = false;
                await sleep(sortingSpeed);
            } else {
                return;
            }
        }
    }

    isSorted = true;
    restartGUI();
}

/*============================== Selection Sort ==============================*/
async function startSelectionSort() {
    let previousIndexes = [0, 1];
    let minIndex = 0;

    for(let i = 0; i < arraySize - 1; i++) {
        minIndex = i;

        for(let j = i + 1; j < arraySize; j++) {
            if(sorting) {

                if (array.getElementAtPos(j).value < array.getElementAtPos(minIndex).value) {
                    minIndex = j;
                }

                // Showing how algorithm is iterating through array
                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
                array.getElementAtPos(previousIndexes[1]).color = defaultColor;

                array.getElementAtPos(j).color = readColor;
                array.getElementAtPos(minIndex).color = readColor;

                previousIndexes = [j, minIndex];

                await sleep(sortingSpeed);
            } else {
                return;
            }
        }

        // Showing when elements are swapped
        array.getElementAtPos(previousIndexes[0]).color = defaultColor;
        array.getElementAtPos(previousIndexes[1]).color = defaultColor;

        array.getElementAtPos(i).color = modifyColor;
        array.getElementAtPos(minIndex).color = modifyColor;

        previousIndexes = [i, minIndex];

        swapTwoElements(array.getElementAtPos(minIndex), array.getElementAtPos(i))

        await sleep(sortingSpeed);
    }

    isSorted = true;
    restartGUI();
}

/*============================== Insertion Sort ==============================*/
async function startInsertionSort() {
    let previousIndexes = [0, 1];
    let key = new Element(0, 0, 0, 0, 0, 0);

    for(let i = 1; i < arraySize; i++) {
        if(sorting) {
            array.getElementAtPos(previousIndexes[0]).color = defaultColor;
        
            array.getElementAtPos(i).color = readColor;
            previousIndexes[0] = i;
    
            key.setEqual(array.getElementAtPos(i));
    
            await sleep(sortingSpeed);
    
            let j = i - 1;
    
            while(j >= 0 && array.getElementAtPos(j).value > key.value) {        
                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
        
                array.getElementAtPos(j + 1).color = modifyColor;
                array.getElementAtPos(j).color = readColor;
        
                previousIndexes = [j + 1, j];
        
                array.getElementAtPos(j + 1).setEqual(array.getElementAtPos(j))
                j = j - 1;
                await sleep(sortingSpeed);
                
                //Have to break this loop, otherwise user after clicking "Stop Sorting" would have to wait until it ends.
                if(!sorting) {
                    break;
                }
            }
    
            array.getElementAtPos(previousIndexes[0]).color = defaultColor;
            array.getElementAtPos(previousIndexes[1]).color = defaultColor;
            
            array.getElementAtPos(j + 1).color = modifyColor;
            previousIndexes[0] = j + 1;

            array.getElementAtPos(j + 1).setEqual(key);
    
            await sleep(sortingSpeed);
        } else {
            array.getElementAtPos(previousIndexes[0]).color = defaultColor;
            return;
        }
    }

    isSorted = true;
    restartGUI();
}

/*============================== Shell Sort ==============================*/ 
async function startShellSort() {
    let previousIndexes = [0, 1];
    let tmp = new Element(0, 0, 0, 0, 0, 0);

    for(let gap = Math.floor(arraySize / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for(let i = gap; i < arraySize; i++) {
            if(sorting) {
                tmp.setEqual(array.getElementAtPos(i));

                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
    
                array.getElementAtPos(i).color = readColor;
                previousIndexes[0] = i;
    
                await sleep(sortingSpeed);
    
                let j;
                for(j = i; j >= gap && array.getElementAtPos(j - gap).value > tmp.value; j = j - gap) {
                    array.getElementAtPos(j).setEqual(array.getElementAtPos(j - gap));
    
                    array.getElementAtPos(previousIndexes[0]).color = defaultColor;
            
                    array.getElementAtPos(j).color = modifyColor;
                    array.getElementAtPos(j - gap).color = readColor;
            
                    previousIndexes = [j, j - gap];
    
                    await sleep(sortingSpeed);
    
                    //Have to break this loop, otherwise user after clicking "Stop Sorting" would have to wait until it ends.
                    if(!sorting) {
                        break;
                    }
                }
    
                array.getElementAtPos(j).setEqual(tmp);
    
                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
                array.getElementAtPos(previousIndexes[1]).color = defaultColor;
                
                array.getElementAtPos(j).color = modifyColor;
                previousIndexes[0] = j;
    
                await sleep(sortingSpeed);
            } else {
                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
                return;
            }
        }
    }

    isSorted = true;
    restartGUI();
}

/*============================== Quick Sort ==============================*/
async function startQuickSort() {
    await quickSortRecursive(array, 0, arraySize - 1);

    isSorted = true;
    restartGUI();
}

async function quickSortRecursive(array, start, end) {
    if(start >= end) {
        return;
    }

    let index = await partition(array, start, end);

    await quickSortRecursive(array, start, index -1);
    await quickSortRecursive(array, index + 1, end);
}

async function partition(array, start, end) {
    let previousIndexes = [0, 1];
    const pivotValue = array.getElementAtPos(end).value;
    
    previousIndexes[0] = end;
    array.getElementAtPos(end).color = readColor;

    await sleep(sortingSpeed);

    let pivotIndex = start;

    for(let i = start; i < end; i++) {
        if(sorting){
            if(array.getElementAtPos(i).value < pivotValue) {
                swapTwoElements(array.getElementAtPos(i), array.getElementAtPos(pivotIndex));
    
                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
                array.getElementAtPos(previousIndexes[1]).color = defaultColor;
    
                previousIndexes = [i, pivotIndex];
    
                array.getElementAtPos(i).color = modifyColor;
                array.getElementAtPos(pivotIndex).color = modifyColor;
    
                await sleep(sortingSpeed);
                pivotIndex++;
            }
        } else {
            return;
        }
        
    }

    swapTwoElements(array.getElementAtPos(pivotIndex), array.getElementAtPos(end));

    array.getElementAtPos(previousIndexes[0]).color = defaultColor;
    array.getElementAtPos(previousIndexes[1]).color = defaultColor;

    array.getElementAtPos(pivotIndex).color = modifyColor;
    array.getElementAtPos(end).color = modifyColor;

    await sleep(sortingSpeed);

    array.getElementAtPos(pivotIndex).color = defaultColor;
    array.getElementAtPos(end).color = defaultColor;

    return pivotIndex;
}

/*============================== Merge Sort ==============================*/
async function startMergeSort() {   
    let notSorted = await mergeSortRecursive(array, 0, arraySize - 1);
    
    console.log(notSorted)

    if(!sortingStopped) {
        isSorted = true;
        restartGUI();
    }
}

async function mergeSortRecursive(array, p, r) {
    if(p >= r) {
        return;
    }
    
    let q = Math.floor((p + r) / 2);
    if(sorting) {
        await mergeSortRecursive(array, p, q);
        await mergeSortRecursive(array, q + 1, r);
        await merge(array, p, q, r);
    } else {
        sortingStopped = true; // Sort Ending Animation can't be played!
        return;
    }
}

async function merge(array, p, q, r) {
    let previousIndexes = [0, 1];

    let n1 = Math.floor(q - p + 1);
    let n2 = Math.floor(r - q);

    let L = new ElementArray(n1, canvas.width, canvas.height, defaultColor);
    let M = new ElementArray(n2, canvas.width, canvas.height, defaultColor);

    for(let i = 0; i < n1; i++) {
        L.getElementAtPos(i).setEqual(array.getElementAtPos(p + i));

        array.getElementAtPos(previousIndexes[0]).color = defaultColor;
        previousIndexes[0] = p + i;
        array.getElementAtPos(p + i).color = readColor;
    
        await sleep(sortingSpeed);

        if(!sorting){
            array.getElementAtPos(previousIndexes[0]).color = defaultColor;
            return;
        }     
    }

    for(let j = 0; j < n2; j++) {
        M.getElementAtPos(j).setEqual(array.getElementAtPos(q + 1 + j));

        array.getElementAtPos(previousIndexes[0]).color = defaultColor;
        previousIndexes[0] = q + 1 + j;
        array.getElementAtPos(q + 1 + j).color = readColor;
        
        await sleep(sortingSpeed);

        if(!sorting){
            array.getElementAtPos(previousIndexes[0]).color = defaultColor;
            return;
        }     
    }

    /*
    Function can't be stopped after this moment, because values are saved to main array.
    Any interference would result in mess in main array, so function must reach it's end 
    before stopping merge sort.
    Of course there won't be any delay in sorting. The result will appear immediately.
    */

    let i = 0;
    let j = 0;
    let k = p;

    while(i < n1 && j < n2) {
        if (L.getElementAtPos(i).value <= M.getElementAtPos(j).value) {
            array.getElementAtPos(k).setEqual(L.getElementAtPos(i));
                
            i++
        } else {
            array.getElementAtPos(k).setEqual(M.getElementAtPos(j));
            j++;
        }
        k++;
    
        array.getElementAtPos(previousIndexes[0]).color = defaultColor;
        previousIndexes[0] = k;
        array.getElementAtPos(k).color = modifyColor;

        if(sorting){
            await sleep(sortingSpeed);
        }  
    }

    while(i < n1) {
        array.getElementAtPos(k).setEqual(L.getElementAtPos(i));

        array.getElementAtPos(previousIndexes[0]).color = defaultColor;
        previousIndexes[0] = k;
        array.getElementAtPos(k).color = modifyColor;
    
        i++;
        k++;

        if(sorting){
            await sleep(sortingSpeed);
        }  
    }

    while(i < n2) {
        array.getElementAtPos(k).setEqual(M.getElementAtPos(j));

        array.getElementAtPos(previousIndexes[0]).color = defaultColor;
        previousIndexes[0] = k;
        array.getElementAtPos(k).color = modifyColor;
    
        i++;
        k++;

        if(sorting){
            await sleep(sortingSpeed);
        }  
    }

    array.getElementAtPos(previousIndexes[0]).color = defaultColor;
}

/*============================== Bongo Sort ==============================*/
async function startBongoSort() {
    let previousIndexes = [0, 1];

    while(!await isArraySorted()) {
          
        for(let i = 0; i < arraySize; i++) {
            if(sorting) {
                let randomInt = Math.floor(Math.random() * (arraySize));

                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
                array.getElementAtPos(previousIndexes[1]).color = defaultColor;
    
                array.getElementAtPos(i).color = modifyColor;
                array.getElementAtPos(randomInt).color = modifyColor;
    
                previousIndexes = [i, randomInt];
    
                swapTwoElements(array.getElementAtPos(i), array.getElementAtPos(randomInt));
                await sleep(sortingSpeed);
            } else {
                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
                array.getElementAtPos(previousIndexes[1]).color = defaultColor;
                return;
            }
            
        }
    }

    isSorted = true;
    restartGUI();
}

async function isArraySorted() {
    let previousIndexes = [0, 1];
    let isSorted = true;

    for(let i = 0; i < arraySize - 1; i++) {
        if(sorting){
            if(array.getElementAtPos(i).value > array.getElementAtPos(i + 1).value) {
                array.getElementAtPos(previousIndexes[0]).color = defaultColor;
                array.getElementAtPos(previousIndexes[1]).color = defaultColor;

                array.getElementAtPos(i).color = readColor;
                array.getElementAtPos(i + 1).color = readColor;

                previousIndexes = [i, i + 1];

                await sleep(sorting);
                
                isSorted = false;
                break;
            }
        } else {
            array.getElementAtPos(previousIndexes[0]).color = defaultColor;
            array.getElementAtPos(previousIndexes[1]).color = defaultColor;

            return;
        }
    }

    return isSorted;
}