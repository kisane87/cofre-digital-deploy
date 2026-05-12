// --- EFEITO MATRIX ---
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "0123456789ABCDEFHIJKLMNOPQRSTUVXYZ@#$%&*";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}

// --- HARDWARE ---
function atualizarHardware() {
    document.getElementById('cpu-bar').style.width = Math.floor(Math.random() * 100) + "%";
    document.getElementById('gpu-bar').style.width = Math.floor(Math.random() * 100) + "%";
}

// --- FUNÇÕES ---
function gerarSenha() {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let senha = "";
    for (let i = 0; i < 10; i++) {
        senha += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById('senha-gerada').innerText = senha;
}

function fazerScan() {
    const out = document.getElementById('resultado-scan');
    out.innerHTML = "LENDO HARDWARE...";
    setTimeout(() => {
        out.innerHTML = `SISTEMA: ${navigator.platform}<br>RESOLUÇÃO: ${window.screen.width}x${window.screen.height}<br>ESTADO: PROTEGIDO`;
    }, 1000);
}

setInterval(drawMatrix, 50);
setInterval(atualizarHardware, 2000);