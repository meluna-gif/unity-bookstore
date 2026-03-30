// admin.js

// Function to refresh everything on the page
function refreshDashboard() {
    const books = JSON.parse(localStorage.getItem('unity_books_db')) || [];
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const revenue = localStorage.getItem('admin_revenue') || '0.00';

    // 1. Update Stats
    document.getElementById('revenue-display').textContent = `ETB ${revenue}`;
    document.getElementById('order-count').textContent = transactions.length;

    // 2. Load Inventory Table
    const invBody = document.getElementById('admin-inventory');
    invBody.innerHTML = books.map(book => `
        <tr>
            <td><strong>${book.title}</strong><br><small>${book.author}</small></td>
            <td>
                <input type="number" class="form-control form-control-sm" style="width:90px" 
                       value="${book.price}" onchange="updateBookPrice(${book.id}, this.value)">
            </td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </td>
        </tr>
    `).join('');

    // 3. Load Transaction Ledger
    const ledgerBody = document.getElementById('admin-ledger');
    ledgerBody.innerHTML = transactions.slice().reverse().map(trx => `
        <tr>
            <td class="p-2">
                <small class="d-block text-muted">${trx.date}</small>
                <strong>ETB ${trx.amount}</strong>
            </td>
            <td class="text-end p-2">
                <button class="btn btn-link btn-sm text-danger" onclick="issueRefund('${trx.id}', ${trx.amount})">Refund</button>
            </td>
        </tr>
    `).join('');
}

// Logic: Add Book
document.getElementById('add-book-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const books = JSON.parse(localStorage.getItem('unity_books_db')) || [];
    const newBook = {
        id: Date.now(),
        title: document.getElementById('admin-title').value,
        author: document.getElementById('admin-author').value,
        price: parseFloat(document.getElementById('admin-price').value),
        category: document.getElementById('admin-category').value,
        image: "default-book.jpg"
    };
    books.push(newBook);
    localStorage.setItem('unity_books_db', JSON.stringify(books));
    this.reset();
    refreshDashboard();
});

// Logic: Update Price
window.updateBookPrice = function(id, newPrice) {
    let books = JSON.parse(localStorage.getItem('unity_books_db'));
    const index = books.findIndex(b => b.id === id);
    if(index !== -1) {
        books[index].price = parseFloat(newPrice);
        localStorage.setItem('unity_books_db', JSON.stringify(books));
    }
};

// Logic: Delete Book
window.deleteBook = function(id) {
    if(confirm("Delete this book?")) {
        let books = JSON.parse(localStorage.getItem('unity_books_db'));
        books = books.filter(b => b.id !== id);
        localStorage.setItem('unity_books_db', JSON.stringify(books));
        refreshDashboard();
    }
};

// Logic: Refund
window.issueRefund = function(trxId, amount) {
    if(confirm("Refund ETB " + amount + "?")) {
        let userBal = parseFloat(localStorage.getItem('user_balance'));
        let adminRev = parseFloat(localStorage.getItem('admin_revenue'));
        let transactions = JSON.parse(localStorage.getItem('transactions'));

        localStorage.setItem('user_balance', (userBal + amount).toFixed(2));
        localStorage.setItem('admin_revenue', (adminRev - amount).toFixed(2));
        
        const updatedTrxs = transactions.filter(t => t.id !== trxId);
        localStorage.setItem('transactions', JSON.stringify(updatedTrxs));
        
        refreshDashboard();
        alert("Refunded successfully!");
    }
};

// Logic: Reset
window.resetStore = function() {
    if(confirm("WIPE ALL DATA?")) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
};

// Currency conversion: fetch live USD->ETB rate and convert stored values
window.startCurrencyConversion = async function() {
    const existingRate = parseFloat(localStorage.getItem('usd_to_etb_rate')) || null;
    if (existingRate) {
        if(!confirm(`A conversion appears to have been applied already (1 USD = ${existingRate} ETB). Fetch a new rate and reconvert? This can double-convert values if they are already in ETB.`)) return;
    } else {
        if(!confirm('Fetch current USD→ETB rate and convert all stored values to ETB? This will modify stored prices and cannot be easily undone. Proceed?')) return;
    }

    const statusEl = document.getElementById('conversion-status');
    if(statusEl) statusEl.textContent = 'Fetching current USD→ETB rate...';
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        const rate = parseFloat(data?.rates?.ETB);
        if(!rate) throw new Error('Rate not available');
        localStorage.setItem('usd_to_etb_rate', rate.toString());
        if(statusEl) statusEl.textContent = `Rate: 1 USD = ${rate.toFixed(2)} ETB — converting store...`;
        convertAllValuesToETB(rate);
        localStorage.setItem('conversion_done', 'true');
        if(statusEl) statusEl.textContent = 'Conversion complete.';
        refreshDashboard();
        alert(`Conversion complete: 1 USD = ${rate.toFixed(2)} ETB. Stored values are now ETB.`);
    } catch (err) {
        if(statusEl) statusEl.textContent = 'Failed to fetch rate: ' + err.message;
        alert('Failed to fetch rate: ' + err.message);
    }
};

function convertAllValuesToETB(rate) {
    // Convert books
    let books = JSON.parse(localStorage.getItem('unity_books_db')) || [];
    books = books.map(b => {
        return {...b, price: parseFloat((parseFloat(b.price) * rate).toFixed(2))};
    });
    localStorage.setItem('unity_books_db', JSON.stringify(books));

    // Convert user_balance
    if(localStorage.getItem('user_balance')) {
        localStorage.setItem('user_balance', (parseFloat(localStorage.getItem('user_balance')) * rate).toFixed(2));
    }
    if(localStorage.getItem('admin_revenue')) {
        localStorage.setItem('admin_revenue', (parseFloat(localStorage.getItem('admin_revenue')) * rate).toFixed(2));
    }

    // Convert transactions
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.map(t => ({...t, amount: parseFloat((parseFloat(t.amount) * rate).toFixed(2))}));
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Free shipping threshold and shipping cost (convert the original USD thresholds/costs)
    localStorage.setItem('free_shipping_threshold', (50 * rate).toFixed(2));
    localStorage.setItem('shipping_cost', (5.99 * rate).toFixed(2));
}

document.addEventListener('DOMContentLoaded', refreshDashboard);