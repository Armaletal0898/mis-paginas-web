// Tab switching functionality
document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Simple Interest Calculator
function calculateSimpleInterest() {
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

