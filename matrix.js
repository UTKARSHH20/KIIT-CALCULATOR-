const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const cols = Math.floor(width / 20) + 1;
const ypos = Array(cols).fill(0);

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, width, height);

function matrix() {
    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0f0';
    ctx.font = '15pt monospace';

    ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
    });
}

setInterval(matrix, 50);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
