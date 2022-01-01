self.addEventListener('message', (ev) => {
    const dataSent = ev.data;

    switch(dataSent) {
        case 'Current Date':
            self.postMessage(getcurrentDate());
            break;

        default:
            console.log('Invalid access!');
            self.postMessage('Closing web worker!');
            self.close();
    }
})

function getCorrectedHours(currentDate) {
    const hours = currentDate.getHours();

    if(hours < 10){
        return "0" + hours;
    } else {
        return hours;
    }     
}

function getCorrectedMinutes(currentDate) {
    const minutes = currentDate.getMinutes();

    if(minutes < 10){
        return "0" + minutes;
    } else {
        return minutes;
    }     
}

function getCorrectedSeconds(currentDate) {
    const seconds = currentDate.getSeconds();

    if(seconds < 10){
        return "0" + seconds;
    } else {
        return seconds;
    }     
}

function getCorrectedDay(currentDate) {
    const day = currentDate.getDate();

    if(day < 10){
        return "0" + day;
    } else {
        return day;
    }  
}

function getCorrectedMonth(currentDate) {
    let month = currentDate.getMonth();
    month += 1;

    if(month < 10){
        return "0" + month;
    } else {
        return month;
    }  
}

function getcurrentDate() {
    const currentDate = new Date();

    const currentTime =  getCorrectedHours(currentDate) +  ":" + getCorrectedMinutes(currentDate) + ":" + getCorrectedSeconds(currentDate);
    const currentDay = getCorrectedDay(currentDate) + "." + getCorrectedMonth(currentDate) + "." + currentDate.getFullYear();

    const result = currentTime + " " + currentDay;

    return result;
}
