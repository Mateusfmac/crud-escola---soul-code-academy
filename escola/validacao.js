
function validaNome(nome) {
  if (isNaN(nome) || nome == "") {
    alert("Nome Invalido!")
    document.getElementById(nome).style.border = "red solid"
  } else {
    document.getElementById(nome).style.border = "green solid"
    return true
  }
}

function valida() {
  if(validaNome(nome))
  $("form").submit()
}