// MATRIX BACKGROUND
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const drops = Array(Math.floor(canvas.width / 16)).fill(1);
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    drops.forEach((y, i) => {
        const text = String.fromCharCode(Math.random() * 128);
        ctx.fillText(text, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

// LOGIN LOGIC
const passInput = document.getElementById('pass-input');
const btnAcessar = document.getElementById('btn-acessar');

btnAcessar.addEventListener('click', () => {
    if (passInput.value === '123') startBootSequence();
    else { alert("ACESSO NEGADO"); passInput.value = ''; }
});

function startBootSequence() {
    document.getElementById('auth-area').classList.add('hidden');
    document.getElementById('win98-boot-log').style.display = 'block';
    
    let progress = 0;
    const dynamicLines = document.getElementById('dynamic-boot-lines');
    const steps = ["Iniciando MS-DOS...", "Buscando Ryzen 5 4500...", "GTX 1060 White OK", "120Hz Ativado", "Pronto."];

    const timer = setInterval(() => {
        progress += 20;
        if (progress >= 100) {
            clearInterval(timer);
            setTimeout(() => {
                document.getElementById('pc-specs').classList.remove('hidden');
                document.getElementById('win98-boot-log').style.display = 'none';
                document.getElementById('lock-status').innerText = "🔓";
                startHardwareMonitor();
            }, 500);
        }
        const line = document.createElement('div');
        line.innerText = `> ${steps[progress/20 - 1]}`;
        dynamicLines.appendChild(line);
    }, 400);
}

function startHardwareMonitor() {
    setInterval(() => {
        document.getElementById('cpu-usage').innerText = (Math.random() * 15 + 2).toFixed(1) + "%";
        document.getElementById('cpu-temp').innerText = (Math.random() * 5 + 40).toFixed(0) + "°C";
        document.getElementById('gpu-usage').innerText = (Math.random() * 20 + 10).toFixed(1) + "%";
        document.getElementById('gpu-temp').innerText = (Math.random() * 5 + 45).toFixed(0) + "°C";
    }, 1000);
}