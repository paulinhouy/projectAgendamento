const doctors = ['Dr.João',"Dra.Maria", 'Dr. Pedro'];
let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');

const doctorFilter = document.getElementById('doctorFilter');
const searchInput = document.getElementById('searchFilter')