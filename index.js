let question = document.querySelector(".question")
let answers = document.querySelectorAll(".answer")
let container_h3 = document.querySelector(".container-h3")

let main_container =  document.querySelector('.container-question')

let console_html = document.querySelector(".consol")
let title = document.querySelector(".title")
let settingsBtn = document.querySelector(".settings-btn")
let btn1 = document.querySelector(".btn1")
let btn2 = document.querySelector(".btn2")
let btn3 = document.querySelector(".btn3")
let time
let timeout

function timerfn() {
    time -= 1
    console_html.innerHTML = `Час: ${time} секунд`
    timer = setTimeout(timerfn, 1000)
}

settingsBtn.removeEventListener('click', click_btn1)
settingsBtn.addEventListener("click", click_btn1)

btn1.removeEventListener('click', click_btn)
btn1.addEventListener("click", () => {click_btn(120)})

btn2.removeEventListener('click', click_btn)
btn2.addEventListener("click", () => {click_btn(60)})

btn3.removeEventListener('click', click_btn)
btn3.addEventListener("click", () => {click_btn(30)})

function click_btn1() {
    settingsBtn.style.border = 'transparent 2px solid'
    settingsBtn.style.color = 'transparent' 
    console_html.innerHTML = 'Налаштування'
    title.style.display = 'block'
    anime({
        targets: '.title',
        delay: 0,
        duration: 1000,
        color: '#13A10E',
    })
    title.innerHTML = 'Виберіть час:'
    settingsBtn.style.display = 'none'
    anime({
        targets: ['.btn1', '.btn2', '.btn3'],
        delay: 0, 
        duration: 1000,
        border: '2px solid rgb(255, 255, 255)',
        color: '#13A10E',
        easing: 'linear'
    })
    btn1.style.display = 'block'
    btn2.style.display = 'block'
    btn3.style.display = 'block'   

}
function click_btn(input_time=30) {
    

    time = input_time

    console_html.innerHTML = 'Запуск...'
    title.style.display = 'none'
    settingsBtn.innerHTML = 'Запуск'
    settingsBtn.style.paddingLeft = '50px'
    settingsBtn.style.paddingRight  = '50px'
    settingsBtn.style.display = 'block'
    anime({
        targets: '.settings-btn',
        delay: 0, 
        duration: 1000,
        border: '2px solid rgb(255, 255, 255)',
        color: '#13A10E',
        easing: 'linear'
    })
    btn1.style.display = 'none'
    btn2.style.display = 'none'
    btn3.style.display = 'none'

    settingsBtn.addEventListener("click", click_btn3)
}

function click_btn3() {
        question.style.display = 'block'
        console_html.innerHTML = `Час: ${time} секунд`
        document.querySelector('.container-main').style.display = 'none'
        main_container.style.display = 'flex'

        total_answers_given = 0
        total_correct_answers = 0

        current_question = new Question()
        current_question.show()

        timer = setTimeout(timerfn, 1000)

        setTimeout(() => {
            settingsBtn.style.border = 'transparent 2px solid'
            settingsBtn.style.color = 'transparent'

            btn1.style.border = 'transparent 2px solid'
            btn1.style.color = 'transparent'
            btn2.style.border = 'transparent 2px solid'
            btn2.style.color = 'transparent'
            btn3.style.border = 'transparent 2px solid'
            btn3.style.color = 'transparent'

            clearTimeout(timer)
            console_html.innerHTML = `Ви дали ${total_correct_answers} правильних відповідей.<br>
                Це ${roundNum(total_correct_answers * 100 / total_answers_given)}%`

            question.style.display = 'none'
            main_container.style.display = 'none'
            document.querySelector('.container-main').style.display = 'flex'
            settingsBtn.style.display = 'block'
            settingsBtn.innerHTML = 'Заново' 
            
            title.style.display = 'none'
            btn1.style.display = 'none'
            btn2.style.display = 'none'
            btn3.style.display = 'none'

            anime({
                targets: '.settings-btn',
                delay: 0, 
                duration: 1000,
                border: '2px solid rgb(255, 255, 255)',
                color: '#13A10E',
                easing: 'linear'
            })

            settingsBtn.removeEventListener('click', click_btn3)
            settingsBtn.addEventListener("click", click_btn1)
        }, (time * 1000))
    }

function randint(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  
    let j = Math.floor(Math.random() * (i + 1));  
    [array[i], array[j]] = [array[j], array[i]]
  } 
  return array
}

let sings = ['+', '-', '/', '*']

function getSing() {
    return sings[randint(0, 3)]
}

function roundNum(num) {
    if(num%1 !== 0) {
        return num.toFixed(2)
    }
    return num
}

class Question {
    constructor() {
        let num1 = randint(1, 30)
        let num2 = randint(1, 30)
        let sing = getSing()

        this.question = `${num1} ${sing} ${num2}`

        if(sing == '+') {
            this.correct_answer = num1 + num2
        } else if(sing == '-') {
            this.correct_answer = num1 - num2
        } else if(sing == '/') {
            this.correct_answer = num1 / num2
        } else if(sing == '*') {
            this.correct_answer = num1 * num2
        } 
        this.answers = [
            roundNum(randint(this.correct_answer - 15, this.correct_answer - 1)),
            roundNum(randint(this.correct_answer - 15, this.correct_answer - 1)),
            roundNum(randint(this.correct_answer + 1, this.correct_answer + 15)),
            roundNum(randint(this.correct_answer + 1, this.correct_answer + 15)),
            roundNum(this.correct_answer),
        ]
        shuffle(this.answers)
    }

    show() {
        question.innerHTML = this.question

        for(let i=0; i< this.answers.length; i++) {
            answers[i].innerHTML = this.answers[i]
        }
    }
}

let total_answers_given = 0
let total_correct_answers = 0

let current_question




for(let i =0; i<answers.length; i++) {
    answers[i].addEventListener("click", () => {
        if(roundNum(current_question.correct_answer) == answers[i].innerHTML) {
            total_correct_answers += 1
            answers[i].style.background = '#21bd06'
            anime({
                targets: answers[i],
                delay: 100,
                duration: 500,
                background: '#000000',
                easing: 'linear'
            })
        } else {
            answers[i].style.background = '#c20e23'
            anime({
                targets: answers[i],
                delay: 100,
                duration: 500,
                background: '#000000',
                easing: 'linear'
            })
        }
        total_answers_given += 1

        current_question = new Question()
        current_question.show()
    })
}


