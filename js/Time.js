const worker = new Worker('js/TimeWorker.js');
worker.addEventListener('message', workerMessaged);
worker.addEventListener('error', workerError);

let timeOutput = document.getElementById('time');

function workerMessaged(event) {
    let data = event.data;
    timeOutput.innerHTML = data;
}

function workerError(error) {
    console.log(error.message, error.filename);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startTimer() {
    while(true) {
        worker.postMessage('Current Date');
        await sleep(1000);
    }
}

startTimer();
