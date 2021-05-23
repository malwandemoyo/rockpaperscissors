const selectionButtons = document.querySelectorAll('[data-selection]');
const finalSelection = document.querySelector('[data-final-column]');
const myScore = document.querySelector('[data-your-score]');
const opponentScore = document.querySelector('[data-computer-score]')

const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '🧻',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    }
    
]

selectionButtons.forEach(selectionButton =>{
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function incrementScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
    // if (scoreSpan.innerText.parseInt >= 5){
    //     break
    // }
}
    

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
  
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)
  
    if (yourWinner) incrementScore(myScore)
    if (computerWinner) incrementScore(opponentScore)
  }

function addSelectionResult(selection, winner){
    const div = document.createElement('div')
    div.innerText= selection.emoji;
    
    if (winner){
        div.classList.add('winner')
        console.log("There's a winner")
    }else{
        div.classList.add('result-selection') 
    }
    finalSelection.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}