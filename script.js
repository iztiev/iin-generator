function pad(num, size) {
    let s = `0000000000${num}`;
    return s.substring(s.length - size);
}

function generateDate() {
    const year = Math.floor(Math.random() * 50) + 49;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * (month === 2 ? 28 : 30)) + 1;
    return `${pad(year, 2)}${pad(month, 2)}${pad(day, 2)}`;
}

function generateSex() {
    return `${Math.floor(Math.random() * 2) + 3}`;
}

function generateRandomPortion() {
    const num = Math.floor(Math.random() * 9999);
    return pad(num, 4);
}

function generateControlNumber(iin, weights) {
    const sum = iin
        .split('')
        .map((p, i) => parseInt(p) * weights[i])
        .reduce((acc, v) => acc + v, 0);
    return sum % 11;
}

const WEIGHTS = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2],
]

function generateIin() {
    const iin = `${generateDate()}${generateSex()}${generateRandomPortion()}`;
    let ctrl = 11;
    for (let i = 0; i < WEIGHTS.length; i++) {
        ctrl = generateControlNumber(iin, WEIGHTS[i]);
        if (ctrl < 10) break;
    }
    if (ctrl >= 10) return generateIin();
    return `${iin}${ctrl}`;
}

function generateIinList() {
    const input = document.getElementById('amount');
    const amount = parseInt(input.value) || 10;
    const ul = document.getElementById('iin-list');
    const existing = ul.querySelectorAll('li');
    existing.forEach(i => ul.removeChild(i));
    for (let i = 0; i < amount; i++) {
        const li = document.createElement('li');
        li.innerHTML = generateIin();
        ul.appendChild(li);
    }
}

function registerButton() {
    const button = document.getElementById('generate-button');
    button.addEventListener('click', generateIinList);
    button.addEventListener('touch', generateIinList);
}

registerButton();
