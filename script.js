// Busca o elemento do celular no HTML.
// Esse elemento tem id="phone" no arquivo index.html.
const phone = document.querySelector("#phone");

// Define a força máxima do efeito 3D.
// Quanto menor o número, mais suave fica o movimento.
const maxRotation = 5;

// Verifica se o celular existe antes de aplicar os eventos.
// Isso evita erro no console caso o id seja alterado.
if (phone) {
  // Quando o mouse se move sobre o celular, aplicamos um efeito 3D.
  phone.addEventListener("mousemove", (event) => {
    // Verifica se o mouse está sobre link ou botão.
    // Isso evita conflito entre o movimento 3D e elementos clicáveis.
    const isInteractiveElement = event.target.closest("a, button");

    // Se estiver em link ou botão, reduzimos o movimento do celular.
    if (isInteractiveElement) {
      phone.style.transform = "translateY(-4px)";
      return;
    }

    // Pega posição e tamanho do celular na tela.
    const rect = phone.getBoundingClientRect();

    // Calcula a posição horizontal do mouse dentro do celular.
    const mouseX = event.clientX - rect.left;

    // Calcula a posição vertical do mouse dentro do celular.
    const mouseY = event.clientY - rect.top;

    // Converte a posição do mouse para porcentagem.
    const percentX = mouseX / rect.width;
    const percentY = mouseY / rect.height;

    // Calcula a rotação lateral.
    const rotateY = (percentX - 0.5) * maxRotation * 2;

    // Calcula a rotação vertical.
    const rotateX = (percentY - 0.5) * maxRotation * -2;

    // Aplica o movimento 3D no celular.
    phone.style.transform = `
      translateY(-8px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  // Quando o mouse sai do celular, removemos o estilo aplicado pelo JavaScript.
  // Assim a animação original do CSS volta a funcionar.
  phone.addEventListener("mouseleave", () => {
    phone.style.transform = "";
  });
}

// Busca o elemento do horário no HTML.
// Ele precisa ter id="current-time".
const currentTimeElement = document.querySelector("#current-time");

// Função responsável por atualizar o horário da tela do celular.
function updateCurrentTime() {
  // Cria uma data baseada no horário atual do computador/celular do usuário.
  const now = new Date();

  // Formata o horário para mostrar apenas hora e minuto.
  const formattedTime = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Se o elemento existir, colocamos o horário formatado dentro dele.
  if (currentTimeElement) {
    currentTimeElement.textContent = formattedTime;
  }
}

// Chama a função uma vez assim que a página carrega.
updateCurrentTime();

// Atualiza o horário a cada 30 segundos.
// Não precisa atualizar a cada segundo, porque estamos exibindo só hora e minuto.
setInterval(updateCurrentTime, 30000);
