// Initialize jsPDF
window.jsPDF = window.jspdf.jsPDF;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('documentForm');
    const addRowBtn = document.getElementById('addRow');
    const itemsBody = document.getElementById('itemsBody');
    const generatePDFBtn = document.getElementById('generatePDF');

    // Add new row
    addRowBtn.addEventListener('click', function() {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="number" class="cantidad" min="1"></td>
            <td><input type="text" class="descripcion"></td>
            <td><input type="number" class="precio" min="0"></td>
            <td class="total">0.00</td>
            <td><button type="button" class="delete-row">Eliminar</button></td>
        `;
        itemsBody.appendChild(newRow);
    });

    // Delete row
    itemsBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-row')) {
            e.target.closest('tr').remove();
            calculateTotals();
        }
    });

    // Calculate row total
    itemsBody.addEventListener('input', function(e) {
        if (e.target.classList.contains('cantidad') || e.target.classList.contains('precio')) {
            calculateTotals();
        }
    });

    // Calculate all totals
    function calculateTotals() {
        let subtotal = 0;
        const rows = itemsBody.getElementsByTagName('tr');
        
        Array.from(rows).forEach(row => {
            const cantidad = parseFloat(row.querySelector('.cantidad').value) || 0;
            const precio = parseFloat(row.querySelector('.precio').value) || 0;
            const total = cantidad * precio;
            row.querySelector('.total').textContent = total.toFixed(2);
            subtotal += total;
        });

        document.getElementById('subtotal').value = subtotal.toFixed(2);
        
        const instalacion = parseFloat(document.getElementById('instalacion').value) || 0;
        const itbis = (subtotal + instalacion) * 0.18; // 18% ITBIS
        document.getElementById('itbis').value = itbis.toFixed(2);
        
        const total = subtotal + instalacion + itbis;
        document.getElementById('total').value = total.toFixed(2);
    }

    // Installation cost change
    document.getElementById('instalacion').addEventListener('input', calculateTotals);

    // Generate PDF
    generatePDFBtn.addEventListener('click', function() {
        try {
            const doc = new jsPDF();
            const documentType = document.getElementById('documentType').value;
            
            // Add header with styled text for both factura and cotizacion
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 32, 96); // Dark navy blue color
            doc.text('Villar & Almonte', 105, 20, { align: 'center' });
            
            doc.setFontSize(16);
            doc.setFont('helvetica', 'italic');
            doc.text('Servicios Multiples', 105, 30, { align: 'center' });
            
            // Reset text color to black for remaining content
            doc.setTextColor(0, 0, 0);
            
            // Add NCF number below header only for factura
            if(documentType === 'factura') {
                const ncf = document.getElementById('ncf').value || '139';
                doc.setFontSize(12);
            }
            
            // Add company name with styling (removed since it's now in header)
            // Add header info
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('RNC-001-0941127-2', 105, 85, { align: 'center' });
            doc.text('Telefono: 829-693-7134', 105, 92, { align: 'center' });
            if(documentType === 'factura') {
                const ncf = document.getElementById('ncf').value || '139';
                doc.text(`NCF: B0${ncf}`, 105, 99, { align: 'center' });
            }
        
            // Add document title with more spacing
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            if(documentType === 'cotizacion') {
                doc.text('Cotizacion', 105, 115, { align: 'center' });
            } else {
                doc.text('Factura', 105, 115, { align: 'center', style: 'italic' });
            }
            
            // Client info section
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            
            // Add labels
            doc.text('Señor/a:', 20, 130);
            doc.text('RNC:', 20, 138);
            doc.text('Fecha:', 140, 130);  // Moved label to the left of the box
            
            // Add bordered input areas
            doc.rect(50, 125, 80, 8);   // Señor/a box
            doc.rect(50, 133, 80, 8);   // RNC box
            doc.rect(160, 125, 30, 8);  // Fecha box
            
            // Add values
            doc.text(document.getElementById('senor').value, 52, 130);
            doc.text(document.getElementById('clienteRnc').value || 'N/A', 52, 138);
            
            // Format date as dd/mm/yyyy
            const dateValue = document.getElementById('fecha').value;
            const [year, month, day] = dateValue.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            doc.text(formattedDate, 162, 130);
        
            // Create table
            let yPos = 150;
        
            // Table headers with borders
            doc.rect(20, yPos-5, 15, 8); // CANT
            doc.rect(35, yPos-5, 95, 8); // DESCRIPCION
            doc.rect(130, yPos-5, 30, 8); // PRECIO
            doc.rect(160, yPos-5, 30, 8); // TOTAL
        
            doc.setFont('helvetica', 'bold');
            doc.text('CANT.', 22, yPos);
            doc.text('DESCRIPCIÓN', 37, yPos);
            doc.text('PRECIO', 132, yPos);
            doc.text('TOTAL', 162, yPos);
        
            // Table items
            doc.setFont('helvetica', 'normal');
            yPos += 10;
        
            const rows = itemsBody.getElementsByTagName('tr');
            Array.from(rows).forEach(row => {
                const cantidad = row.querySelector('.cantidad').value;
                const descripcion = row.querySelector('.descripcion').value;
                const precio = row.querySelector('.precio').value;
                const total = row.querySelector('.total').textContent;
                
                doc.rect(20, yPos-5, 15, 8);
                doc.rect(35, yPos-5, 95, 8);
                doc.rect(130, yPos-5, 30, 8);
                doc.rect(160, yPos-5, 30, 8);
                
                doc.text(cantidad.toString(), 22, yPos);
                doc.text(descripcion, 37, yPos);
                doc.text(precio.toString(), 132, yPos);
                doc.text(total.toString(), 162, yPos);
                
                yPos += 8;
            });
        
            // Add totals section
            yPos += 10;
            doc.text('SUB-TOTAL RD$', 130, yPos);
            doc.text(document.getElementById('subtotal').value, 180, yPos, { align: 'right' });
        
            yPos += 7;
            doc.text('COSTO DE INSTALACIÓN RD$', 130, yPos);
            doc.text(document.getElementById('instalacion').value, 180, yPos, { align: 'right' });
        
            yPos += 7;
            doc.text('ITBIS', 130, yPos);
            doc.text(document.getElementById('itbis').value, 180, yPos, { align: 'right' });
        
            yPos += 7;
            doc.setFont('helvetica', 'bold');
            doc.text('TOTAL RD$', 130, yPos);
            doc.text(document.getElementById('total').value, 180, yPos, { align: 'right' });
        
            // Add footer
            yPos += 20;
            doc.setFont('helvetica', 'normal');
            doc.text('Danny Villar', 20, yPos);
            doc.text('Tecnico Electricista', 20, yPos + 7);
        
            // Save the PDF
            doc.save(`${documentType}_${document.getElementById('fecha').value}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error al generar el PDF. Por favor, revise la consola para más detalles.');
        }
    });
});
