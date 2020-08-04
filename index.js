

function playAudio(audio) {
    if (switchPower) {
        audio.currentTime = 0
        audio.volume = $volume.value / 100
        audio.play()
    }
}


function displaySampleName(audio) {
    $sampleDisplay.innerHTML = audio.getAttribute('name')
}

const $audioFiles = document.getElementById('audioFiles')
const $padsContainer = document.getElementsByClassName('pads-container')[0]

const $switchPower = document.getElementById('switchPower')
const $switchBank = document.getElementById('switchBank')
const $overlayPower = document.getElementById('overlayPower')
const $overlayBank = document.getElementById('overlayBank')

const $sampleDisplay = document.getElementById('sampleDisplay')
const $volume = document.getElementById('volume')

let switchPower = false
let switchBank = false

const keys = ['q', 'w', 'e', 'a', 's', 'd', 'y', 'x', 'c']

for (let i = 0; i < $padsContainer.children.length; i++) {
    $padsContainer.children[i].addEventListener('click', (event) => {
        const audio = $audioFiles.children[i]
        if(switchPower) {
            playAudio(audio)
            displaySampleName(audio)
        }
    })
}

$overlayPower.addEventListener('click', () => {
    switchPower = !switchPower
    switchPower ?
        $switchPower.style.justifyContent = 'flex-end' :
        $switchPower.style.justifyContent = 'flex-start'
    
})

$overlayBank.addEventListener('click', () => {
    switchBank = !switchBank
    switchBank ?
        $switchBank.style.justifyContent = 'flex-end' :
        $switchBank.style.justifyContent = 'flex-start'
})

document.body.addEventListener('keydown', (event) => {
    const index = keys.indexOf(event.key)
    if (index !== -1) {
        const audio = $audioFiles.children[index]
        playAudio(audio)
        displaySampleName(audio)
    }
})

