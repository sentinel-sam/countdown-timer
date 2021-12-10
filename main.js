//link up both libraries
dayjs.extend(dayjs_plugin_duration);

let countdown = document.getElementById("countdown");
let dateInput = document.getElementById("dateInput");
let button = document.querySelector('.stop-button');

dateInput.addEventListener('input', event => {
    let dateInputValue = event.target.value;
    console.log("DATEVALUE:::", dateInputValue);

    activateCountdown(countdown, dateInputValue);
    dateInput.disabled = true;
    button.innerText = "Stop Countdown";
    button.disabled = false;
});

function activateCountdown(element, dateString){
    const targetDate = dayjs(dateString);
    console.log("TARGET DATE:::", targetDate);

    let setInt = setInterval(() => {
        const now = dayjs();
        // console.log("NOW::::", now);//current date and always changing

        const duration = dayjs.duration(targetDate.diff(now));
        console.log("DURATION:::", duration);

        if(duration.asMilliseconds() <= 0){
            element.querySelector(".until__numeric--seconds").textContent = "00";
            element.querySelector(".until__numeric--minutes").textContent = "00";
            element.querySelector(".until__numeric--hours").textContent = "00";
            element.querySelector(".until__numeric--days").textContent = "00";
            element.querySelector(".until__event").textContent = "";
            clearInterval(setInt);
            return;
        }

        element.querySelector(".until__numeric--seconds").textContent = duration.seconds().toString().padStart(2, "0");
        element.querySelector(".until__numeric--minutes").textContent = duration.minutes().toString().padStart(2, "0");
        element.querySelector(".until__numeric--hours").textContent = duration.hours().toString().padStart(2, "0");
        element.querySelector(".until__numeric--days").textContent = duration.asDays().toFixed(0).toString().padStart(2, "0");
    }, 1000);

    element.querySelector(".until__event").textContent = `Until ${targetDate.format("D MMMM YYYYY") }`;
    button.addEventListener('click', event => {
            clearInterval(setInt);
            dateInput.disabled = false;
            event.target.innerText = "Choose Date Again"
            event.target.disabled = true;
    });
}

//clean code
//style input tag and button with css
//check out neumorphism etc

//count down the element to this day
//add input in form of calender, push the selected date to the activate countdown
//stop/reset countdown, pause countdown are all functions
//year, month, weeks, days, hours, minutes, seconds
//min value on the input tag