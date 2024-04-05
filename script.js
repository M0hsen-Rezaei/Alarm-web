// definition of variables
const timeBox = document.querySelector(".time-box")
const select = document.querySelectorAll(".select")
const selection = document.querySelector(".selection")
const btn = document.querySelector(".btn-alarm")
const img = document.querySelector("img")
const remainingTime = document.querySelector(".remainingTime")
const remaining = document.querySelector(".remaining")
var timealarm;
const audio = new Audio("./file/alarm.mp3");
audio.loop;
const containerSelects = document.querySelector(".container-selects")
var allertState = "NoSet"

//create option Hours & Minute
for(i=0 ; i<24 ; i++){
    i = i<10 ? "0" + i : i
    let optionHours = document.createElement("option")
    optionHours.value = i
    optionHours.innerText = i
    select[0].append(optionHours)
}
for(i=0 ; i<60 ; i++){
    i = i<10 ? "0" + i : i
    let optionMinute = document.createElement("option")
    optionMinute.value = i
    optionMinute.innerText = i
    select[1].append(optionMinute)
}

//create clock 
setInterval(() => {
    let data = new Date();
    let h = data.getHours()
    let m = data.getMinutes()
    let s = data.getSeconds()
    h = h<10 ? "0" + h : h
    m = m<10 ? "0" + m : m
    s = s<10 ? "0" + s : s
    timeBox.innerHTML = `${h}:${m}:${s}`;
    if(`${h}:${m}` == timealarm){
        audio.play();
        img.classList.add("transformClock")
        remaining.style.backgroundColor = "red";
    }
}, 1000);
 


//set time
btn.addEventListener("click" , ()=>{
    let h = select[0].value
    let m = select[1].value
    if(h == "Hours" || m== "Minute"){
        alert("Please specify the correct time")
    }else{
        timealarm = `${h}:${m}`
        var myinterval = setInterval(() => {
            let reamingH = 0
            let reamingM = 0
            let date = new Date()
            let nowH = date.getHours()
            let nowM = date.getMinutes()
            if(nowH < h){
                reamingH = h - nowH
            }else if(nowH > h){
                reamingH = Number(24-nowH)+Number(h)
            }
            if(nowM < m){
                reamingM = m - nowM
            }else if(nowM > m){
                reamingM = Number(60-nowM)+Number(m)
                reamingH = reamingH == 0 ? 23 : reamingH--
            }
            remainingTime.innerText = `${reamingH}:${reamingM}`
            if(btn.innerText == "set time"){clearInterval(myinterval)}
        }, 1000);
        
        checkState(allertState)
    }
})


//chack statse allert (NoSet | YesSet)
const checkState= function(state){
    if(state == "NoSet"){
        containerSelects.classList.add("disability")
        btn.innerText = "clear time"
        allertState = "YesSet"
    }else{
        containerSelects.classList.remove("disability")
        allertState = "NoSet"
        btn.innerText = "set time"
        timealarm = ""
        audio.pause()
        remaining.style.backgroundColor = "#c9c9c9"
        img.classList.remove("transformClock")
    }
}

