const doctors = ['Dr.João',"Dra.Maria", 'Dr. Pedro'];
let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

const doctorFilter = document.getElementById('doctorFilter');
const searchInput = document.getElementById('searchFilter');
const calendar = document.getElementById('calendar');
const modal = document.getElementById('modal');
const deleteBtn = document.getElementById('deleteBtn');
const appointmentDoctor = document.getElementById('appointmentDoctor');

