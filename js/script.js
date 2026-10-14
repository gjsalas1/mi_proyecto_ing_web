
// ========================================
// 1. MENÚ RESPONSIVE
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    const abierto = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(abierto));
    menuToggle.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
    );

    menuToggle.textContent = abierto ? "✕" : "☰";
});

// Cerrar el menú al seleccionar una sección
navMenu.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
    });
});


// ========================================
// 2. COPIAR COMANDOS AL PORTAPAPELES
// ========================================

const copyMessage = document.getElementById("copyMessage");

async function copiarTexto(texto) {
    try {
        await navigator.clipboard.writeText(texto);
        copyMessage.textContent = "✓ Comando copiado correctamente";
    } catch (error) {
        // Alternativa para navegadores sin acceso al portapapeles
        const area = document.createElement("textarea");
        area.value = texto;
        area.style.position = "fixed";
        area.style.left = "-9999px";

        document.body.appendChild(area);
        area.select();

        try {
            const copiado = document.execCommand("copy");

            copyMessage.textContent = copiado
                ? "✓ Comando copiado correctamente"
                : "No se pudo copiar. Selecciona el comando manualmente.";
        } catch (errorCopia) {
            copyMessage.textContent =
                "No se pudo copiar. Selecciona el comando manualmente.";
        }

        area.remove();
    }
}

// Botones individuales
document.querySelectorAll("[data-copy]").forEach(function (boton) {
    boton.addEventListener("click", function () {
        copiarTexto(boton.dataset.copy);
    });
});

// Copiar todos los comandos de ejemplo
document.getElementById("copyAll").addEventListener("click", function () {
    const comandos = [
        "git init",
        "git clone URL",
        "git status",
        "git add .",
        'git commit -m "mensaje"',
        "git pull",
        "git push"
    ].join("\n");

    copiarTexto(comandos);
});


// ========================================
// 3. CONSEJOS ALEATORIOS
// ========================================

const consejos = [
    "Realiza commits pequeños y utiliza mensajes claros para recordar qué cambiaste en cada versión.",
    "Antes de empezar a trabajar, utiliza git status para conocer el estado de tus archivos.",
    "Crea una rama nueva para desarrollar una funcionalidad sin modificar directamente la rama principal.",
    "Usa git pull para obtener e integrar los cambios remotos antes de continuar trabajando, cuando corresponda.",
    "Nunca compartas contraseñas, tokens ni claves privadas dentro de tu repositorio.",
    "Escribe un archivo README.md para explicar qué hace tu proyecto y cómo ejecutarlo."
];

let ultimoConsejo = -1;

document.getElementById("newTip").addEventListener("click", function () {
    let indice;

    do {
        indice = Math.floor(Math.random() * consejos.length);
    } while (consejos.length > 1 && indice === ultimoConsejo);

    ultimoConsejo = indice;
    document.getElementById("tipText").textContent = consejos[indice];
});


// ========================================
// 4. CUESTIONARIO INTERACTIVO
// ========================================

const preguntas = [
    {
        pregunta: "¿Qué comando registra cambios en el historial de Git?",
        opciones: ["git push", "git commit", "git clone"],
        correcta: 1,
        explicacion: "¡Correcto! git commit registra los cambios preparados en el historial local."
    },
    {
        pregunta: "¿Qué es GitHub?",
        opciones: [
            "Un lenguaje de programación",
            "Un editor de imágenes",
            "Una plataforma para alojar repositorios Git"
        ],
        correcta: 2,
        explicacion: "¡Muy bien! GitHub permite alojar repositorios y colaborar en proyectos."
    },
    {
        pregunta: "¿Qué comando prepara archivos para el próximo commit?",
        opciones: ["git add", "git pull", "git log"],
        correcta: 0,
        explicacion: "¡Correcto! git add prepara los cambios en el área de preparación o staging."
    },
    {
        pregunta: "¿Qué comando envía commits al repositorio remoto?",
        opciones: ["git init", "git push", "git status"],
        correcta: 1,
        explicacion: "¡Exacto! git push publica los commits en el repositorio remoto configurado."
    },
    {
        pregunta: "¿Para qué sirve una rama o branch?",
        opciones: [
            "Para borrar todos los archivos",
            "Para cambiar el nombre de GitHub",
            "Para trabajar en una línea de desarrollo independiente"
        ],
        correcta: 2,
        explicacion: "¡Excelente! Las ramas permiten desarrollar cambios sin afectar inmediatamente la rama principal."
    }
];

let preguntaActual = 0;
let puntuacion = 0;
let respondida = false;

const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizScore = document.getElementById("quizScore");
const nextQuestion = document.getElementById("nextQuestion");

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];

    quizQuestion.textContent =
        (preguntaActual + 1) + ". " + pregunta.pregunta;

    quizOptions.innerHTML = "";
    quizFeedback.textContent = "";
    nextQuestion.hidden = true;
    respondida = false;

    pregunta.opciones.forEach(function (opcion, indice) {
        const boton = document.createElement("button");

        boton.className = "quiz-option";
        boton.textContent = opcion;
        boton.dataset.answer = indice;

        boton.addEventListener("click", function () {
            responder(indice);
        });

        quizOptions.appendChild(boton);
    });

    quizScore.textContent =
        "Puntuación: " + puntuacion + " / " + preguntas.length;
}

function responder(indice) {
    if (respondida) return;

    respondida = true;

    const pregunta = preguntas[preguntaActual];
    const botones = quizOptions.querySelectorAll(".quiz-option");

    botones.forEach(function (boton) {
        boton.disabled = true;

        if (Number(boton.dataset.answer) === pregunta.correcta) {
            boton.classList.add("correct");
        }
    });

    if (indice === pregunta.correcta) {
        puntuacion++;
        quizFeedback.textContent = "✓ " + pregunta.explicacion;
        quizFeedback.style.color = "#51e2b1";
    } else {
        botones[indice].classList.add("incorrect");
        quizFeedback.textContent =
            "✗ Respuesta incorrecta. " + pregunta.explicacion;
        quizFeedback.style.color = "#ff8a78";
    }

    quizScore.textContent =
        "Puntuación: " + puntuacion + " / " + preguntas.length;

    nextQuestion.hidden = false;

    nextQuestion.textContent =
        preguntaActual === preguntas.length - 1
            ? "Ver resultado"
            : "Siguiente pregunta →";
}

nextQuestion.addEventListener("click", function () {
    if (preguntaActual < preguntas.length - 1) {
        preguntaActual++;
        mostrarPregunta();
        return;
    }

    quizQuestion.textContent = "¡Has terminado el cuestionario!";

    quizOptions.innerHTML = "";
    quizFeedback.textContent =
        puntuacion >= 4
            ? "¡Excelente trabajo! Dominas los conceptos básicos."
            : "¡Buen intento! Repasa los conceptos y vuelve a intentarlo.";

    quizFeedback.style.color = "#51e2b1";

    quizScore.textContent =
        "Resultado final: " + puntuacion + " de " + preguntas.length;

    nextQuestion.textContent = "Repetir cuestionario";
    nextQuestion.hidden = false;

    // El siguiente clic reinicia el cuestionario
    nextQuestion.onclick = function () {
        preguntaActual = 0;
        puntuacion = 0;

        nextQuestion.onclick = null;
        mostrarPregunta();
    };
});

// Mostrar la primera pregunta al cargar la página
mostrarPregunta();


// ========================================
// 5. MARCAR LA SECCIÓN ACTIVA EN EL MENÚ
// ========================================

const secciones = document.querySelectorAll("main section[id]");
const enlacesMenu = navMenu.querySelectorAll("a");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (!entrada.isIntersecting) return;

            enlacesMenu.forEach(function (enlace) {
                const activo =
                    enlace.getAttribute("href") ===
                    "#" + entrada.target.id;

                enlace.classList.toggle("active", activo);
            });
        });
    }, {
        rootMargin: "-25% 0px -60% 0px"
    });

    secciones.forEach(function (seccion) {
        observador.observe(seccion);
    });
}
