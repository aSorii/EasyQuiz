
/**
 * TO-DO LIST
 * TODO Fix reset scroll when refresh browser
 * TODO Create Final screen
 * TODO Create About screen
 */

let root = document.documentElement;



/*
 List of questions
 */
const questions = [
    {
        screen:'section-q1',
        color:'#3bceac',
        question: 'What fruit is the Apple company logo ?',
        answers: ['Apple', 'Orange', 'Pineapple', 'Raspberry'],
        correct: 'Apple'
    },
    {
        screen:'section-q2',
        color: '#ee4266',
        question: 'Who is the creator of the popular Ultima video games ? ',
        answers: ['Yokishira', 'Richard Garriott', 'John Carmack', 'Enric Álvarez'],
        correct: 'Richard Garriott'
    },
    {
        screen:'section-q3',
        color: '#ffd23f',
        question: 'What was the name of the Apple console ?',
        answers: ['Apple Station', 'Apple Pippin', 'iGames', '3DO'],
        correct: 'Apple Pippin'
    },
    {
        screen:'section-q4',
        color: '#540d6e',
        question: 'What was the first 64-bit video game console ?',
        answers: ['Atari Jaguar', 'Xbox', 'Playstation One', 'Sega Saturn'],
        correct: 'Atari Jaguar'
    },
    {
        screen:'section-q5',
        color: '#0ead69',
        question: 'What is Sega 32x ?',
        answers: ['Sega Console', 'Sega Portatil console', 'Not exist', 'Add-on Sega Mega Drive'],
        correct: 'Add-on Sega Mega Drive'
    },

];
let counter = undefined;
let hit = undefined;

function start() {
    hit = 0;
    counter = 0;
    goToSection(questions[0]);
}

/**
 *  Move scroll to new screen (html tag section)
 */
function goToSection(screenObject){

    const element  = document.getElementById(screenObject.screen);
    buildHTML(screenObject);
    element.scrollIntoView(true);
    element.scrollIntoView({behavior:"smooth"}); // smooth scroll
    changeMainColor(screenObject.color);
}

function checkAnswer(target){
    const questionObject = questions[counter];
    console.log(questionObject);
    let answer = target.originalTarget.innerText;
    if (answer === questionObject.correct) {
         hit++;
         console.log('¡ Acierto !');
    }
    counter++;
    counter > 4 ? goToSection({screen: 'section-final', color: '#ee4266', final: true}) : goToSection(questions[counter]);
}

/**
 * Change main color per section
 * @param color
 *
  */
function changeMainColor(color){
    root.style.setProperty('--main-color', color);
}

/**
 * Receive questionObject and build section with question and answers
 * @param screenObject
 */
function buildHTML(screenObject){
    console.log(screenObject.screen);
    if (screenObject.hasOwnProperty('final')) {
        document.querySelector('.final-score').innerHTML = hit + '/' + counter;
    } else if (screenObject.hasOwnProperty('start')) {

    } else {
        const childs = document.querySelectorAll('#'+screenObject.screen + ' .box .subtitle');
        const questionHTML = document.querySelector('#'+screenObject.screen + ' .question');
        questionHTML.innerHTML = screenObject.question;
        for (let i = 0; i < childs.length; i++){
            let htmlElement = childs[i];
            htmlElement.innerHTML = screenObject.answers[i];
        }
    }
}



window.onload = (e) => {
    const buttons = document.querySelectorAll('.box.answer');
    buttons.forEach((node) => {
        node.addEventListener('click', (e) => {checkAnswer(e);})
    })
     const about = document.querySelector('.button-repeat');
    about.addEventListener('click', (e) => {goToSection({screen: 'section-home', color: '#ee4266', start: true})})

};