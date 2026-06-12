// Busca o elemento do celular no HTML.
// Esse elemento tem id="phone" no arquivo index.html.
const phone = document.querySelector("#phone");

// Define a força máxima do efeito 3D.
// Reduzi para deixar o movimento mais elegante e menos "bugado".
const maxRotation = 5;

// Verifica se o celular existe antes de aplicar os eventos.
// Isso evita erro no console caso o id seja alterado.
if (phone) {
  // Quando o mouse se move sobre o celular, aplicamos um efeito 3D.
  phone.addEventListener("mousemove", (event) => {
    // Se o mouse estiver em cima de um link ou botão,
    // não aplicamos o giro do celular.
    // Isso evita conflito entre o efeito 3D e os elementos clicáveis.
    const isInteractiveElement = event.target.closest("a, button");

    // Se for link ou botão, paramos o código aqui.
    if (isInteractiveElement) {
      phone.style.transform = "translateY(-4px)";
      return;
    }

    // Pega posição e tamanho do celular na tela.
    const rect = phone.getBoundingClientRect();

    // Calcula a posição do mouse dentro do celular no eixo X.
    const mouseX = event.clientX - rect.left;

    // Calcula a posição do mouse dentro do celular no eixo Y.
    const mouseY = event.clientY - rect.top;

    // Transforma a posição em porcentagem.
    const percentX = mouseX / rect.width;
    const percentY = mouseY / rect.height;

    // Calcula rotação lateral.
    const rotateY = (percentX - 0.5) * maxRotation * 2;

    // Calcula rotação vertical.
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