
function playAudio(audio) {
    if (switchPower) {
        audio.currentTime = 0
        audio.volume = $volume.value / 100
        audio.play()
    }
}

function displaySampleName(audio) {
    if (switchPower) {
        $sampleDisplay.innerHTML = audio.getAttribute('name')
    }
}

function changePadStyle(index) {
    $padsContainer.children[index].style.boxShadow = '0px 0px 5px rgba(0, 0, 0, .6)'
    $padsContainer.children[index].style.background = 'var(--clr-shade-dark)'
    window.setTimeout(() => {
        $padsContainer.children[index].style.boxShadow = '4px 4px 5px rgba(0, 0, 0, .6)'
        $padsContainer.children[index].style.background = 'var(--clr-shade-medium)'
    }, 200)
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
        changePadStyle(i)
        if(switchPower) {
            if (switchBank) {
                i += 9
            }
            const audio = $audioFiles.children[i]
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
    
    if (!switchPower) {
        $sampleDisplay.textContent = ''
    }
})

$overlayBank.addEventListener('click', () => {
    switchBank = !switchBank
    switchBank ?
        $switchBank.style.justifyContent = 'flex-end' :
        $switchBank.style.justifyContent = 'flex-start'
})

document.body.addEventListener('keydown', (event) => {
    let index = keys.indexOf(event.key)

    changePadStyle(index)


    if (index !== -1) {
        if (switchBank) {
            index += 9
        }
        const audio = $audioFiles.children[index]
        playAudio(audio)
        displaySampleName(audio)
    }
})

