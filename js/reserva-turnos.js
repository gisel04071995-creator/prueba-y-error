
function cargarDatosFormulario() {
   
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const obrasSociales = JSON.parse(localStorage.getItem('obrasSociales')) || [];
    const turnos = JSON.parse(localStorage.getItem('turnos')) || [];

   
    const selectMedico = document.getElementById('medico');
    const selectObraSocial = document.getElementById('obraSocial');
    const selectTurno = document.getElementById('turno');
    const valorTotalSpan = document.getElementById('valor-total');

   
    selectMedico.innerHTML = '<option value="">Seleccionar...</option>';
    selectObraSocial.innerHTML = '<option value="">Seleccionar...</option>';
    selectTurno.innerHTML = '<option value="">Seleccionar...</option>';

    
    medicos.forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.id;
        option.textContent = `${medico.nombre} ${medico.apellido}`;
        selectMedico.appendChild(option);
    });

   
    obrasSociales.forEach(obra => {
        const option = document.createElement('option');
        option.value = obra.id;
        option.textContent = obra.nombre;
        selectObraSocial.appendChild(option);
    });

  
    selectMedico.addEventListener('change', function () {
        const medicoId = this.value;
        if (!medicoId) {
            selectTurno.innerHTML = '<option value="">Seleccionar...</option>';
            return;
        }

  
        const turnosDisponibles = turnos.filter(t => t.medicoId == medicoId && t.disponible);

  
        selectTurno.innerHTML = '<option value="">Seleccionar...</option>';

    
        turnosDisponibles.forEach(turno => {
            const option = document.createElement('option');
            option.value = turno.id;
 
            const fecha = new Date(turno.fechaHora);
            const diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
            const fechaStr = fecha.toLocaleDateString('es-ES');
            const horaStr = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            option.textContent = `${diaSemana} ${fechaStr} a las ${horaStr}`;
            selectTurno.appendChild(option);
        });
    });


    function calcularValorTotal() {
        const medicoId = selectMedico.value;
        const obraSocialId = selectObraSocial.value;
        const turnoId = selectTurno.value;

        if (!medicoId || !obraSocialId || !turnoId) {
            valorTotalSpan.textContent = '0.00';
            return;
        }

    
        const medico = medicos.find(m => m.id == medicoId);
        if (!medico) {
            valorTotalSpan.textContent = '0.00';
            return;
        }


        valorTotalSpan.textContent = medico.valorConsulta.toFixed(2);
    }

 
    selectMedico.addEventListener('change', calcularValorTotal);
    selectObraSocial.addEventListener('change', calcularValorTotal);
    selectTurno.addEventListener('change', calcularValorTotal);


    const form = document.getElementById('form-reserva');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

       
        realizarReserva();
    });
}


function realizarReserva() {
    const documento = document.getElementById('documento').value;
    const nombrePaciente = document.getElementById('nombrePaciente').value;
    const medicoId = document.getElementById('medico').value;
    const obraSocialId = document.getElementById('obraSocial').value;
    const turnoId = document.getElementById('turno').value;

   
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const nuevaReserva = {
        id: reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1,
        documento: documento,
        nombrePaciente: nombrePaciente,
        turnoId: parseInt(turnoId),
        medicoId: parseInt(medicoId),
        obraSocialId: parseInt(obraSocialId),
       
        valorTotal: parseFloat(document.getElementById('valor-total').textContent)
    };


    reservas.push(nuevaReserva);


    localStorage.setItem('reservas', JSON.stringify(reservas));

  
    alert(`¡Reserva confirmada!\n\nDocumento: ${documento}\nNombre: ${nombrePaciente}\nMédico: ${document.getElementById('medico').options[document.getElementById('medico').selectedIndex].text}\nTurno: ${document.getElementById('turno').options[document.getElementById('turno').selectedIndex].text}\nValor Total: $${nuevaReserva.valorTotal}`);


    document.getElementById('form-reserva').reset();
    document.getElementById('form-reserva').classList.remove('was-validated');
}


window.addEventListener('DOMContentLoaded', function () {

    if (typeof cargarDatosFormulario === 'function') {
        cargarDatosFormulario();
    } else {
        console.error('Función cargarDatosFormulario no definida. Revisa js/reservas.js');
    }
});