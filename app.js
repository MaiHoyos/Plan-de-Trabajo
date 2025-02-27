
// Función para capturar todos los datos del formulario
function capturarDatosFormulario() {
  // Información del profesor
  const datosProfesor = {
    facultad: document.querySelector(".sidebar-header + .table-container table tr:nth-child(1) td:nth-child(2)")
      .innerText,
    escuela: document.querySelector(".sidebar-header + .table-container table tr:nth-child(2) td:nth-child(2)")
      .innerText,
    programa: document.querySelector(".sidebar-header + .table-container table tr:nth-child(3) td:nth-child(2)")
      .innerText,
    nombre: document.querySelector(".sidebar-header + .table-container table tr:nth-child(4) td:nth-child(2)")
      .innerText,
    identificacion: document.querySelector(".sidebar-header + .table-container table tr:nth-child(5) td:nth-child(2)")
      .innerText,
  }

  // Datos de Docencia
  const datosDocencia = obtenerDatosDocencia()

  // Datos de Investigación
  const datosInvestigacion = obtenerDatosInvestigacion()

  // Datos de Extensión
  const datosExtension = obtenerDatosExtension()

  // Datos de Actividades Académico Administrativas
  const datosAcademico = obtenerDatosAcademico()

  // Combinar todos los datos
  const datosTotales = {
    profesor: datosProfesor,
    docencia: datosDocencia,
    investigacion: datosInvestigacion,
    extension: datosExtension,
    academico: datosAcademico,
    totalHorasGeneral: document.getElementById("totalHorasGeneral").innerText.replace("Total Horas General: ", ""),
  }

  return datosTotales
}

// Función para obtener datos de la sección de Docencia
function obtenerDatosDocencia() {
  const filas = document.querySelectorAll('#docencia table tbody tr:not([style*="display: none"])')
  const datos = []

  filas.forEach((fila) => {
    if (fila.cells && fila.cells.length > 8) {
      const datosFila = {
        año: fila.cells[0].querySelector("select")
          ? fila.cells[0].querySelector("select").value
          : fila.cells[0].innerText,
        periodo: fila.cells[1].querySelector("select")
          ? fila.cells[1].querySelector("select").value
          : fila.cells[1].innerText,
        codigo: fila.cells[2].innerText,
        grupo: fila.cells[3].innerText,
        asignatura: fila.cells[4].querySelector("select")
          ? fila.cells[4].querySelector("select").value
          : fila.cells[4].innerText,
        horasClase: fila.cells[5].innerText,
        horasAsesoria: fila.cells[6].innerText,
        horasSemestrales: fila.cells[7].innerText,
        horario: fila.cells[8].innerText,
        indicador: fila.cells[9] ? fila.cells[9].innerText : "",
      }
      datos.push(datosFila)
    }
  })

  // Obtener datos de trabajos de grado si están visibles
  const trabajosGrado = obtenerDatosTrabajosGrado()

  return {
    clases: datos,
    trabajosGrado: trabajosGrado,
    totalHoras: document.getElementById("totalHoras").innerText.replace("Total Horas: ", ""),
  }
}

// Función para obtener datos de trabajos de grado
function obtenerDatosTrabajosGrado() {
  const container = document.getElementById("thesisDirectionTableContainer")
  if (!container || container.style.display === "none") {
    return []
  }

  const filas = container.querySelectorAll("tbody tr:not(:last-child)")
  const datos = []

  filas.forEach((fila) => {
    if (fila.cells && fila.cells.length > 7) {
      const datosFila = {
        codigo: fila.cells[0].innerText,
        titulo: fila.cells[1].innerText,
        proyecto: fila.cells[2].innerText,
        autor: fila.cells[3].innerText,
        nivel: fila.cells[4].innerText,
        fechaInicio: fila.cells[5].innerText,
        horasSemanales: fila.cells[6].innerText,
        horasSemestre: fila.cells[7].innerText,
        indicador: fila.cells[8] ? fila.cells[8].innerText : "",
      }
      datos.push(datosFila)
    }
  })

  return datos
}

// Funciones para obtener datos de las otras secciones
function obtenerDatosInvestigacion() {
  // Implementación similar a las funciones anteriores
  // Captura datos de las tablas visibles en la sección de investigación
  const tablas = document.querySelectorAll('#tab2 table:not([style*="display: none"])')
  const datos = {}

  tablas.forEach((tabla) => {
    const titulo = tabla.querySelector("tr.sub-header td").innerText
    const filas = tabla.querySelectorAll("tr:not(.sub-header):not(:last-child)")
    const datosTabla = []

    filas.forEach((fila) => {
      if (fila.cells && fila.cells.length > 2) {
        const datosFila = {}
        for (let i = 0; i < fila.cells.length - 3; i++) {
          datosFila[`campo${i}`] = fila.cells[i].innerText
        }
        datosTabla.push(datosFila)
      }
    })

    datos[titulo] = datosTabla
  })

  return {
    actividades: datos,
    totalHoras: document.getElementById("totalHorasInvestigacion").innerText.replace("Total Horas: ", ""),
  }
}

function obtenerDatosExtension() {
  // Implementación similar para la sección de extensión
  const tablas = document.querySelectorAll('#activitiesContainer table:not([style*="display: none"])')
  const datos = {}

  tablas.forEach((tabla) => {
    const titulo = tabla.querySelector('tr td[colspan="12"]').innerText
    const filas = tabla.querySelectorAll("tbody tr:not(:first-child):not(:last-child)")
    const datosTabla = []

    filas.forEach((fila) => {
      if (fila.cells && fila.cells.length > 2) {
        const datosFila = {
          descripcion: fila.cells[0].innerText,
          horasPlaneadas: fila.cells[1].innerText,
          indicador: fila.cells[2].innerText,
        }
        datosTabla.push(datosFila)
      }
    })

    datos[titulo] = datosTabla
  })

  return {
    actividades: datos,
    totalHoras: document.getElementById("totalHorasExtension").innerText.replace("Total Horas: ", ""),
  }
}

function obtenerDatosAcademico() {
  const filas = document.querySelectorAll('#tab4 table tbody tr:not(:last-child):not([style*="display: none"])')
  const datos = []

  filas.forEach((fila) => {
    if (fila.cells && fila.cells.length > 2) {
      const datosFila = {
        descripcion: fila.cells[0].innerText,
        horasPlaneadas: fila.cells[1].innerText,
        indicador: fila.cells[2].innerText,
      }
      datos.push(datosFila)
    }
  })

  return {
    actividades: datos,
    totalHoras: document.getElementById("totalHorasAcademico").innerText.replace("Total Horas: ", ""),
  }
}

// Función para guardar los datos en Google Sheets
function guardarEnGoogleSheets() {
  const datos = capturarDatosFormulario()
  const jsonData = JSON.stringify(datos)

  // Mostrar indicador de carga
  mostrarCargando(true)

  // Enviar datos al script de Google Apps Script
  fetch("https://script.google.com/macros/s/TU_ID_DE_IMPLEMENTACION/exec", {
    method: "POST",
    body: jsonData,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      mostrarCargando(false)
      if (data.result === "success") {
        mostrarMensaje("Datos guardados correctamente", "success")
      } else {
        mostrarMensaje("Error al guardar los datos: " + data.error, "error")
      }
    })
    .catch((error) => {
      mostrarCargando(false)
      mostrarMensaje("Error de conexión: " + error.message, "error")
      console.error("Error:", error)
    })
}

// Función para exportar los datos a Excel
function exportarAExcel() {
  const datos = capturarDatosFormulario()

  // Convertir datos a formato CSV
  let csv = "data:text/csv;charset=utf-8,"

  // Encabezados para información del profesor
  csv += "Facultad,Escuela,Programa,Nombre,Identificación\n"
  csv += `${datos.profesor.facultad},${datos.profesor.escuela},${datos.profesor.programa},${datos.profesor.nombre},${datos.profesor.identificacion}\n\n`

  // Encabezados para docencia
  csv += "DOCENCIA\n"
  csv += "Año,Periodo,Código,Grupo,Asignatura,Horas Clase,Horas Asesoría,Horas Semestrales,Horario,Indicador\n"

  // Datos de docencia
  datos.docencia.clases.forEach((clase) => {
    csv += `${clase.año},${clase.periodo},${clase.codigo},${clase.grupo},${clase.asignatura},${clase.horasClase},${clase.horasAsesoria},${clase.horasSemestrales},${clase.horario},${clase.indicador}\n`
  })

  // Continuar con el resto de secciones...

  // Crear enlace de descarga
  const encodedUri = encodeURI(csv)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `Plan_Trabajo_${datos.profesor.nombre}_${new Date().toISOString().split("T")[0]}.csv`)
  document.body.appendChild(link)

  // Descargar archivo
  link.click()

  // Eliminar enlace
  document.body.removeChild(link)
}

// Funciones de UI para mostrar mensajes y cargando
function mostrarMensaje(mensaje, tipo) {
  const mensajeDiv = document.createElement("div")
  mensajeDiv.className = `mensaje mensaje-${tipo}`
  mensajeDiv.innerText = mensaje

  document.body.appendChild(mensajeDiv)

  setTimeout(() => {
    mensajeDiv.classList.add("mostrar")

    setTimeout(() => {
      mensajeDiv.classList.remove("mostrar")
      setTimeout(() => {
        document.body.removeChild(mensajeDiv)
      }, 300)
    }, 3000)
  }, 100)
}

function mostrarCargando(mostrar) {
  let cargandoDiv = document.getElementById("cargando-overlay")

  if (mostrar) {
    if (!cargandoDiv) {
      cargandoDiv = document.createElement("div")
      cargandoDiv.id = "cargando-overlay"
      cargandoDiv.innerHTML = '<div class="cargando-spinner"></div><p>Guardando datos...</p>'
      document.body.appendChild(cargandoDiv)
    }
    cargandoDiv.style.display = "flex"
  } else if (cargandoDiv) {
    cargandoDiv.style.display = "none"
  }
}

// Inicializar botones de guardado
document.addEventListener("DOMContentLoaded", () => {
  // Agregar botones para guardar en la nube y exportar a Excel
  const botonesContainer = document.createElement("div")
  botonesContainer.className = "botones-guardado"
  botonesContainer.innerHTML = `
    <button id="guardarNube" class="btn-guardar-nube">Guardar en la nube</button>
    <button id="exportarExcel" class="btn-exportar-excel">Exportar a Excel</button>
  `

  // Insertar después del título
  const titulo = document.querySelector("h2")
  titulo.parentNode.insertBefore(botonesContainer, titulo.nextSibling)

  // Agregar event listeners
  document.getElementById("guardarNube").addEventListener("click", guardarEnGoogleSheets)
  document.getElementById("exportarExcel").addEventListener("click", exportarAExcel)
})

