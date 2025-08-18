const doctors = ['Dr.João',"Dra.Maria", 'Dr. Pedro'];
let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
const doctorFilter = document.getElementById('doctorFilter');
const searchInput = document.getElementById('searchFilter');
const calendar = document.getElementById('calendar');
const modal = document.getElementById('modal');
const deleteBtn = document.getElementById('deleteBtn');
const appointmentDoctor = document.getElementById('appointmentDoctor');

function init(){
    doctors.forEach(doc => {
        doctorFilter.innerHTML += `<option>${doc}</option>`;
        appointmentDoctor.innerHTML += `<option>${doc}</option>`;
    });
    renderCalendar();
}
function rendereCalendar(){
    calendar.innerHTML = '';
    const today = new Date();
    for (let i = -3; i <= 3 ; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<storng>${date.toLocaleDateString()}</strong>`;
        const dailyAppointments = appointments.filter(a => a.date === date.toISOString().split('T')[0]);
        dailyAppointments.forEach(a => {
            const apptDiv = document.createElement('div')
            apptDiv.className = 'appointment';
            apptDiv.onclick = () => openModal(a);
            dayDiv.appendChild(apptDiv);
        });
        dayDiv.onclick = (e) => {
            if(e.target === dayDiv )openModal ({date: date.toISOString().split('T')[0]})
        };


    };
    calendar.appendChild(dayDiv);
};
function openModal(data ={}){
    modal.classList.remove('hidden');
    document.getElementById('appointmentId').value = data.id || "";
    document.getElementById('patieName').value = data.patient ||"";
    document.getElementById('appointmentDate').value = data.date || "";
    document.getElementById('appointentTime').value = data.time || "";
    document.getElementById('appointmentDuration').value = data.duration || 30;
    appointmentDoctor.value = data.doctor || doctors[0];
    document.getElementById('appointmentReason').value = data.reason || '';
}
function closeModal() {
    modal.classList.add('hidden');
}
appointmentForm.onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById('appointmentId').value || Date.now().toString();
    const newAppt = {
        id,
        patient: document.getElementById('patientName').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        duration: document.getElementById('appointmentDuration').value,
        doctor: appointmentDoctor.value,
        reason: document.getElementById('appointmentReason').value
    }
     appointments = appointments.filter(a => a.id !== id).concat(newAppt);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    renderCalendar();
    closeModal();
};
deleteBtn.onclick = () => {
    const id = document.getElementById('appointmentId').value;
    appointments = appointments.filter(a => a.id !== id);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    renderCalendar();
    closeModal();
};
