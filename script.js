// Analiza el archivo de texto y actualiza las ocho filas de resultados.
const PATRON_PALABRAS = /[a-zñáéíóúü]+/g;
const PATRON_VOCALES = /[aeiouáéíóúü]/g;
const PATRON_CONSONANTES = /[bcdfghjklmnñpqrstvwxyz]/g;
const PATRON_LAZARO = /(?<![a-zñáéíóúü])lázaro(?![a-zñáéíóúü])/g;
const PATRON_CIEGO = /(?<![a-zñáéíóúü])ciego(?![a-zñáéíóúü])/g;
const PATRON_CLERIGO = /(?<![a-zñáéíóúü])clérigo(?![a-zñáéíóúü])/g;
const PATRON_ARCIPRESTE = /(?<![a-zñáéíóúü])arcipreste(?![a-zñáéíóúü])/g;
const PATRON_MI_MUJER = /(?<![a-zñáéíóúü])mi\s+mujer(?![a-zñáéíóúü])/g;

function contar(texto, patron) {
    return texto.match(patron)?.length ?? 0;
}

function mostrarResultado(id, cantidad) {
    document.getElementById(id).textContent = cantidad.toLocaleString("es-ES");
}

async function analizarTexto() {
    const estado = document.getElementById("estado");

    try {
        const respuesta = await fetch("lazarillo_limpio.txt");
        if (!respuesta.ok) {
            throw new Error("La respuesta del servidor no fue correcta.");
        }

        const texto = (await respuesta.text()).normalize("NFC").toLowerCase();
        const resultados = [
            ["total-palabras", contar(texto, PATRON_PALABRAS)],
            ["total-vocales", contar(texto, PATRON_VOCALES)],
            ["total-consonantes", contar(texto, PATRON_CONSONANTES)],
            ["menciones-lazaro", contar(texto, PATRON_LAZARO)],
            ["menciones-ciego", contar(texto, PATRON_CIEGO)],
            ["menciones-clerigo", contar(texto, PATRON_CLERIGO)],
            ["menciones-arcipreste", contar(texto, PATRON_ARCIPRESTE)],
            ["menciones-mi-mujer", contar(texto, PATRON_MI_MUJER)]
        ];

        resultados.forEach(([id, cantidad]) => mostrarResultado(id, cantidad));
        estado.textContent = "Análisis completado.";
    } catch {
        estado.textContent = "No se ha podido cargar el archivo lazarillo_limpio.txt.";
        estado.classList.add("error");
    }
}

analizarTexto();
