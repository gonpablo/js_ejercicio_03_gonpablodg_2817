// Capturando Elementos
const inputPizza = document.getElementById("input-pizza");
const formPizzas = document.getElementById("form-pizzas");
const formResult = document.getElementById("form-result");


const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

// Guardar en LocalStorage
const saveLocalStorage = (i) => {
	  localStorage.setItem("pizzas", JSON.stringify(i));
};


// Funciones auxiliares
const IsEmptyInput = (input) => {
  return input.value === "";
}

const IsValidInput = (input) => {
    return pizzas.some((pizza) => pizza.id == input.value.trim());
} 


// Funciones principales
const showAlert = (message) => {
  return formResult.innerHTML = `
  <div class="alert alert-danger" style="margin-top: 40px;">
    ${message}
  </div>`;
}

const capturePizzaValid = (input) => {
  const pizzaFilter = pizzas.filter((pizza) => pizza.id == input.value.trim());
  return pizzaFilter;
}
 

const showCard = (pizza) => {
    return formResult.innerHTML = `
    <div class="card" style="width: 50%; margin-top: 40px;">
      <img src="${pizza.imagen}" class="card-img-top">
      <div class="card-body">
          <h5 class="card-title">${pizza.id}. ${pizza.nombre}</h5>
          <p class="card-text">${pizza.ingredientes.join("<br>")}</p>
          <h5><strong>$ ${pizza.precio}</strong></h5>
      </div>
    </div>`;
}


const checkInput = (input) => {
  let flag = false;

  if (IsEmptyInput(input)) {
      showAlert("El input esta vacio. Ingrese algun numero por favor.");
      return;    
  } 

  if (!IsValidInput(input)) {
       showAlert(`El rango no es valido. Es valido desde ${pizzas[0].id} hasta ${pizzas[pizzas.length-1].id}`);
       return;
  }

  if (capturePizzaValid(input) !== null) {
    capturePizzaValid(input).forEach((pizza) => {
      return showCard(pizza);
    }); 
  }

  flag = true;
  return flag;
}



// Validacion y almacenamiento de datos
const showPizzas = (e) => {
  e.preventDefault();  
  let checkInputValid = checkInput(inputPizza);

  if (checkInputValid) {
      saveLocalStorage(capturePizzaValid(inputPizza));
  }
}

// Validacion de LocalStorage en caso de estar con algun elemento
const checkLocalStorage = (jsonElement) => {
  if(jsonElement !== null) {
    jsonElement.forEach((i) => {
      showCard(i);
    }); 
  } 
}


// Inicializacion de eventos
const init = () => {
  formPizzas.addEventListener("submit", showPizzas);
  document.addEventListener("DOMContentLoaded", checkLocalStorage(JSON.parse(localStorage.getItem("pizzas")))); 
}

init();