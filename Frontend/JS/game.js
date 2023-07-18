const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  ['CO2', "O setor da aviação contribui com 2%, mesmo com o grande incentivo e com as melhorias contínuas na criação e no desenvolvimento de combustíveis sustentáveis que diminuam o impacto ambiental desse meio de transporte, o qual cresce cada vez mais. É necessário pesquisar mais sobre possibilidades e alternativas de mitigar os riscos que o desenvolvimento futuro deste setor pode trazer para o impacto ambiental futuro."],
  ['baixa octanagem', "A sua baixa octanagem - propriedade muito importante utilizada para medir a qualidade de um combustível - devida ao fato da unidade-base para medição de octanagem ser utilizado um heptano que é muito próximo em termos de estrutura molecular do n-octano, este possui octanagem 0% sendo necessário minimamente uma octanagem acima de 99% para ser considerado um combustível de qualidade para a aviação. No entanto há uma maneira de fazer com que este hidrocarboneto adquira melhores condições de octanagem através da utilização de isômeros que possuem quantidade elevada de octanagem, a exemplo o 2,2,4-trimetil-pentano que possui octanagem de 100%. "],
  ['estrutura', "A estrutura química do n-octano é um fator muito importante  quando se analisa os principais hidrocarbonetos utilizados em combustíveis devido ao processo de craqueamento feito nas refinarias de petróleo para a produção dessas moléculas."],
  ['fontes renováveis', "O n-octano pode ser produzido através de biomassa o que é fundamental para mitigar a dependência de combustíveis de origem fóssil presente atualmente na sociedade. "],
  ['n-octano', "Apesar de também poder ser de origem fóssil, este eletro combustível possui características e vantagens muito relevantes quando se comparado a outras soluções, vantagens que não se limitam a apenas propriedades comparativas mas para fatores ligados indiretamente como adaptação de infraestrutura e armazenamento"]
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter[0] === secondCharacter[0]) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    Swal.fire({
      title: `<strong> ${firstCharacter[0]} </strong>`,
      icon: 'success',
      html: `${firstCharacter[1]}`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Boa!',
    })

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../IMG/${character[0]}.png')`;



  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
