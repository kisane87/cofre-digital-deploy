const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const letters = "0123456789ABCDEF";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);
let corMatrix = "#0F0";

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = corMatrix;
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

let tentativas = 0;
function addLog(msg) {
    const log = document.getElementById('terminal-log');
    log.innerHTML += `<div>> ${msg}</div>`;
    log.scrollTop = log.scrollHeight;
}

function abrir() {
    let senha = document.getElementById('senha').value;
    if (senha === '123') {
        addLog("ACESSO GARANTIDO.");
        document.getElementById('login').style.display = 'none';
        document.getElementById('progresso').style.display = 'flex';
        let barra = document.getElementById('barra-neon');
        let w = 0;
        let int = setInterval(() => {
            if (w >= 100) {
                clearInterval(int);
                document.getElementById('progresso').style.display = 'none';
                document.getElementById('conteudo').style.display = 'flex';
                addLog("HARDWARE: RYZEN 5 DETECTADO.");
            } else { w++; barra.style.width = w + '%'; }
        }, 20);
    } else {
        tentativas++;
        addLog(`ERRO: Senha incorreta (${tentativas}/3)`);
        if (tentativas >= 3) {
            corMatrix = "#F00";
            document.getElementById('alerta-invasao').style.display = 'flex';
            addLog("SISTEMA BLOQUEADO!");
        }
    }
}

function fechar() {
    document.getElementById('conteudo').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
    document.getElementById('senha').value = '';
    addLog("Sessão finalizada.");
}
function monitoramentoReal() {
    // Só executa se o painel de conteúdo estiver visível
    if (document.getElementById('conteudo').style.display === 'flex') {
        
        // Simulação de Uso (0% a 100%)
        let cpuUso = Math.floor(Math.random() * 45) + 10; // Entre 10% e 55%
        let gpuUso = Math.floor(Math.random() * 60) + 20; // Entre 20% e 80%

        // Simulação de Temperatura
        let cpuTemp = Math.floor(Math.random() * 15) + 40; // Entre 40°C e 55°C
        let gpuTemp = Math.floor(Math.random() * 20) + 50; // Entre 50°C e 70°C

        // Atualiza as Barras e Textos
        document.getElementById('uso-cpu').style.width = cpuUso + '%';
        document.getElementById('txt-cpu').innerText = cpuUso + '%';
        
        document.getElementById('uso-gpu').style.width = gpuUso + '%';
        document.getElementById('txt-gpu').innerText = gpuUso + '%';

        // Atualiza Temperaturas
        const tCpu = document.getElementById('temp-cpu');
        const tGpu = document.getElementById('temp-gpu');
        
        tCpu.innerText = cpuTemp + '°C';
        tGpu.innerText = gpuTemp + '°C';

        // Lógica de Cor: Se passar de 65°C fica vermelho
        if (gpuTemp > 65) {
            tGpu.classList.add('quente');
        } else {
            tGpu.classList.remove('quente');
        }
    }
}

// Inicia o monitoramento (roda a cada 1000ms = 1 segundo)
setInterval(monitoramentoReal, 1000);