// Tab switching functionality
document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none'; // Ensure content is hidden
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        const activeContent = document.getElementById(tabId);
        activeContent.classList.add('active');
        activeContent.style.display = 'block'; // Ensure content is visible
    });
});

// Simple Interest Calculator
function toggleSimpleInterestInputs() {
    const calculationType = document.getElementById('si-calculation-type').value;
    const interestInputs = document.getElementById('si-interest-inputs');
    const timeInputs = document.getElementById('si-time-inputs');
    
    if (calculationType === 'interest') {
        interestInputs.style.display = 'block';
        timeInputs.style.display = 'none';
    } else {
        interestInputs.style.display = 'none';
        timeInputs.style.display = 'block';
    }
}

function calculateSimpleInterest() {
    const calculationType = document.getElementById('si-calculation-type').value;
    
    if (calculationType === 'interest') {
        calculateRegularSimpleInterest();
    } else {
        calculateSimpleInterestTime();
    }
}

function calculateSimpleInterestTime() {
    const principal = parseFloat(document.getElementById('si-time-principal').value);
    const interestAmount = parseFloat(document.getElementById('si-interest-amount').value);
    const annualRate = parseFloat(document.getElementById('si-time-rate').value) / 100;
    const yearBase = parseInt(document.getElementById('si-year-base').value);
    
    if (isNaN(principal) || isNaN(interestAmount) || isNaN(annualRate)) {
        alert('Por favor, ingrese todos los valores requeridos');
        return;
    }
    
    // Calculate daily rate
    const dailyRate = annualRate / yearBase;
    
    // Calculate days using the formula: n = I / (C * i)
    const days = interestAmount / (principal * dailyRate);
    
    // Convert to different time units
    const months = days / 30;
    const years = days / yearBase;
    
    const result = document.getElementById('si-result');
    result.innerHTML = `
        <h3>Resultados del Cálculo de Tiempo:</h3>
        <p>Tiempo en días: ${days.toFixed(2)} días</p>
        <p>Tiempo en meses: ${months.toFixed(2)} meses</p>
        <p>Tiempo en años: ${years.toFixed(4)} años</p>
        <p>Base del año utilizada: ${yearBase} días</p>
        <p>Tasa diaria: ${(dailyRate * 100).toFixed(6)}%</p>
        <p>Interés generado: $${interestAmount.toFixed(2)}</p>
    `;
    result.classList.add('show');
}

// Keep the existing calculateRegularSimpleInterest function
function calculateRegularSimpleInterest() {
    const principal = parseFloat(document.getElementById('si-principal').value);
    const rate = parseFloat(document.getElementById('si-rate').value) / 100;
    const time = parseFloat(document.getElementById('si-time').value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert('Por favor, ingrese todos los valores requeridos');
        return;
    }
    
    const interest = principal * rate * time;
    const result = document.getElementById('si-result');
    result.innerHTML = `
        <h3>Resultados:</h3>
        <p>Interés: $${interest.toFixed(2)}</p>
        <p>Monto Total: $${(principal + interest).toFixed(2)}</p>
    `;
    result.classList.add('show');
}

// Simple Amount Calculator
function calculateSimpleAmount() {
    const principal = parseFloat(document.getElementById('sa-principal').value);
    const rate = parseFloat(document.getElementById('sa-rate').value) / 100;
    const time = parseFloat(document.getElementById('sa-time').value);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert('Por favor, ingrese todos los valores requeridos');
        return;
    }
    
    const interest = principal * rate * time;
    const amount = principal + interest;
    
    const result = document.getElementById('sa-result');
    result.innerHTML = `
        <h3>Resultados:</h3>
        <p>Interés: $${interest.toFixed(2)}</p>
        <p>Monto Final: $${amount.toFixed(2)}</p>
    `;
    result.classList.add('show');
}

// Present Value Calculator
function calculatePresentValue() {
    const futureAmount = parseFloat(document.getElementById('pv-amount').value);
    const rate = parseFloat(document.getElementById('pv-rate').value) / 100;
    const time = parseFloat(document.getElementById('pv-time').value);
    
    if (isNaN(futureAmount) || isNaN(rate) || isNaN(time)) {
        alert('Por favor, ingrese todos los valores requeridos');
        return;
    }
    
    const presentValue = futureAmount / Math.pow(1 + rate, time);
    const discount = futureAmount - presentValue;
    
    const result = document.getElementById('pv-result');
    result.innerHTML = `
        <h3>Resultados:</h3>
        <p>Valor Actual: $${presentValue.toFixed(2)}</p>
        <p>Descuento: $${discount.toFixed(2)}</p>
        <p>Valor Futuro: $${futureAmount.toFixed(2)}</p>
    `;
    result.classList.add('show');
}



// Exact Time Calculator (based on actual days)
function calculateExactTime() {
    const startDate = new Date(document.getElementById('exact-start-date').value);
    const endDate = new Date(document.getElementById('exact-end-date').value);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert('Por favor, ingrese fechas válidas');
        return;
    }
    
    // Calculate difference in days
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate years considering leap years
    const exactTime = diffDays / 365;
    
    const result = document.getElementById('exact-time-result');
    result.innerHTML = `
        <h3>Resultados del Tiempo Exacto:</h3>
        <p>Días totales: ${diffDays} días</p>
        <p>Tiempo en años: ${exactTime.toFixed(4)} años</p>
    `;
    result.classList.add('show');
}

// Approximate Time Calculator (commercial method)
function calculateApproximateTime() {
    const startDate = new Date(document.getElementById('approx-start-date').value);
    const endDate = new Date(document.getElementById('approx-end-date').value);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert('Por favor, ingrese fechas válidas');
        return;
    }
    
    // Calculate months difference
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                  (endDate.getMonth() - startDate.getMonth());
    
    // Calculate days difference (considering 30 days per month)
    const days = endDate.getDate() - startDate.getDate();
    
    // Total days (months * 30 + remaining days)
    const totalDays = (months * 30) + days;
    
    // Commercial year has 360 days
    const approximateTime = totalDays / 360;
    
    const result = document.getElementById('approx-time-result');
    result.innerHTML = `
        <h3>Resultados del Tiempo Aproximado:</h3>
        <p>Meses: ${months} meses y ${days} días</p>
        <p>Días comerciales: ${totalDays} días</p>
        <p>Tiempo comercial: ${approximateTime.toFixed(4)} años</p>
    `;
    result.classList.add('show');
}

// Value Equations Calculator
function calculateValueEquation() {
    const focalDate = new Date(document.getElementById('ve-focal-date').value);
    const monthlyRate = parseFloat(document.getElementById('ve-rate').value) / 100;
    
    // Get payments from the dynamic inputs
    const payments = [];
    const paymentInputs = document.querySelectorAll('.payment-input');
    
    paymentInputs.forEach(container => {
        const amount = parseFloat(container.querySelector('.payment-amount').value);
        const date = new Date(container.querySelector('.payment-date').value);
        
        if (!isNaN(amount) && !isNaN(date.getTime())) {
            payments.push({ amount, date });
        }
    });
    
    if (payments.length === 0 || isNaN(focalDate.getTime()) || isNaN(monthlyRate)) {
        alert('Por favor, ingrese datos válidos');
        return;
    }
    
    // Calculate equivalent value at focal date
    let totalEquivalentValue = 0;
    
    payments.forEach(payment => {
        // Calculate months difference
        const monthsDiff = (focalDate.getFullYear() - payment.date.getFullYear()) * 12 + 
                          (focalDate.getMonth() - payment.date.getMonth());
        
        // If payment is before focal date: Future Value
        // If payment is after focal date: Present Value
        const equivalentValue = monthsDiff >= 0 
            ? payment.amount * (1 + monthlyRate * monthsDiff)     // Future Value
            : payment.amount * (1 - monthlyRate * Math.abs(monthsDiff));  // Present Value
            
        totalEquivalentValue += equivalentValue;
    });
    
    const result = document.getElementById('ve-result');
    result.innerHTML = `
        <h3>Resultados:</h3>
        <p>Pago único equivalente en la fecha focal: $${totalEquivalentValue.toFixed(2)}</p>
        <p>Tasa mensual utilizada: ${(monthlyRate * 100).toFixed(2)}%</p>
    `;
    result.classList.add('show');
}

// Function to add new payment input
function addPaymentInput() {
    const container = document.getElementById('payments-container');
    const newPayment = document.createElement('div');
    newPayment.className = 'payment-input input-group';
    newPayment.innerHTML = `
        <div class="input-row">
            <div>
                <label>Monto del Pago</label>
                <input type="number" class="payment-amount" placeholder="Monto">
            </div>
            <div>
                <label>Fecha del Pago</label>
                <input type="date" class="payment-date">
            </div>
            <button type="button" class="remove-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    container.appendChild(newPayment);
}

// Partial Payments Calculator
function calculatePartialPayments() {
    const totalDebt = parseFloat(document.getElementById('pp-total-debt').value);
    const monthlyRate = parseFloat(document.getElementById('pp-rate').value) / 100;
    const dueDate = new Date(document.getElementById('pp-due-date').value);
    
    // Get partial payments from dynamic inputs
    const payments = [];
    const paymentInputs = document.querySelectorAll('.partial-payment-input');
    
    paymentInputs.forEach(container => {
        const amount = parseFloat(container.querySelector('.payment-amount').value);
        const date = new Date(container.querySelector('.payment-date').value);
        
        if (!isNaN(amount) && !isNaN(date.getTime())) {
            payments.push({ amount, date });
        }
    });
    
    if (isNaN(totalDebt) || isNaN(monthlyRate) || isNaN(dueDate.getTime()) || payments.length === 0) {
        alert('Por favor, ingrese todos los datos requeridos');
        return;
    }
    
    // Calculate equivalent value of all payments at due date
    let totalEquivalentPayments = 0;
    let paymentDetails = '';
    
    payments.forEach((payment, index) => {
        // Calculate months difference until due date
        const monthsDiff = (dueDate.getFullYear() - payment.date.getFullYear()) * 12 + 
                          (dueDate.getMonth() - payment.date.getMonth());
        
        // Calculate future value of each payment at due date
        const equivalentValue = payment.amount * (1 + monthlyRate * monthsDiff);
        totalEquivalentPayments += equivalentValue;
        
        paymentDetails += `
            <p>Pago ${index + 1}: $${payment.amount.toFixed(2)} 
               → Valor equivalente al vencimiento: $${equivalentValue.toFixed(2)}</p>
        `;
    });
    
    // Calculate remaining payment needed
    const remainingPayment = totalDebt - totalEquivalentPayments;
    
    const result = document.getElementById('pp-result');
    result.innerHTML = `
        <h3>Resultados:</h3>
        <p>Deuda Total: $${totalDebt.toFixed(2)}</p>
        <h4>Pagos Realizados:</h4>
        ${paymentDetails}
        <p>Total Equivalente de Pagos: $${totalEquivalentPayments.toFixed(2)}</p>
        <p class="remaining-payment ${remainingPayment > 0 ? 'pending' : 'overpaid'}">
            ${remainingPayment > 0 
              ? `Pago Restante al Vencimiento: $${remainingPayment.toFixed(2)}`
              : `Sobrepago: $${Math.abs(remainingPayment).toFixed(2)}`}
        </p>
    `;
    result.classList.add('show');
}

// Function to add new partial payment input
function addPartialPaymentInput() {
    const container = document.getElementById('partial-payments-container');
    const newPayment = document.createElement('div');
    newPayment.className = 'partial-payment-input input-group';
    newPayment.innerHTML = `
        <div class="input-row">
            <div>
                <label>Monto del Pago</label>
                <input type="number" class="payment-amount" placeholder="Monto">
            </div>
            <div>
                <label>Fecha del Pago</label>
                <input type="date" class="payment-date">
            </div>
            <button type="button" class="remove-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    container.appendChild(newPayment);
}

// Bank Discount Calculator
function calculateBankDiscount() {
    const futureValue = parseFloat(document.getElementById('bd-future-value').value);
    const discountRate = parseFloat(document.getElementById('bd-rate').value) / 100;
    const time = parseFloat(document.getElementById('bd-time').value);
    
    if (isNaN(futureValue) || isNaN(discountRate) || isNaN(time)) {
        alert('Por favor, ingrese todos los valores requeridos');
        return;
    }
    
    // Calculate bank discount
    const discount = futureValue * discountRate * time;
    
    // Calculate present value (effective value received)
    const presentValue = futureValue - discount;
    
    // Calculate effective interest rate
    const effectiveRate = (discount / presentValue) * (1 / time) * 100;
    
    const result = document.getElementById('bd-result');
    result.innerHTML = `
        <h3>Resultados:</h3>
        <p>Valor Nominal (VF): $${futureValue.toFixed(2)}</p>
        <p>Descuento Bancario: $${discount.toFixed(2)}</p>
        <p>Valor Efectivo a Recibir (VA): $${presentValue.toFixed(2)}</p>
        <p>Tasa Efectiva Anual: ${effectiveRate.toFixed(2)}%</p>
    `;
    result.classList.add('show');
}

// Promissory Notes Calculator
function calculatePromissoryNote() {
    const principal = parseFloat(document.getElementById('pn-principal').value);
    const rate = parseFloat(document.getElementById('pn-rate').value) / 100;
    const time = parseFloat(document.getElementById('pn-time').value);
    const interestType = document.getElementById('pn-interest-type').value;
    const includeDiscount = document.getElementById('pn-include-discount').checked;
    
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert('Por favor, ingrese todos los valores requeridos');
        return;
    }
    
    let futureValue, interest;
    
    // Calculate based on interest type
    if (interestType === 'simple') {
        // Simple Interest
        interest = principal * rate * time;
        futureValue = principal + interest;
    } else {
        // Compound Interest
        futureValue = principal * Math.pow(1 + rate, time);
        interest = futureValue - principal;
    }
    
    let discountInfo = '';
    
    // Calculate discount if requested
    if (includeDiscount) {
        const discountTime = parseFloat(document.getElementById('pn-discount-time').value);
        const discountRate = parseFloat(document.getElementById('pn-discount-rate').value) / 100;
        
        if (!isNaN(discountTime) && !isNaN(discountRate)) {
            const discount = futureValue * discountRate * discountTime;
            const presentValue = futureValue - discount;
            
            discountInfo = `
                <h4>Información de Descuento:</h4>
                <p>Descuento Bancario: $${discount.toFixed(2)}</p>
                <p>Valor Actual (después del descuento): $${presentValue.toFixed(2)}</p>
                <p>Tiempo de descuento: ${discountTime} períodos</p>
                <p>Tasa de descuento: ${(discountRate * 100).toFixed(2)}%</p>
            `;
        }
    }
    
    const result = document.getElementById('pn-result');
    result.innerHTML = `
        <h3>Resultados del Pagaré:</h3>
        <p>Capital Principal: $${principal.toFixed(2)}</p>
        <p>Tipo de Interés: ${interestType === 'simple' ? 'Simple' : 'Compuesto'}</p>
        <p>Tasa de Interés: ${(rate * 100).toFixed(2)}%</p>
        <p>Tiempo: ${time} períodos</p>
        <p>Interés Generado: $${interest.toFixed(2)}</p>
        <p>Valor Futuro (Monto a Pagar): $${futureValue.toFixed(2)}</p>
        ${discountInfo}
    `;
    result.classList.add('show');
}

// Function to toggle discount inputs visibility
function toggleDiscountInputs() {
    const discountSection = document.getElementById('discount-inputs');
    discountSection.style.display = 
        document.getElementById('pn-include-discount').checked ? 'block' : 'none';
}

// Add similar functions for other calculators

// Interest Rate Calculator
function calculateInterestRate() {
    const calculationType = document.getElementById('ir-calculation-type').value;
    
    switch(calculationType) {
        case 'find-rate':
            calculateRateFromValues();
            break;
        case 'convert-rate':
            convertInterestRate();
            break;
    }
}

// Calculate rate from principal and final amount
function calculateRateFromValues() {
    const principal = parseFloat(document.getElementById('ir-principal').value);
    const finalAmount = parseFloat(document.getElementById('ir-final-amount').value);
    const time = parseFloat(document.getElementById('ir-time').value);
    const timeUnit = document.getElementById('ir-time-unit').value;
    
    if (isNaN(principal) || isNaN(finalAmount) || isNaN(time)) {
        alert('Por favor, ingrese todos los valores requeridos');
        return;
    }
    
    // Convert time to years
    const timeInYears = timeUnit === 'months' ? time / 12 : time;
    
    // Calculate interest
    const interest = finalAmount - principal;
    
    // Calculate annual simple interest rate
    const annualRate = (interest / (principal * timeInYears));
    
    const result = document.getElementById('ir-result');
    result.innerHTML = `
        <h3>Resultados:</h3>
        <p>Interés generado: $${interest.toFixed(2)}</p>
        <p>Tasa de interés simple anual: ${(annualRate * 100).toFixed(2)}%</p>
        <p>Tasa de interés simple mensual: ${((annualRate / 12) * 100).toFixed(2)}%</p>
    `;
    result.classList.add('show');
}

// Convert between different interest rates
function convertInterestRate() {
    const rate = parseFloat(document.getElementById('ir-rate').value);
    const fromPeriod = document.getElementById('ir-from-period').value;
    const toPeriod = document.getElementById('ir-to-period').value;
    const interestType = document.getElementById('ir-type').value;
    const calculationType = document.getElementById('ir-calculation-method').value; // New
    
    if (isNaN(rate)) {
        alert('Por favor, ingrese una tasa válida');
        return;
    }

    const rateDecimal = rate / 100;
    let convertedRate;
    
    if (calculationType === 'discount') {
        // Discount rate calculations
        if (interestType === 'simple') {
            // Simple discount conversion factors
            const factors = {
                daily: 1/360,
                monthly: 1/12,
                annual: 1
            };
            
            // Convert to annual rate first, then to target period
            const annualRate = rateDecimal / factors[fromPeriod];
            convertedRate = annualRate * factors[toPeriod];
            
        } else {
            // Compound discount conversion
            const periods = {
                daily: 360,
                monthly: 12,
                annual: 1
            };
            
            // Convert to annual rate first using discount formula
            const annualRate = (fromPeriod === 'annual') ? rateDecimal :
                1 - Math.pow(1 - rateDecimal, periods[fromPeriod]);
                
            // Then convert to target period
            convertedRate = (toPeriod === 'annual') ? annualRate :
                1 - Math.pow(1 - annualRate, 1/periods[toPeriod]);
        }
    } else {
        // Original interest rate conversion logic
        if (interestType === 'simple') {
            const factors = {
                daily: 1/360,
                monthly: 1/12,
                annual: 1
            };
            const annualRate = rateDecimal / factors[fromPeriod];
            convertedRate = annualRate * factors[toPeriod];
        } else {
            const periods = {
                daily: 360,
                monthly: 12,
                annual: 1
            };
            const annualRate = (fromPeriod === 'annual') ? rateDecimal :
                Math.pow(1 + rateDecimal, periods[fromPeriod]) - 1;
            convertedRate = (toPeriod === 'annual') ? annualRate :
                Math.pow(1 + annualRate, 1/periods[toPeriod]) - 1;
        }
    }
    
    const result = document.getElementById('ir-result');
    result.innerHTML = `
        <h3>Resultados de Conversión de Tasas:</h3>
        <p>Tipo de Cálculo: ${calculationType === 'discount' ? 'Tasa de Descuento' : 'Tasa de Interés'}</p>
        <p>Tasa Original (${fromPeriod}): ${rate.toFixed(4)}%</p>
        <p>Tasa Convertida (${toPeriod}): ${(convertedRate * 100).toFixed(4)}%</p>
        <p>Tipo: ${interestType === 'simple' ? 'Simple' : 'Compuesto'}</p>
    `;
    result.classList.add('show');
}


function toggleCalculationInputs() {
    const calculationType = document.getElementById('ir-calculation-type').value;
    const findRateInputs = document.getElementById('find-rate-inputs');
    const convertRateInputs = document.getElementById('convert-rate-inputs');
    
    if (calculationType === 'find-rate') {
        findRateInputs.style.display = 'block';
        convertRateInputs.style.display = 'none';
    } else {
        findRateInputs.style.display = 'none';
        convertRateInputs.style.display = 'block';
    }
}

