/*
 *             AfterClass 8 - Repaso general + Manipulación DOM
 *
 *   El siguiente archivo realiza las siguientes funciones:
 *   1- Accede a elementos HTML utilizando querySelector()
 *   2- Utiliza una clase constructora para genera un objeto predefinido
 *   3- Utiliza un array para almacenar los objetos
 *   4- Utiliza una función para crear un objeto utilizando el modelo predefinido,
 *      tomando los datos necesarios con prompt()
 *   5- Utiliza una función para imprimir el DOM los objetos almacenados en el array
 *      iterando con el método forEach()
 *   6- Clona nodos html y edita clases css
 *
 */

// urls para las imágenes
const male = "https://randomuser.me/api/portraits/men/64.jpg";
const female = "https://randomuser.me/api/portraits/women/64.jpg";

// accedo al HTML con querySelector
const template = document.querySelector("#template").content;
const container = document.querySelector(".container");

// creo array vacío donde se guardarán los usuarios
const userList = [];

// clase para crear el objeto User
class User {
	constructor(userName, lastname, age, gender, darkTheme) {
		this.userName = userName;
		this.lastname = lastname;
		this.age = age;
		this.gender = gender;
		this.darkTheme = darkTheme;
	}
}

// función para crear usuarios y guardarlos en array
function createUser() {
	// ingreso del nombre
	let userName = prompt("Ingrese su nombre");
	while (!isNaN(userName) || !userName) {
    // invierto el resultado de isNaN con el operador "not" ( ! ), y lo mismo con userName
    // para que se ejecute el while cuando esas condiciones (invertidas con el !) se cumplan
		userName = prompt(`Entrada inválida! Vuelva a intentarlo.
    Ingrese su nombre`);
	}

	// ingreso del apellido
	let lastname = prompt("Ingrese su apellido");
	while (!isNaN(lastname) || !lastname) {
    // misma lógica que el while de userName
		lastname = prompt(`Entrada inválida! Vuelva a intentarlo.
    Ingrese su apellido`);
	}

	// ingreso de edad
	let age = parseInt(prompt("Ingrese su edad en números"));
	while (isNaN(age) || age < 13) {
    // permito solo entrada de números con el isNaN, y solo mayores de 13 años
		age = parseInt(
			prompt(`Entrada inválida! Vuelva a intentarlo.
    Ingrese su edad en números`)
		);
	}

	//ingreso de genero
	let gender = parseInt(
		prompt(`Elija una opción:
    Ingrese 1 para Género Masculino
    Ingreso 2 para Género Femenino`)
	);

	while (isNaN(gender) || gender > 2 || gender < 1) {
    // permito sólo numeros, que no sean mayores que dos ni menores que uno
		gender = parseInt(
			prompt(`Entrada inválida! Vuelva a intentarlo.
    Ingrese 1 para Género Masculino
    Ingreso 2 para Género Femenino`)
		);
	}

	// en el after class exploramos 3 formas de utilizar el if. Queda habilitada la primera por ser
	// la que escribí originalmente, pero las 3 funcionan exactamente igual.

	// #1 Estilo "clausura"(closure). Muy simple, una línea para cada condición (no usa else, ni elseIf)
	if (gender === 1) gender = "male";
	if (gender === 2) gender = "female";

	// #2 Un if comun y corriente, usando else
	/*

  if (gender === 1) {
		gender = "male";
	} else {
		gender = "female";
	}

  */

	// #3 Utilizando el Operador Ternaio.
	/*
	
  gender === 1 ? (gender = "male") : (gender = "female");
  
  */

	// ingreso darkTheme. Toma *true* o *false*
	let darkTheme = confirm("Quiere activar el tema oscuro?");

	// pusheo un nuevo objeto User al array userList
	userList.push(new User(userName, lastname, age, gender, darkTheme));
	console.log(userList);
}

// función para imprimir usuarios al HTML
function printUsers() {
	userList.forEach((user) => {
		// uso del metodo forEach para iterar sobre el array de usuarios, y rellenar el html con esos datos
		template.querySelector("#name").textContent = user.userName;
		template.querySelector("#lastname").textContent = user.lastname;
		template.querySelector("#age").textContent = user.age;

		// Seleccionar imagen según gender. Las URLs están guardadas en las variables male y female
    // al principio del código. 
		if (user.gender === "male") {
			template.querySelector("img").setAttribute("src", male);
		} else {
			template.querySelector("img").setAttribute("src", female);
		}

		// si el user seleccionó el DarkTheme, se le aplica a su card la clase "darkTheme"
    // como esto queda grabado en el template, en el *else* nos encargamos de borrar la clase
    // cuando el usuario NO quiera el darkTheme (que estaría seteado como *false*)

		let card = template.querySelector(".card"); // accede al elemento con clase "card" adentro del template
		if (user.darkTheme) {
			card.classList.add("darkTheme");
		} else {
			card.classList.remove("darkTheme");
		}

		// clono el template modificado
		let clone = document.importNode(template, true);

		// agrege el nodo clonado al HTML, como hijo del nodo con clase "container"
		container.appendChild(clone);
	});
}

// función que ejecuta el proceso principal del programa
function mainFunction() {
	// bienvenida al programa
	alert("A continuación, deberá registrarse");

	// ciclo for para cargar 3 usuarios
	for (let i = 0; i < 1; i++) {
		createUser();
		console.log("Usuario creado correctamente");
	}
	console.log("Todos los usuarios han sido cargados");
	// imprimo los usuarios cargados
	printUsers();
	console.log("Todos los usuarios se imprimieron en el HTML");
}

// Ejecución de la función principal
mainFunction();
