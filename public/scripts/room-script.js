let modal = document.getElementsByClassName("modal")[0];
let modalForm = document.getElementById("modalForm");
let modalTitle = document.getElementsByClassName("modalTitle")[0];
let modalQuestion = document.getElementsByClassName("modalQuestion")[0];
let modalConfirm = document.getElementsByClassName("modalConfirm")[0];
let cancelAction = document.getElementById("cancelAction");
let checkButtons = document.querySelectorAll("#check");
let deleteButtons = document.querySelectorAll("#delete");
let inputfield = document.getElementById("roomCode");
let copyButton = document.getElementsByClassName("copy-button")[0];
let errorMessages = document.getElementsByClassName("error-messages")[0];
let confirmPassword = document.getElementById("confirmPassword");

if (errorMessages) {
  setInterval(() => {
    errorMessages.style.opacity = "0";
  }, 2500);
}

cancelAction.addEventListener("click", (event) => {
  event.preventDefault();
  modal.style.display = "none";
});

function getTextCopied() {
  copyButton.style.opacity = "1";
  setInterval(() => {
    copyButton.style.opacity = "0";
  }, 2000);

  inputfield.select();
  inputfield.setSelectionRange(2, 8);

  document.execCommand("copy");
}

checkButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

deleteButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick(e) {
  let roomCode = document.getElementById("roomCode").value.slice(2, 8);
  if (e.target.id == "check") {
    modalForm.setAttribute(
      "action",
      `/checkQuestion/${roomCode}/${e.target.dataset.id}`,
    );
    modalTitle.innerHTML = "Marcar como lida";
    modalQuestion.innerHTML =
      "Tem certeza que deseja marcar esta pergunta como lida?";
    modalConfirm.innerHTML = "Sim, marcar";
  } else {
    modalForm.setAttribute(
      "action",
      `/deleteQuestion/${roomCode}/${e.target.dataset.id}`,
    );
    modalTitle.innerHTML = "Excluir pergunta";
    modalQuestion.value = "Tem certeza que você deseja excluir esta pergunta?";
    modalConfirm.innerHTML = "Sim, excluir";
  }
  modal.style.display = "flex";
}
