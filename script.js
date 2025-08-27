document.addEventListener('DOMContentLoaded', () => {
  
  const gabarito = {
    'pergunta1': '43/25',
    'pergunta2': 'x=1', // corrigido
    'pergunta3': '5/12',
    'pergunta4': '0,09'
  };

  const main = document.querySelector('main');

  const resultadoSection = document.createElement('section');
  resultadoSection.innerHTML = `
    <h2>Finalize seu Quiz</h2>
    <label for="emailUser">Digite seu email para salvar seu resultado:</label><br>
    <input type="email" id="emailUser" required placeholder="seuemail@exemplo.com"><br><br>
    <button id="btnEnviar">Enviar Respostas</button>
    <div id="resultadoFinal" style="margin-top: 20px;"></div>
  `;
  main.appendChild(resultadoSection);

  const btnEnviar = document.getElementById('btnEnviar');
  const emailInput = document.getElementById('emailUser');
  const resultadoDiv = document.getElementById('resultadoFinal');

  btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      alert('Por favor, digite um email válido.');
      return;
    }

    let acertos = 0;
    let erros = 0;

    const p1 = document.querySelector('input[name="pergunta1"]:checked');
    if (p1) { if (p1.value === gabarito['pergunta1']) acertos++; else erros++; } else erros++;

    const p2 = document.querySelector('input[name="pergunta2"]:checked');
    if (p2) { if (p2.value === gabarito['pergunta2']) acertos++; else erros++; } else erros++;

    const p3 = document.querySelector('input[name="pergunta3"]:checked');
    if (p3) { if (p3.value === gabarito['pergunta3']) acertos++; else erros++; } else erros++;

    const p4 = document.querySelector('input[name="pergunta4"]:checked');
    if (p4) { if (p4.value.replace(/\s+/g, '') === gabarito['pergunta4'].replace(/\s+/g, '')) acertos++; else erros++; } else erros++;

    const resultado = { acertos, erros, data: new Date().toLocaleString() };

    let banco = JSON.parse(localStorage.getItem('quizResultados') || '{}');
    banco[email] = resultado;
    localStorage.setItem('quizResultados', JSON.stringify(banco));

    document.getElementById('campoAcertos').value = acertos;
    document.getElementById('campoErros').value = erros;

    const respostasResumo = 
      `Pergunta1: ${p1 ? p1.value : 'sem resposta'}\n` +
      `Pergunta2: ${p2 ? p2.value : 'sem resposta'}\n` +
      `Pergunta3: ${p3 ? p3.value : 'sem resposta'}\n` +
      `Pergunta4: ${p4 ? p4.value : 'sem resposta'}`;
    document.getElementById('campoResumo').value = respostasResumo.trim();

    resultadoDiv.innerHTML = `
      <p><strong>Resultado para ${email}</strong></p>
      <p>Acertos: ${acertos}</p>
      <p>Erros: ${erros}</p>
      <p>Seu resultado foi salvo com sucesso!</p>
    `;

    document.getElementById('quizForm').submit(); // corrigido
  });
});
