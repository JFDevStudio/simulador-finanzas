// ==========================================================================
// 1. CAPTURA DE ELEMENTOS DEL DOM
// ==========================================================================
const financeForm = document.getElementById('finance-form');
const incomeInput = document.getElementById('income');
const expensesInput = document.getElementById('expenses');
const goalInput = document.getElementById('goal');
const themeToggle = document.getElementById('theme-toggle');

const resMonthlySavings = document.getElementById('res-monthly-savings');
const resYearlySavings = document.getElementById('res-yearly-savings');
const resTimeEstimate = document.getElementById('res-time-estimate');

const resPctSpent = document.getElementById('res-pct-spent');
const resPctSaved = document.getElementById('res-pct-saved');
const progressSpent = document.getElementById('progress-spent');
const progressSaved = document.getElementById('progress-saved');

const feedbackMessage = document.getElementById('feedback-message');

// ==========================================================================
// 2. ESCUCHADORES DE EVENTOS (EVENT LISTENERS)
// ==========================================================================
financeForm.addEventListener('submit', handleFormSubmit);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    // Guardamos también la preferencia del tema elegido por el usuario
    localStorage.setItem('theme', newTheme);
});

// Evento clave: Cuando todo el HTML termina de cargarse en el navegador
document.addEventListener('DOMContentLoaded', checkPersistedData);

// ==========================================================================
// 3. CONTROLADORES DE EVENTOS (HANDLERS)
// ==========================================================================
function handleFormSubmit(event) {
    event.preventDefault();

    const income = parseFloat(incomeInput.value);
    const expenses = parseFloat(expensesInput.value);
    const goal = parseFloat(goalInput.value);

    if (!validateInputs(income, expenses, goal)) {
        return; 
    }

    // Guardar los datos de entrada en el almacenamiento local (FASE 7)
    saveDataLocally(income, expenses, goal);

    // Ejecutar lógica de negocio y renderizado
    executeCalculationsAndRender(income, expenses, goal);
}

// ==========================================================================
// 4. LOGICA CENTRAL DE PROCESAMIENTO
// ==========================================================================
function executeCalculationsAndRender(income, expenses, goal) {
    const monthlySavings = calculateMonthlySavings(income, expenses);
    const yearlySavings = calculateYearlySavings(monthlySavings);
    const timeToGoal = calculateTimeToGoal(monthlySavings, goal);
    const pctSpent = calculatePercentage(income, expenses);
    const pctSaved = calculatePercentage(income, monthlySavings);

    updateUI(monthlySavings, yearlySavings, timeToGoal, pctSpent, pctSaved);
    generateFinancialFeedback(monthlySavings, pctSpent, pctSaved);
}

// ==========================================================================
// 5. FUNCIONES DE VALIDACIÓN
// ==========================================================================
function validateInputs(income, expenses, goal) {
    if (isNaN(income) || isNaN(expenses) || isNaN(goal)) {
        alert('⚠️ Por favor, completa todos los campos con números válidos.');
        return false;
    }
    if (income < 0 || expenses < 0 || goal < 0) {
        alert('⚠️ Los valores financieros no pueden ser números negativos.');
        return false;
    }
    if (goal === 0) {
        alert('⚠️ La meta de ahorro debe ser mayor a $0 para poder calcular el tiempo estimado.');
        return false;
    }
    return true; 
}

// ==========================================================================
// 6. FUNCIONES DE ACTUALIZACIÓN DE INTERFAZ (RENDERERS)
// ==========================================================================
function updateUI(monthlySavings, yearlySavings, timeToGoal, pctSpent, pctSaved) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    resMonthlySavings.textContent = formatter.format(monthlySavings);
    resYearlySavings.textContent = formatter.format(yearlySavings);

    if (monthlySavings < 0) {
        resMonthlySavings.style.color = 'var(--accent-spent)';
    } else {
        resMonthlySavings.style.color = 'var(--primary)';
    }

    if (timeToGoal === Infinity) {
        resTimeEstimate.textContent = 'Imposible de calcular';
        resTimeEstimate.style.color = 'var(--accent-spent)';
    } else {
        resTimeEstimate.textContent = `${timeToGoal} meses`;
        resTimeEstimate.style.color = 'var(--text-main)';
    }

    resPctSpent.textContent = `${pctSpent}%`;
    resPctSaved.textContent = `${pctSaved < 0 ? 0 : pctSaved}%`;

    const spentWidth = Math.min(Math.max(pctSpent, 0), 100);
    const savedWidth = Math.min(Math.max(pctSaved, 0), 100);

    progressSpent.style.width = `${spentWidth}%`;
    progressSaved.style.width = `${savedWidth}%`;
}

function generateFinancialFeedback(monthlySavings, pctSpent, pctSaved) {
    let message = "";
    if (monthlySavings <= 0) {
        message = `⚠️ <strong>Alerta Crítica:</strong> Tus gastos representan el <strong>${pctSpent}%</strong> de tus ingresos. Estás operando en déficit financiero o saldo cero.`;
        feedbackMessage.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
        feedbackMessage.style.borderColor = "var(--accent-spent)";
    } else if (pctSaved < 15) {
        message = `💡 <strong>Diagnóstico Moderado:</strong> Estás ahorrando un <strong>${pctSaved}%</strong>. Aunque vas por buen camino, la regla de oro recomienda elevar este número al menos al 20%.`;
        feedbackMessage.style.backgroundColor = "var(--bg-feedback)";
        feedbackMessage.style.borderColor = "var(--border-feedback)";
    } else {
        message = `🏆 <strong>¡Excelente Salud Financiera!:</strong> Estás reteniendo el <strong>${pctSaved}%</strong> de tus ingresos netos. Tienes una alta capacidad de inversión.`;
        feedbackMessage.style.backgroundColor = "var(--bg-feedback)";
        feedbackMessage.style.borderColor = "var(--border-feedback)";
    }
    feedbackMessage.innerHTML = `<p>${message}</p>`;
}

// ==========================================================================
// 7. MECANISMOS DE PERSISTENCIA (LOCALSTORAGE - FASE 7)
// ==========================================================================
/**
 * Guarda los datos numéricos transformándolos a formato JSON plano.
 */
function saveDataLocally(income, expenses, goal) {
    const financeData = { income, expenses, goal };
    // JSON.stringify convierte un objeto JS {} a un string de texto plano ""
    localStorage.setItem('userFinanceData', JSON.stringify(financeData));
}

/**
 * Comprueba si existen datos previos y los restaura inmediatamente.
 */
function checkPersistedData() {
    // 1. Restaurar Tema (Claro / Oscuro)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // 2. Restaurar Datos Financieros
    const savedDataRaw = localStorage.getItem('userFinanceData');
    
    if (savedDataRaw) {
        // JSON.parse hace lo inverso: transforma el string de vuelta a un objeto JS manipulable
        const data = JSON.parse(savedDataRaw);
        
        // Inyectamos los valores directamente en los campos del formulario
        incomeInput.value = data.income;
        expensesInput.value = data.expenses;
        goalInput.value = data.goal;

        // Forzamos al motor a calcular y pintar todo inmediatamente
        executeCalculationsAndRender(data.income, data.expenses, data.goal);
    }
}