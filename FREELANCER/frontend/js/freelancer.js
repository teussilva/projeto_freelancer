window.addEventListener('load', () => {
    let projetoSelecionado = JSON.parse(localStorage.getItem('projetoSelecionado'))

  if (!projetoSelecionado) {
    console.warn("Nenhum projeto selecionado encontrado no localStorage.");
    return;
  }

  const divProjeto = document.querySelector('.projeto');
  if (!divProjeto) {
    console.error("Elemento .projeto não encontrado!");
    return;
  }

  divProjeto.innerHTML = `
    <h3>${projetoSelecionado.titulo}</h3>
    <p><strong>Categoria:</strong> ${projetoSelecionado.categoria}</p>
    <p><strong>Descrição:</strong> ${projetoSelecionado.descricao}</p>
    <p><strong>Valor:</strong> R$ ${projetoSelecionado.orcamento}</p>
    <form action="candidatar.php" method="POST">
      <input type="hidden" name="projeto_id" value="${projetoSelecionado.id}">
      <textarea name="mensagem" placeholder="Mensagem para o cliente (opcional)" rows="2"></textarea>
      <button type="submit">Candidatar-se</button>
    </form>
  `;

  console.log(textarea)
});
