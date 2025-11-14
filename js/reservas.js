// js/reservas.js

/**
 * Carga médicos, obras sociales y turnos desde localStorage
 * y llena los select del formulario.
 */
function cargarDatosFormulario() {
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const obrasSociales = JSON.parse(localStorage.getItem('obrasSociales')) || [];
    const turnos = JSON.parse(localStorage.getItem('turnos')) || [];

    const selectMedico = document.getElementById('medico');
    const selectObraSocial = document.getElementById('obraSocial');
    const selectTurno = document.getElementById('turno');
    const valorTotalSpan = document.getElementById('valor-total');

    // Limpiar selects
    selectMedico.innerHTML = '<option value="">Seleccionar...</option>';
    selectObraSocial.innerHTML = '<option value="">Seleccionar...</option>';
    selectTurno.innerHTML = '<option value="">Seleccionar...</option>';

    // Cargar médicos
    medicos.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${m.nombre} ${m.apellido}`;
        selectMedico.appendChild(opt);
    });

    // Cargar obras sociales
    obrasSociales.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.id;
        opt.textContent = o.nombre;
        selectObraSocial.appendChild(opt);
    });

    // Actualizar turnos al cambiar médico
    selectMedico.addEventListener('change', () => {
        const medId = selectMedico.value;
        selectTurno.innerHTML = '<option value="">Seleccionar...</option>';
        if (!medId) return;

        const turnosDisponibles = turnos.filter(t => t.medicoId == medId && t.disponible);
        turnosDisponibles.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.id;
            const fecha = new Date(t.fechaHora);
            const opciones = { weekday: 'long', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
            opt.textContent = fecha.toLocaleDateString('es-ES', opciones);
            selectTurno.appendChild(opt);
        });
        calcularValor();
    });

    // Recalcular valor al cambiar cualquier campo relevante
    selectMedico.addEventListener('change', calcularValor);
    selectObraSocial.addEventListener('change', calcularValor);
    selectTurno.addEventListener('change', calcularValor);

    function calcularValor() {
        const medId = selectMedico.value;
        const medico = medicos.find(m => m.id == medId);
        if (medico) {
            valorTotalSpan.textContent = medico.valorConsulta.toFixed(2);
        } else {
            valorTotalSpan.textContent = '0.00';
        }
    }

    // Validación y envío del formulario
    document.getElementById('form-reserva').addEventListener('submit', function (e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            return;
        }

        // Guardar reserva
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        const nuevaReserva = {
            id: reservas.length ? Math.max(...reservas.map(r => r.id)) + 1 : 1,
            documento: document.getElementById('documento').value,
            nombrePaciente: document.getElementById('nombrePaciente').value,
            turnoId: parseInt(document.getElementById('turno').value),
            medicoId: parseInt(document.getElementById('medico').value),
            obraSocialId: parseInt(document.getElementById('obraSocial').value),
            valorTotal: parseFloat(valorTotalSpan.textContent)
        };

        reservas.push(nuevaReserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));

        alert(`✅ Reserva confirmada con éxito!\nValor: $${nuevaReserva.valorTotal}`);
        this.reset();
        this.classList.remove('was-validated');
        selectTurno.innerHTML = '<option value="">Seleccionar...</option>';
        valorTotalSpan.textContent = '0.00';
    });
}