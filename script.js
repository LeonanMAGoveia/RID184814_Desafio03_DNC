let contador = 0;

function adicionarTarefa() {
  let tarefa = document.getElementById("inputTarefa").value.trim();
  let etiqueta = document.getElementById("inputEtiqueta").value.trim();

  // Validar se ambos os campos estão preenchidos
  if (tarefa === "" || etiqueta === "") {
    alert("Por favor, preencha tanto a tarefa quanto a etiqueta.");
    return;
  }

  // Validar se contêm apenas letras
  if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(tarefa)) {
    alert("A tarefa só pode conter letras.");
    document.getElementById("inputTarefa").value = "";
    return;
  }

  if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(etiqueta)) {
    alert("A etiqueta só pode conter letras.");
    document.getElementById("inputEtiqueta").value = "";
    return;
  }

  // Limpar os campos
  document.getElementById("inputTarefa").value = "";
  document.getElementById("inputEtiqueta").value = "";

  // Criar a tarefa
  criarLista(tarefa, etiqueta);
}

function criarLista(tarefa, etiqueta) {
  let data = new Date();
  let dataBr = data.toLocaleString("pt-BR", { dateStyle: "short" });

  let li = document.createElement("li");
  li.innerHTML = `
    <section class="tasks-cards">
      <div class="task-texts">
        <div class="task-nome"></div>
        <div class="subtextos">
          <div class="task-etiqueta"></div>
          <div class="date"></div>
        </div>
      </div>
      <button class="botao-concluir" onclick="botaoConcluir(this)" type="button" aria-label="Concluir tarefa">Concluir</button>
    </section>
  `;
  let taskNome = li.querySelector(".task-nome");
  taskNome.textContent = tarefa;

  let taskEtiqueta = li.querySelector(".task-etiqueta");
  taskEtiqueta.textContent = etiqueta;

  let date = li.querySelector(".date");
  date.textContent = `Criado em: ${dataBr}`;

  document.querySelector("ul").appendChild(li);
}

function botaoConcluir(button) {
  taskCard = button.closest(".tasks-cards");
  taskNome = taskCard.querySelector(".task-nome");
  taskNome.style.textDecoration = "line-through";

  let checkImg = document.createElement("img");
  checkImg.src = "./assets/check.png";
  checkImg.style.width = "50px";
  checkImg.style.height = "50px";
  checkImg.style.border = "none";
  checkImg.style.background = "none";

  button.replaceWith(checkImg);

  contador++;
  document.getElementById("contador").textContent = contador;
}
