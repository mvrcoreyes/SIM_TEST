const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const fileData = e.target.result;
    processData(fileData);
  };

  reader.readAsText(file);
});

// funcion que recibe data como parametro el cual realiza varias operaciones especificas
function processData(data) {
  const lines = data.trim().split("\n"); // aqui se toma la cadena de texto para luego eliminar los espacios en blanco al inicio y al final y luego los divide en lineas individuales usando el salto de linea como separador
  const maximums = { red: 12, green: 13, blue: 14 }; // con este obj definimos los valores maximos para cada color.

  // inicializamos las variables sum1 y sum2
  let sum1 = 0;
  let sum2 = 0;

  lines.forEach((line) => {
    line = line.trim().substring(5); // Aqui eliminamos los primeros 5 caracteres de cada linea
    line = line.replace(/[,:;]/g, ""); // y aqui eliminamos los caracteres : ; y , de cada linea

    const maxline = { red: 0, green: 0, blue: 0 }; // inicializamos el obj para contener los valores maximos encontrados
    let valid = true;
    const parts = line.split(" ");
    const number = parseInt(parts[0]);

    // Aqui basicamente se itera sobre cada parte de la línea, y si la parte es un color ("red", "green" o "blue"),
    // se verifica si el valor anterior es mayor que el máximo permitido para ese color. Si lo es,
    // la bandera valid se establece en false, de lo contrario, se actualiza el máximo para ese color en maxline.
    // Si la línea es válida, se suma el número al contador sum1, y se multiplica los máximos de rojo, verde y azul
    // encontrados en la línea y se suma al contador sum2.
    parts.forEach((part, idx) => {
      if (["red", "green", "blue"].includes(part)) {
        const value = parseInt(parts[idx - 1]);
        if (value > maximums[part]) valid = false;
        if (value > maxline[part]) maxline[part] = value;
      }
    });

    if (valid) sum1 += number;
    sum2 += maxline["red"] * maxline["green"] * maxline["blue"];
  });

  // imprimimos resultados en la consola.
  console.log("part 1 = " + sum1);
  console.log("part 2 = " + sum2);
}
