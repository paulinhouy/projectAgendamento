const diasContainer = document.getElementById("diasContainer");
const filtroMedico = document.getElementById("filtroMedico");
const filtroBusca = document.getElementById("filtroBusca");
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const formAgendamento = document.getElementById("formAgendamento");
const modalTitulo = document.getElementById("modalTitulo");
const excluirBtn = document.getElementById("excluir");
const medicoSelect = document.getElementById("medico");

let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
let medicos = ["Dr. Ana", "Dr. João", "Dr. Clara", "Dr. Marcos"];
let agendamentoAtual = null;

// Preenche médicos nos selects
function carregarMedicos() {
  filtroMedico.innerHTML = "<option value=''>Todos</option>";
  medicoSelect.innerHTML = "";
  medicos.forEach(m => {
    filtroMedico.innerHTML += `<option value="${m}">${m}</option>`;
    medicoSelect.innerHTML += `<option value="${m}">${m}</option>`;
  });
}

function renderizarDias() {
  diasContainer.innerHTML = "";
  const hoje = new Date();
  for (let i = -3; i <= 3; i++) {
    const data = new Date();
    data.setDate(hoje.getDate() + i);
    const dataStr = data.toISOString().split("T")[0];

    const diaDiv = document.createElement("div");
    diaDiv.classList.add("dia");
    diaDiv.innerHTML = `<h3>${data.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })}</h3>`;
    
    let eventos = agendamentos.filter(a => a.data === dataStr);

    
    if (filtroMedico.value) {
      eventos = eventos.filter(a => a.medico === filtroMedico.value);
    }
    if (filtroBusca.value) {
      const termo = filtroBusca.value.toLowerCase();
      eventos = eventos.filter(a => a.paciente.toLowerCase().includes(termo) || a.motivo.toLowerCase().includes(termo));
    }

    eventos.forEach(a => {
      const eventoDiv = document.createElement("div");
      eventoDiv.classList.add("evento");
      eventoDiv.textContent = `${a.hora} - ${a.paciente} (${a.medico})`;
      eventoDiv.onclick = () => abrirModal(a);
      diaDiv.appendChild(eventoDiv);
    });

   
    const novoBtn = document.createElement("button");
    novoBtn.textContent = "+ Agendar";
    novoBtn.onclick = () => abrirModal({ data: dataStr, hora: "08:00" });
    diaDiv.appendChild(novoBtn);

    diasContainer.appendChild(diaDiv);
  }
}

function abrirModal(agendamento = null) {
  agendamentoAtual = agendamento && agendamento.id ? agendamento : null;
  modal.style.display = "block";
  if (agendamentoAtual) {
    modalTitulo.textContent = "Editar Agendamento";
    document.getElementById("agendamentoId").value = agendamentoAtual.id;
    document.getElementById("paciente").value = agendamentoAtual.paciente;
    document.getElementById("medico").value = agendamentoAtual.medico;
    document.getElementById("data").value = agendamentoAtual.data;
    document.getElementById("hora").value = agendamentoAtual.hora;
    document.getElementById("duracao").value = agendamentoAtual.duracao;
    document.getElementById("motivo").value = agendamentoAtual.motivo;
    excluirBtn.style.display = "inline-block";
  } else {
    modalTitulo.textContent = "Novo Agendamento";
    formAgendamento.reset();
    document.getElementById("data").value = agendamento.data;
    document.getElementById("hora").value = agendamento.hora;
    excluirBtn.style.display = "none";
  }
}

//onClick construir modal
fecharModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

formAgendamento.onsubmit = (e) => {
  e.preventDefault();
  const novo = {
    id: agendamentoAtual ? agendamentoAtual.id : Date.now(),
    paciente: document.getElementById("paciente").value,
    medico: document.getElementById("medico").value,
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    duracao: document.getElementById("duracao").value,
    motivo: document.getElementById("motivo").value,
  };

  if (agendamentoAtual) {
    agendamentos = agendamentos.map(a => a.id === agendamentoAtual.id ? novo : a);
  } else {
    agendamentos.push(novo);
  }

  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  modal.style.display = "none";
  renderizarDias();
};

excluirBtn.onclick = () => {
  if (agendamentoAtual) {
    agendamentos = agendamentos.filter(a => a.id !== agendamentoAtual.id);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    modal.style.display = "none";
    renderizarDias();
  }
};

filtroMedico.onchange = renderizarDias;
filtroBusca.oninput = renderizarDias;

carregarMedicos();
renderizarDias();
