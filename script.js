
const questions = [
    {
        q: "¿Qué lenguaje se ejecuta principalmente en el navegador?",
        a: [
            "Java",
            "Python",
            "JavaScript",
            "C++"
        ],
        c: 2
    },

    {
        q: "¿Qué etiqueta HTML se usa para crear un enlace?",
        a: [
            "<link>",
            "<a>",
            "<url>",
            "<href>"
        ],
        c: 1
    },

    {
        q: "¿Qué estructura permite repetir código mientras una condición sea verdadera?",
        a: [
            "if",
            "switch",
            "while",
            "class"
        ],
        c: 2
    },

    {
        q: "¿Qué tecnología se utiliza para dar estilos a una página web?",
        a: [
            "HTML",
            "CSS",
            "SQL",
            "JSON"
        ],
        c: 1
    },

    {
        q: "¿Qué método de JavaScript convierte un texto JSON en un objeto?",
        a: [
            "JSON.parse()",
            "JSON.object()",
            "JSON.convert()",
            "JSON.toObject()"
        ],
        c: 0
    }
];


// ========================================
// VARIABLES DEL JUEGO
// ========================================

let index = 0;
let score = 0;
let time = 30;
let timer = null;
let answered = false;


// ========================================
// FUNCIÓN PARA OBTENER ELEMENTOS
// ========================================

const $ = (id) => document.getElementById(id);


// ========================================
// INICIAR JUEGO
// ========================================

function start() {

    index = 0;

    score = 0;

    $("start").classList.add("hidden");

    $("end").classList.add("hidden");

    $("game").classList.remove("hidden");

    loadQuestion();
}


// ========================================
// CARGAR PREGUNTA
// ========================================

function loadQuestion() {

    clearInterval(timer);

    answered = false;

    time = 30;

    const currentQuestion = questions[index];


    // Información superior

    $("level").textContent =
        `Nivel ${index + 1}/${questions.length}`;

    $("score").textContent = score;

    $("time").textContent = time;


    // Barra de progreso

    const progress =
        (index / questions.length) * 100;

    $("fill").style.width =
        `${progress}%`;


    // Pregunta

    $("question").textContent =
        currentQuestion.q;


    // Limpiar mensajes

    $("feedback").textContent = "";

    $("feedback").className = "feedback";


    // Ocultar botón siguiente

    $("nextBtn").classList.add("hidden");


    // Limpiar respuestas anteriores

    $("answers").innerHTML = "";


    // Crear respuestas

    currentQuestion.a.forEach((answerText, i) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = "answer";

        button.textContent =
            `${String.fromCharCode(65 + i)}) ${answerText}`;

        button.addEventListener(
            "click",
            () => answer(i, button)
        );

        $("answers").appendChild(button);

    });


    // Iniciar temporizador

    timer = setInterval(() => {

        time--;

        $("time").textContent = time;

        if (time <= 0) {

            clearInterval(timer);

            if (!answered) {

                answer(-1, null);

            }

        }

    }, 1000);
}


// ========================================
// RESPONDER
// ========================================

function answer(choice, clickedButton) {

    if (answered) {
        return;
    }

    answered = true;

    clearInterval(timer);

    const correct =
        questions[index].c;


    // Desactivar todos los botones

    [...$("answers").children].forEach(
        (button, i) => {

            button.disabled = true;

            if (i === correct) {

                button.classList.add("correct");

            }

        }
    );


    // RESPUESTA CORRECTA

    if (choice === correct) {

        score += 100;

        $("score").textContent = score;

        $("feedback").textContent =
            "✅ ¡Correcto! +100 puntos";

        $("feedback").className =
            "feedback good";

    }


    // RESPUESTA INCORRECTA

    else {

        if (choice === -1) {

            $("feedback").textContent =
                "⏰ Se acabó el tiempo.";

        } else {

            $("feedback").textContent =
                "❌ Incorrecto. La respuesta correcta está marcada.";

        }

        $("feedback").className =
            "feedback bad";


        if (clickedButton) {

            clickedButton.classList.add("wrong");

        }

    }


    // Mostrar siguiente

    $("nextBtn").classList.remove("hidden");
}


// ========================================
// SIGUIENTE PREGUNTA
// ========================================

$("nextBtn").addEventListener(
    "click",
    () => {

        index++;

        if (index < questions.length) {

            loadQuestion();

        } else {

            finish();

        }

    }
);


// ========================================
// FINALIZAR JUEGO
// ========================================

function finish() {

    clearInterval(timer);

    $("game").classList.add("hidden");

    $("end").classList.remove("hidden");


    $("finalScore").textContent =
        score;


    $("finalText").textContent =
        `Respondiste correctamente ${score / 100} de ${questions.length} preguntas.`;

}


// ========================================
// BOTÓN COMENZAR
// ========================================

$("startBtn").addEventListener(
    "click",
    start
);


// ========================================
// BOTÓN REINICIAR
// ========================================

$("restartBtn").addEventListener(
    "click",
    start
);
