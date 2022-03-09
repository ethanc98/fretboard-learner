const title = document.querySelector('.title');
const dots = document.querySelector('.dot-inlays');
const blocks = document.querySelector('.block-inlays');
const note = document.querySelector('.note');
const stringsGuitar = document.querySelector('.strings_guitar');
const stringsBass = document.querySelector('.strings_bass');
const string = document.querySelector('.string');
const stringE = document.querySelectorAll('.string__e');
const stringA = document.querySelectorAll('.string__a');
const stringD = document.querySelectorAll('.string__d');
const stringG = document.querySelectorAll('.string__g');
const stringB = document.querySelectorAll('.string__b');
const stringE2 = document.querySelectorAll('.string__e2');
const button = document.querySelector('.button');
const switcher = document.querySelector('.switch input');
const slider = document.querySelector('.slider');
const timeAdjuster = document.querySelector('#time');

const notes = ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];
let mode = 'off';
let currentString = stringA;

switcher.addEventListener('click', () => {
    if (switcher.ariaChecked == 'false') {
    unhide(stringsGuitar);
    unhide(blocks);
    hide(stringsBass);
    hide(dots);

    switcher.setAttribute("aria-checked", "true");
    }   else {
    hide(stringsGuitar);
    hide(blocks);
    unhide(stringsBass);
    unhide(dots);

    switcher.setAttribute("aria-checked", "false");
}});


button.addEventListener('click', () => {
    if (mode == 'off') {
        const optionValue = timeAdjuster.options[timeAdjuster.selectedIndex].value;
        const timeValue = optionValue * 1000;
        mode = 'on';

        hide(timeAdjuster.parentElement);
        hide(title);
        hide(switcher.parentElement);
        hide(slider);

        button.innerHTML = 'Stop';
        button.classList.add('button_stop');
        runGame(timeValue);
    } else if (mode == 'on') {
        clearTimeout(this.timeoutId);
        mode = 'off';

        unhide(timeAdjuster.parentElement);
        unhide(title);
        unhide(switcher.parentElement);
        unhide(slider);

        button.innerHTML = 'Start';
        button.classList.remove('button_stop');
        note.innerHTML = '';
        removeString()
    }
});

const hide = (el) => {
    el.classList.add('hide')
}
const unhide = (el) => {
    el.classList.remove('hide')
}


const runGame = async (timeValue) => {
    if (mode == 'off') {
        return;
    } else {
        newNote();
        newString();
        this.timeoutId = setTimeout(() => { runGame(timeValue) }, timeValue);
    }
}


const newNote = () => {
    // random note selector
    const num = Math.floor(Math.random() * 12);
    // checks if note is sharp
    if (num == 1 || num == 4 || num == 6 || num == 9 || num == 11) {
        // fifty fifty to decide flat or sharp
        const fiftyFifty = Math.floor(Math.random() * 2);
        if (num == 1) {
            if (fiftyFifty == 0) {
                note.innerHTML = 'A♯';
            } else { note.innerHTML = 'B♭' }
        }
        if (num == 4) {
            if (fiftyFifty == 0) {
                note.innerHTML = 'C♯';
            } else { note.innerHTML = 'D♭' }
        }
        if (num == 6) {
            if (fiftyFifty == 0) {
                note.innerHTML = 'D♯';
            } else { note.innerHTML = 'E♭' }
        }
        if (num == 9) {
            if (fiftyFifty == 0) {
                note.innerHTML = 'F♯';
            } else { note.innerHTML = 'G♭' }
        }
        if (num == 11) {
            if (fiftyFifty == 0) {
                note.innerHTML = 'G♯';
            } else { note.innerHTML = 'A♭' }
        }
    } else {
        note.innerHTML = notes[num];
    }
}
const newString = () => {
    // removes previous string's styling
    removeString();
    // random string selector
    if (switcher.ariaChecked == 'false') {
        const num = Math.floor(Math.random() * 4);
        updateString(num)
    } else {
        const num = Math.floor(Math.random() * 6);
        updateString(num)
    }
}

const removeString = () => {
    currentString.forEach(string => string.classList.remove('current-string'));
}
const updateString = (num) => { 
        if (num === 0) {
        stringE.forEach(string => string.classList.add('current-string'));
        currentString = stringE;
    }
    if (num === 1) {
        stringA.forEach(string => string.classList.add('current-string'));
        currentString = stringA;
    }
    if (num === 2) {
        stringD.forEach(string => string.classList.add('current-string'));
        currentString = stringD;
    }
    if (num === 3) {
        stringG.forEach(string => string.classList.add('current-string'));
        currentString = stringG;
    }
    if (num === 4) {
        stringB.forEach(string => string.classList.add('current-string'));
        currentString = stringB;
    }
    if (num === 5) {
        stringE2.forEach(string => string.classList.add('current-string'));
        currentString = stringE2;
    }
    }