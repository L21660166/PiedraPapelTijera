let confetiInterval; // Variable para manejar el intervalo del confeti

function jugar(eleccionUsuario) {
    const opciones = ['piedra', 'papel', 'tijera'];
    const eleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)];
    let resultado = '';

    // Detener el confeti si se vuelve a jugar
    detenerConfeti();

    if (eleccionUsuario === eleccionComputadora) {
        resultado = 'Empate';
    } else if (
        (eleccionUsuario === 'piedra' && eleccionComputadora === 'tijera') ||
        (eleccionUsuario === 'papel' && eleccionComputadora === 'piedra') ||
        (eleccionUsuario === 'tijera' && eleccionComputadora === 'papel')
    ) {
        resultado = '¡Ganaste!';
        mostrarConfeti(300); // Aumentando el número de confeti al ganar
    } else {
        resultado = 'Perdiste';
    }

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p>Tú: ${eleccionUsuario}</p>
        <p>Computadora: ${eleccionComputadora}</p>
        <p class="resultado-final ${resultado === '¡Ganaste!' ? '' : 'tristeza'}">${resultado}</p>
    `;

    // Detener el confeti después de 3 segundos si se gana
    if (resultado === '¡Ganaste!') {
        setTimeout(() => {
            detenerConfeti();
        }, 3000);
    }
}

function mostrarConfeti(cantidad) {
    const confetiDiv = document.getElementById('confeti');
    clearInterval(confetiInterval); // Asegurarse de que no haya confeti en intervalos anteriores
    confetiDiv.innerHTML = ''; // Limpiar confeti previo
    confetiInterval = setInterval(() => {
        for (let i = 0; i < cantidad; i++) { // Aumentando la cantidad de confeti al ganar
            const confeti = document.createElement('div');
            confeti.style.left = Math.random() * 100 + 'vw';
            confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`; // Color de confeti más suave
            confeti.style.animationDuration = Math.random() * 1 + 1 + 's'; // Aumentando la duración de la animación
            confeti.style.width = Math.random() * 10 + 5 + 'px'; // Tamaño variable para el confeti
            confeti.style.height = confeti.style.width; // Mantener el aspecto cuadrado
            confetiDiv.appendChild(confeti);
            setTimeout(() => {
                confeti.remove();
            }, 3000); // Ajustando el tiempo para que el confeti se mantenga más tiempo visible
        }
    }, 150); // Tiempo entre cada "salto" de confeti
}

function detenerConfeti() {
    clearInterval(confetiInterval);
    const confetiDiv = document.getElementById('confeti');
    confetiDiv.innerHTML = ''; // Limpiar confeti
}
