# FinanzasPro 📊 - Simulador de Finanzas Personales

**FinanzasPro** es una aplicación web interactiva diseñada para ayudar a los usuarios a proyectar su salud financiera mensual y anual, calcular el tiempo estimado para alcanzar metas de ahorro y recibir recomendaciones automáticas basadas en sus hábitos de consumo.

Proyectado como un componente de portafolio profesional, enfocado en buenas prácticas, arquitectura modular y diseño responsivo.

🚀 **Link del Proyecto en Vivo:** [Ver Simulación en Vivo](TU_ENLACE_DE_GITHUB_PAGES_AQUÍ)

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructuración semántica avanzada para accesibilidad.
* **CSS3 Premium:** Diseño basado en variables de entorno, Flexbox, CSS Grid y soporte nativo para **Modo Oscuro** (`data-theme`).
* **JavaScript Puro (ES6+):** Manipulación limpia del DOM, persistencia de datos y modularización lógica.

## 🧠 Arquitectura del Software

El proyecto aplica el **Principio de Responsabilidad Única**, aislando la lógica matemática de la interfaz de usuario:

* `/index.html`: Punto de entrada y estructura semántica.
* `/css/styles.css`: Sistema de diseño agnóstico al tema (Claro/Oscuro).
* `/js/calculator.js`: Motor matemático puro (módulo financiero documentado con JSDoc).
* `/js/app.js`: Cerebro del sistema, control de eventos, validación y persistencia.

## 🌟 Características Principales

1. **Validación Blindada:** Control estricto sobre entradas nulas, vacías o valores financieros negativos.
2. **Motor de Consejos Inteligente:** Reporte automatizado del estado financiero del usuario basado en proporciones de ahorro reales.
3. **Persistencia Total (LocalStorage):** Guarda automáticamente los datos del balance e incluso la preferencia del Modo Oscuro al recargar la página.
4. **Formateo Monetario Profesional:** Implementación de la API nativa `Intl.NumberFormat` para visualización estandarizada en USD.

---

## 🧑‍💻 Instalación Local

Si deseas ejecutar este proyecto localmente para auditar el código:

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/JFDevStudio/simulador-finanzas.git](https://github.com/JFDevStudio/simulador-finanzas.git)