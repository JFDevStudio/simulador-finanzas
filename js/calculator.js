// Contiene los calculos matematicos y financieros.
// ==========================================================================
// MOTOR MATEMÁTICO Y FINANCIERO
// ==========================================================================

/**
 * Calcula el ahorro mensual neto.
 * @param {number} income - Ingresos totales
 * @param {number} expenses - Gastos totales
 * @returns {number}
 */
function calculateMonthlySavings(income, expenses) {
    return income - expenses;
}

/**
 * Proyecta el ahorro anual basado en el ahorro mensual.
 * @param {number} monthlySavings - Ahorro de un mes
 * @returns {number}
 */
function calculateYearlySavings(monthlySavings) {
    // Si el ahorro mensual es negativo, el anual también lo refleja
    return monthlySavings * 12;
}

/**
 * Calcula el tiempo estimado en meses para alcanzar la meta.
 * @param {number} monthlySavings - Ahorro mensual neto
 * @param {number} goal - Meta financiera objetivo
 * @returns {number} Retorna los meses (puede ser un número flotante o Infinity)
 */
function calculateTimeToGoal(monthlySavings, goal) {
    if (monthlySavings <= 0) {
        return Infinity; // Evita división por cero o escenarios imposibles
    }
    // Usamos Math.ceil para redondear hacia arriba (si da 4.2 meses, se necesitan 5 meses reales)
    return Math.ceil(goal / monthlySavings);
}

/**
 * Calcula la distribución porcentual de los ingresos.
 * @param {number} income - Ingresos totales
 * @param {number} amount - Cantidad a evaluar (gastos o ahorro)
 * @returns {number} Porcentaje redondeado a un decimal
 */
function calculatePercentage(income, amount) {
    if (income === 0) return 0;
    const percentage = (amount / income) * 100;
    // .toFixed(1) devuelve un string, lo reconvertimos a número con parseFloat
    return parseFloat(percentage.toFixed(1));
}