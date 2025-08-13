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
    for (let i = -3; i <= 3 . i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const dayDiv = document.createElement('div');
        


    }
}