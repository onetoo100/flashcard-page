const createCardsSection = document.querySelector('a[href^="#create-cards'),
  form = document.querySelector(".form"),
  practiceCardsSection = document.querySelector('a[href^="#practice-cards'),
  practice = document.querySelector(".practice"),
  card = document.querySelector(".practice__board"),
  alertMsg = document.createElement("p"),
  formCreate = document.querySelector(".form__create"),
  front = document.querySelector(".front"),
  back = document.querySelector(".back"),
  frontCard = document.querySelector(".front-card"),
  backCard = document.querySelector(".back-card"),
  btn = document.querySelector(".practice__btn");

let cards = [];

/* Functions */
function ramdonCard() {
  var currentIndex = frontCard.value || 1;
  var ramdonCard =
    cards[Math.abs(Math.round(Math.random() * cards.length - 1))];

  /* if ramdom brings the same, change to the different one */
  if (currentIndex === ramdonCard.id)
    ramdonCard = cards[Math.abs(Math.round(Math.random() * cards.length - 1))];

  frontCard.textContent = ramdonCard.front;
  frontCard.value = ramdonCard.id;
  backCard.textContent = ramdonCard.back;
  backCard.value = ramdonCard.id;
}

function createCard() {
  /* create an object to add my cards */
  objCard = {
    id: Date.now(),
    front: front.value,
    back: back.value,
  };

  /* add the object in my array using destructuring JS.
    after it, load the cards to practice with the first one */
  cards = [...cards, objCard];
  ramdonCard();

  /* add the array in the LocalStorage */
  localStorage.setItem("cards", JSON.stringify(cards));

  /* clean the fields */
  formCreate.reset();

  /* create the msg */
  alertMsg.textContent = "Created";
  alertMsg.classList.add("success");

  formCreate.appendChild(alertMsg);

  setTimeout(() => {
    alertMsg.remove();
  }, 500);
}

function validateForm() {
  if (front.value === "" || back.value === "") {
    alertMsg.textContent = "Empty fields";
    alertMsg.classList.add("error");

    formCreate.appendChild(alertMsg);

    setTimeout(() => {
      alertMsg.remove();
    }, 700);
    return false;
  }
  return true;
}

/* Events */
createCardsSection.addEventListener("click", (e) => {
  e.preventDefault();

  form.scrollIntoView({
    behavior: "smooth",
  });
});

practiceCardsSection.addEventListener("click", (e) => {
  e.preventDefault();

  practice.scrollIntoView({
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  cards = JSON.parse(localStorage.getItem("cards")) || [];
  ramdonCard();
});

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    createCard();
  }
});

btn.addEventListener("click", () => {
  if (card.classList.length === 2) {
    card.classList.toggle("flipCard");
    setTimeout(() => {
      ramdonCard();
    }, 600);
  } else {
    ramdonCard();
  }
});

card.addEventListener("click", (e) => {
  card.classList.toggle("flipCard");
});
