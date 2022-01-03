//Selecting Elements From the DOM
const btn = document.querySelector(".btn")
const area = document.querySelector("#area")
const score = document.getElementById("score")
const start = document.getElementById("start")

//Objects
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
let player = {
    play: false,
    speed: 5,
    score: 0
}
//DOM
document.addEventListener("DOMContentLoaded", () => {
    start.innerHTML = `This is a bird game da Boi <br>
    Gravity will be constantly pulling you  <br> 
    Avoid Obstacles to score more! <br>
    Click on the Button Below to Start the Game <br>
    Navigate using the Arrow Keys ` 

})
//Event Listners
btn.addEventListener("click",clicked)
document.addEventListener("keydown",on)
document.addEventListener("keyup",off)



function clicked(){
    area.innerHTML = ""
    player.score = ""
    start.classList.add("hide")
    btn.setAttribute("class","hide")
    //Rendering Elements
    let bird = document.createElement("div")
    bird.setAttribute("class","bird")
    area.appendChild(bird)
    //Obstacles
    createPipe(top,"top")
    createPipe(top,"btm")
    player.play = true;
    window.requestAnimationFrame(play)
}
function play(){
    //Selecting Elements
    let bird = document.querySelector(".bird")
    let top = document.querySelectorAll(".top")
    let btm = document.querySelectorAll(".btm")
    player.y = bird.offsetTop
    player.x = bird.offsetLeft
    if(player.play){
        player.score++
        movePipe(bird,top)
        movePipe(bird,btm)
        if(keys.ArrowUp && player.y > 75){player.y -= player.speed}
        if(keys.ArrowDown){player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed}
        if(keys.ArrowRight){player.x += player.speed}
        player.y += 3
        bird.style.top = player.y + "px"
        bird.style.left = player.x + "px"
        score.innerHTML = `Score:${player.score}`
    }
    
    window.requestAnimationFrame(play)
}
function ifCollide(ele,ene){
    let rA = ele.getBoundingClientRect()
    let rB = ene.getBoundingClientRect()
    return !(
        (rA.bottom < rB.top) ||
        (rA.top > rB.bottom) ||
        (rA.left > rB.right) ||
        (rB.left > rA.right)
    )
}
function endGame(){
    player.play = false
    start.classList.remove("hide")
    start.innerHTML = `Game Over <br>
    Your Score is ${player.score}`
    start.style.fontSize = "4em";
    btn.classList.remove("hide")
}
function createPipe(x,att){
    for(let i=0; i < 5; i++){
        x = document.createElement("div")
        x.setAttribute("class",att)
        if(i > 0){
            let temp = 400 + (i * 300)
            x.style.left = temp + "px"
        }
        area.appendChild(x)
    }
}
function movePipe(ele,ene){
    ene.forEach(element => {
        if(ifCollide(ele,element)){
            console.log("hit")
            endGame()
        }
        let leftu = element.offsetLeft;
        leftu -= (player.speed + 2)
        if(leftu < -50){
            leftu = 1400
            let topu = (Math.floor(Math.random()*70) * -1) + 40
            if(element.classList.contains("top")){
                element.style.top = topu + "px"        
            }else{
                element.style.top = (400 + topu) + "px"
            }             
        }
        element.style.left = leftu + "px"        
    });
}
    
//Keys Function
function on(e){
    let key = e.key
    keys[key] = true
}
function off(e){
    let key = e.key
    keys[key] = false
}