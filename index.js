let question = document.querySelector(".question")
let answers = document.querySelectorAll(".answer")
let container_h3 = document.querySelector(".container-h3")
let btn_start = document.querySelector(".btn-start")

let main_container =  document.querySelector('.main')
let start_container =  document.querySelector('.start')

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



btn_start.addEventListener("click", () => {
    
    main_container.style.display = 'flex'
    start_container.style.display = 'none'

    

    current_question = new Question()
    current_question.show()

    setTimeout(() => {
        container_h3.innerHTML = `Ви дали ${total_correct_answers} правильних відповідей.<br>
        Це ${roundNum(total_correct_answers * 100 / total_answers_given)}%`
        start_container.style.display = 'flex'
        main_container.style.display = 'none'
        container_h3.style.fontSize = '24px'
    }, [10000])
})

for(let i =0; i<answers.length; i++) {
    answers[i].addEventListener("click", () => {
        if(roundNum(current_question.correct_answer) == answers[i].innerHTML) {
            total_correct_answers += 1
            answers[i].style.background = '#21bd06'
            anime({
                targets: answers[i],
                delay: 100,
                duration: 500,
                background: '#fff',
                easing: 'linear'
            })
        } else {
            answers[i].style.background = '#c20e23'
            anime({
                targets: answers[i],
                delay: 100,
                duration: 500,
                background: '#fff',
                easing: 'linear'
            })
        }
        total_answers_given += 1

        current_question = new Question()
        current_question.show()
    })
}
