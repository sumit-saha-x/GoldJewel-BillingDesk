require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const numberToWords = require('number-to-words');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

// Routes
app.get('/', (req, res) => {
    res.render('form');
});

// Sales history page
app.get('/sales-history', (req, res) => {
    res.render('sales-history');
});

// Filtered sales data endpoint
app.post('/filter-sales', (req, res) => {
    try {
        const sales = jsonfile.readFileSync(path.join(__dirname, 'data', 'sales.json'));
        const { fromDate, toDate } = req.body;
        
        // Convert input dates to dd/mm/yyyy format for comparison
        const fromParts = fromDate.split('-');
        const toParts = toDate.split('-');
        const fromFormatted = `${fromParts[2]}/${fromParts[1]}/${fromParts[0]}`;
        const toFormatted = `${toParts[2]}/${toParts[1]}/${toParts[0]}`;
        
        const filteredSales = sales.filter(sale => {
            // Compare as strings in dd/mm/yyyy format
            return sale.date >= fromFormatted && sale.date <= toFormatted;
        });
        
        res.json(filteredSales);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading sales data' });
    }
});
app.post('/generate-invoice', (req, res) => {
    // Get next bill number
    const billNumber = getNextBillNumber();
    
    // Process items
    const items = processItems(req.body);
    
    // Calculate totals
    const totals = calculateTotals(items);
    
    // Create invoice data
    const invoiceData = {
        ...req.body,
        billNumber,
        date: new Date().toLocaleDateString('en-GB'),
        items,
        totals,
        numberToWords
    };
    
    // Save to JSON (optional)
    saveSaleRecord(invoiceData);
    
    
    // Render invoice preview
    res.render('invoice', invoiceData);
});

// Helper functions
function getNextBillNumber() {
    const filePath = path.join(__dirname, 'data', 'billNumber.json');
    let data = { lastNumber: 0 };
    
    try {
        data = jsonfile.readFileSync(filePath);
    } catch (err) {
        console.log('Creating new bill number file');
    }
    
    const nextNumber = data.lastNumber + 1;
    jsonfile.writeFileSync(filePath, { lastNumber: nextNumber });
    
    return nextNumber.toString(); // Returns just the number as string (1, 2, 3,...)
}


function processItems(body) {
    const items = [];
    const itemNames = Array.isArray(body.itemName) ? body.itemName : [body.itemName];
    
    itemNames.forEach((name, index) => {
        items.push({
            name,
            purity: Array.isArray(body.purity) ? body.purity[index] : body.purity,
            quantity: Array.isArray(body.quantity) ? parseFloat(body.quantity[index]) : parseFloat(body.quantity),
            weight: Array.isArray(body.weight) ? parseFloat(body.weight[index]) : parseFloat(body.weight),
            rate: Array.isArray(body.rate) ? parseFloat(body.rate[index]) : parseFloat(body.rate),
            makingChargePerGram: Array.isArray(body.makingChargePerGram) ? 
                parseFloat(body.makingChargePerGram[index]) : parseFloat(body.makingChargePerGram)
        });
    });
    
    return items;
}

function calculateTotals(items) {
    let subtotal = 0;
    let totalMakingCharge = 0;
    
    items.forEach(item => {
        const goldCost = item.weight * item.rate;
        const makingCharge = item.weight * item.makingChargePerGram;
        item.goldCost = goldCost;
        item.makingCharge = makingCharge;
        item.total = goldCost + makingCharge;
        
        subtotal += item.total;
        totalMakingCharge += makingCharge;
    });
    
    const cgst = subtotal * 0.015; // 1.5%
    const sgst = subtotal * 0.015; // 1.5%
    const grandTotal = subtotal + cgst + sgst;
    const roundedTotal = Math.round(grandTotal);
    const roundOff = roundedTotal - grandTotal;
    
    return {
        subtotal,
        totalMakingCharge,
        cgst,
        sgst,
        grandTotal: roundedTotal,
        roundOff
    };
}

// Modify the saveSaleRecord function to only save necessary data
function saveSaleRecord(data) {
    const filePath = path.join(__dirname, 'data', 'sales.json');
    let sales = [];

    try {
        sales = jsonfile.readFileSync(filePath);
    } catch (err) {
        console.log('Creating new sales file');
    }

    // Format date as dd/mm/yyyy
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    // Check if this bill already exists
    const existingBillIndex = sales.findIndex(sale => sale.billNumber === data.billNumber);
    
    if (existingBillIndex >= 0) {
        // Update existing bill (shouldn't happen, but just in case)
        sales[existingBillIndex] = {
            date: formattedDate,
            billNumber: data.billNumber,
            customerName: data.customerName,
            customerAddress: data.customerAddress,
            customerPhone: data.customerPhone,
            items: data.items,
            totals: {
                tax: data.totals.cgst + data.totals.sgst,
                grandTotal: data.totals.grandTotal
            }
        };
    } else {
        // Add new bill
        const saleRecord = {
            date: formattedDate,
            billNumber: data.billNumber,
            customerName: data.customerName,
            customerAddress: data.customerAddress,
            customerPhone: data.customerPhone,
            items: data.items,
            totals: {
                tax: data.totals.cgst + data.totals.sgst,
                grandTotal: data.totals.grandTotal
            }
        };
        sales.push(saleRecord);
    }

    jsonfile.writeFileSync(filePath, sales, { spaces: 2 });
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});