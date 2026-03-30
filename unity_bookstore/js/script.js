// Initialize Bank Accounts if they don't exist
// NOTE: Values converted from USD to ETB on 2025-12-30 using rate = 54.522466
if (!localStorage.getItem('usd_to_etb_rate')) {
    localStorage.setItem('usd_to_etb_rate', '54.522466'); // 1 USD = 54.522466 ETB
}
if (!localStorage.getItem('user_balance')) {
    localStorage.setItem('user_balance', '27261.23'); // 500 USD -> 27261.23 ETB
}
if (!localStorage.getItem('admin_revenue')) {
    localStorage.setItem('admin_revenue', '0.00'); // Store starts at zero (ETB)
}
if (!localStorage.getItem('transactions')) {
    localStorage.setItem('transactions', JSON.stringify([])); // History of all sales
}
if (!localStorage.getItem('free_shipping_threshold')) {
    localStorage.setItem('free_shipping_threshold', '2726.12'); // 50 USD -> 2726.12 ETB
}
if (!localStorage.getItem('shipping_cost')) {
    localStorage.setItem('shipping_cost', '326.59'); // 5.99 USD -> 326.59 ETB
}
if (!localStorage.getItem('conversion_done')) {
    localStorage.setItem('conversion_done', 'true'); // Repo defaults converted to ETB
}
function processTransaction(amount) {
    let userBalance = parseFloat(localStorage.getItem('user_balance'));
    let adminRevenue = parseFloat(localStorage.getItem('admin_revenue'));
    let transactions = JSON.parse(localStorage.getItem('transactions'));

    if (userBalance >= amount) {
        // 1. Deduct from User
        userBalance -= amount;
        
        // 2. Add to Admin
        adminRevenue += amount;

        // 3. Record the Transaction
        const newTransaction = {
            id: "TRX-" + Math.floor(Math.random() * 1000000),
            date: new Date().toLocaleString(),
            amount: amount.toFixed(2),
            type: "Purchase",
            status: "Completed"
        };
        transactions.push(newTransaction);

        // 4. Save back to "Database"
        localStorage.setItem('user_balance', userBalance.toFixed(2));
        localStorage.setItem('admin_revenue', adminRevenue.toFixed(2));
        localStorage.setItem('transactions', JSON.stringify(transactions));

        return { success: true, trxId: newTransaction.id };
    } else {
        return { success: false, message: "Insufficient funds in your Unity Bank account!" };
    }
}
// Unity Bookstore - Main JavaScript File
// REMOVE THE OLD THEME MANAGER CLASS FROM THIS FILE (lines 392-430)
// 1. Your original hardcoded list (The "Seed Data")
const defaultBooks = [
   {
        id: 1,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        price: 2507.49,
        category: "education",
        image: "algorithms.jpg",
        description: "Comprehensive guide to computer algorithms and data structures. Essential for computer science students.",
        featured: true
    },
    {
        id: 2,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 708.25,
        category: "fiction",
        image: "gatsby.jpg",
        description: "Classic American novel about the Jazz Age, wealth, and the American Dream.",
        featured: true
    },
    {
        id: 3,
        title: "Research Methods in Psychology",
        author: "David G. Elmes",
        price: 3271.35,
        category: "research",
        image: "psychology.jpg",
        description: "Essential textbook for academic research methodologies in psychology.",
        featured: true
    },
    {
        id: 4,
        title: "The Very Hungry Caterpillar",
        author: "Eric Carle",
        price: 490.16,
        category: "children",
        image: "caterpillar.jpg",
        description: "Beloved children's picture book about transformation and growth.",
        featured: true
    },
    {
        id: 5,
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        price: 2180.35,
        category: "education",
        image: "cleancode.jpg",
        description: "Best practices for writing maintainable, efficient, and clean code.",
        featured: true
    },
    {
        id: 6,
        title: "1984",
        author: "George Orwell",
        price: 599.20,
        category: "fiction",
        image: "1984.jpg",
        description: "Dystopian social science fiction novel about totalitarian regime.",
        featured: false
    },
    {
        id: 7,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 653.72,
        category: "fiction",
        image: "mockingbird.jpg",
        description: "Classic novel addressing racial injustice and moral growth.",
        featured: false
    },
    {
        id: 8,
        title: "Data Structures and Algorithms in Python",
        author: "Michael T. Goodrich",
        price: 2998.74,
        category: "education",
        image: "python_dsa.jpg",
        description: "Comprehensive guide to data structures using Python programming language.",
        featured: false
    },
    {
        id: 9,
        title: "The Cat in the Hat",
        author: "Dr. Seuss",
        price: 435.63,
        category: "children",
        image: "catinthehat.jpg",
        description: "Fun and educational children's book with rhyming text.",
        featured: false
    },
    {
        id: 10,
        title: "Academic Writing for Graduate Students",
        author: "John M. Swales",
        price: 1908.29,
        category: "research",
        image: "academic_writing.jpg",
        description: "Guide to writing research papers, theses, and dissertations.",
        featured: false
    },
    {
        id: 11,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 544.68,
        category: "fiction",
        image: "pride.jpg",
        description: "Romantic novel of manners set in early 19th century England.",
        featured: false
    },
    {
        id: 12,
        title: "Computer Networking: A Top-Down Approach",
        author: "James F. Kurose",
        price: 3597.94,
        category: "education",
        image: "networking.jpg",
        description: "Comprehensive textbook on computer networking principles.",
        featured: false
    },
    {
        id: 13,
        title: "Goodnight Moon",
        author: "Margaret Wise Brown",
        price: 381.11,
        category: "children",
        image: "goodnight.jpg",
        description: "Beloved bedtime story for young children.",
        featured: false
    },
    {
        id: 14,
        title: "Qualitative Research Methods",
        author: "Monique Hennink",
        price: 2289.94,
        category: "research",
        image: "qualitative.jpg",
        description: "Guide to qualitative research design, data collection, and analysis.",
        featured: false
    },
    {
        id: 15,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 762.77,
        category: "fiction",
        image: "hobbit.jpg",
        description: "Fantasy novel about Bilbo Baggins' adventure in Middle-earth.",
        featured: false
    },
    {
        id: 16,
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        price: 3216.28,
        category: "education",
        image: "database.jpg",
        description: "Comprehensive introduction to database systems.",
        featured: false
    },
    {
        id: 17,
        title: "Brown Bear, Brown Bear, What Do You See?",
        author: "Bill Martin Jr.",
        price: 326.59,
        category: "children",
        image: "brownbear.jpg",
        description: "Classic children's picture book with repetitive text and colorful illustrations.",
        featured: false
    },
    {
        id: 18,
        title: "Research Design: Qualitative, Quantitative, and Mixed Methods Approaches",
        author: "John W. Creswell",
        price: 2617.08,
        category: "research",
        image: "research_design.jpg",
        description: "Guide to planning, conducting, and evaluating research.",
        featured: false
    },
    {
        id: 19,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        price: 817.29,
        category: "fiction",
        image: "harrypotter.jpg",
        description: "First book in the Harry Potter series about a young wizard.",
        featured: false
    },
    {
        id: 20,
        title: "Operating System Concepts",
        author: "Abraham Silberschatz",
        price: 3434.37,
        category: "education",
        image: "os.jpg",
        description: "Comprehensive textbook on operating system principles.",
        featured: false
    },
    {
        id: 21,
        title: "Where the Wild Things Are",
        author: "Maurice Sendak",
        price: 462.90,
        category: "children",
        image: "wildthings.jpg",
        description: "Classic children's picture book about imagination and adventure.",
        featured: false
    },
    {
        id: 22,
        title: "Statistics for Research",
        author: "Sharon L. Lohr",
        price: 2835.17,
        category: "research",
        image: "statistics.jpg",
        description: "Statistical methods for research design and data analysis.",
        featured: false
    }
];

// 2. The Database Logic
// We check if "unity_books_db" exists. If not, we create it using the defaultBooks.
if (!localStorage.getItem('unity_books_db')) {
    localStorage.setItem('unity_books_db', JSON.stringify(defaultBooks));
}

// 3. The Live Variable
// FROM NOW ON, the website only looks at this variable, NOT the hardcoded list.
let books = JSON.parse(localStorage.getItem('unity_books_db')) || [];
// Expose books to other inline scripts that read `books` directly
window.books = books;

// 4. Update function (Call this whenever the admin adds/deletes a book)
function refreshBookData() {
    // Use safe fallback in case localStorage is empty or corrupted
    books = JSON.parse(localStorage.getItem('unity_books_db')) || [];

    // If the stored DB is missing or empty, restore the seeded defaultBooks
    if (!Array.isArray(books) || books.length === 0) {
        if (typeof defaultBooks !== 'undefined' && Array.isArray(defaultBooks) && defaultBooks.length > 0) {
            console.info('unity_books_db is missing or empty — restoring defaultBooks.');
            localStorage.setItem('unity_books_db', JSON.stringify(defaultBooks));
            books = JSON.parse(localStorage.getItem('unity_books_db')) || [];
        } else {
            console.warn('defaultBooks is not available to restore.');
        }
    }

    // Keep a window property in sync for inline page scripts
    window.books = books;

    // Debug log to help trace issues
    console.info(`refreshBookData: loaded ${books.length} book(s)`);

    // Then call your display functions to update the UI (only if relevant elements exist)
    if (typeof displayBooks === 'function' && document.getElementById('books-container')) {
        displayBooks(books);
    }
    if (typeof displayFeaturedBooks === 'function' && document.getElementById('featured-books')) {
        displayFeaturedBooks();
    }
}


// ========== GLOBAL FUNCTIONS FOR ALL PAGES ==========

// Make books array globally accessible
window.books = books;

// Add to cart function
window.addToCart = function(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        id: book.id,
        title: book.title,
        price: book.price,
        quantity: 1
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    document.getElementById('modal-message').textContent = `"${book.title}" has been added to your cart.`;
    modal.show();
};

// Update cart count
window.updateCartCount = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
};

// Display featured books on homepage
window.displayFeaturedBooks = function() {
    let featuredBooks = books.filter(book => book.featured);
    const container = document.getElementById('featured-books');

    if (!container) return;

    // Remove loading spinner if it exists
    const spinner = container.querySelector('.spinner-border');
    if (spinner) spinner.remove();

    // Fallback: if no books are explicitly featured, show the first 4 books
    if (!featuredBooks || featuredBooks.length === 0) {
        if (Array.isArray(books) && books.length > 0) {
            featuredBooks = books.slice(0, 4);
            console.info('No featured books flagged — showing top picks as fallback.');
        } else {
            container.innerHTML = `<div class="col-12 text-center py-5"><p class="text-muted">No featured books available.</p></div>`;
            return;
        }
    }

    container.innerHTML = featuredBooks.map(book => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card book-card h-100">
                <img src="images/books/${book.image}" class="card-img-top" alt="${book.title}" 
                     onerror="this.src='https://via.placeholder.com/300x400?text=${encodeURIComponent(book.title.substring(0, 20))}'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text text-muted">${book.author}</p>
                    
                    <!-- STAR RATING -->
                    <div class="small text-warning mb-2">
                        ${getStarRating(book.id)}
                        <span class="text-muted ms-1">(${getReviewCount(book.id)})</span>
                    </div>
                    
                    <p class="card-text flex-grow-1">${book.description ? book.description.substring(0, 80) : ''}...</p>
                    <div class="mt-auto">
                        <p class="h4 text-primary">ETB ${(parseFloat(book.price) || 0).toFixed(2)}</p>
                        <button class="btn btn-primary w-100" onclick="addToCart(${book.id})">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                        <a href="product.html?id=${book.id}" class="btn btn-outline-secondary w-100 mt-2">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};

// Star rating functions (GLOBAL)
window.getStarRating = function(bookId) {
    const allReviews = JSON.parse(localStorage.getItem('bookReviews')) || {};
    const reviews = allReviews[bookId] || [];
    
    if (reviews.length === 0) {
        return '<span class="text-muted">No reviews yet</span>';
    }
    
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 >= 0.5;
    
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="bi bi-star-fill"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="bi bi-star-half"></i>';
        } else {
            stars += '<i class="bi bi-star"></i>';
        }
    }
    
    return stars;
};

window.getReviewCount = function(bookId) {
    const allReviews = JSON.parse(localStorage.getItem('bookReviews')) || {};
    const reviews = allReviews[bookId] || [];
    return reviews.length;
};

// Display books function (for books.html)
window.displayBooks = function(booksToDisplay) {
    const container = document.getElementById('books-container');
    const noBooksMessage = document.getElementById('no-books-message');
    
    if (!container) return;
    
    if (!booksToDisplay || booksToDisplay.length === 0) {
        container.innerHTML = '';
        container.classList.add('d-none');
        if (noBooksMessage) noBooksMessage.classList.remove('d-none');
        const booksCount = document.getElementById('books-count');
        if (booksCount) booksCount.textContent = 'No books found';
        return;
    }
    
    container.classList.remove('d-none');
    if (noBooksMessage) noBooksMessage.classList.add('d-none');
    
    const booksCount = document.getElementById('books-count');
    if (booksCount) {
        booksCount.textContent = `${booksToDisplay.length} ${booksToDisplay.length === 1 ? 'book' : 'books'} found`;
    }
    
    container.innerHTML = booksToDisplay.map(book => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card book-card h-100">
                <img src="images/books/${book.image}" class="card-img-top" alt="${book.title}"
                     onerror="this.src='https://via.placeholder.com/300x400?text=${encodeURIComponent(book.title.substring(0, 20))}'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text text-muted">${book.author}</p>
                    
                    <!-- STAR RATING -->
                    <div class="small text-warning mb-2">
                        ${getStarRating(book.id)}
                        <span class="text-muted ms-1">(${getReviewCount(book.id)})</span>
                    </div>
                    
                    <p class="card-text flex-grow-1">${book.description.substring(0, 80)}...</p>
                    <div class="mt-auto">
                        <span class="badge bg-secondary mb-2">${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</span>
                        <p class="h4 text-primary">ETB ${(parseFloat(book.price) || 0).toFixed(2)}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" onclick="addToCart(${book.id})">
                                <i class="bi bi-cart-plus"></i> Add to Cart
                            </button>
                            <a href="product.html?id=${book.id}" class="btn btn-outline-secondary">
                                View Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};

// Filter books by category
window.filterBooksByCategory = function(category) {
    if (category === 'all') {
        displayBooks(books);
    } else {
        const filteredBooks = books.filter(book => book.category === category);
        displayBooks(filteredBooks);
    }
};

// Sort books
window.sortBooks = function(sortBy) {
    let sortedBooks = [...books];
    
    switch(sortBy) {
        case 'price-low':
            sortedBooks.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedBooks.sort((a, b) => b.price - a.price);
            break;
        case 'title-asc':
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            sortedBooks = books;
    }
    
    displayBooks(sortedBooks);
};

// Search books
window.searchBooks = function(query) {
    if (!query) {
        displayBooks(books);
        const resultsDiv = document.getElementById('books-search-results');
        if (resultsDiv) resultsDiv.innerHTML = '';
        return;
    }
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
    );
    
    const resultsDiv = document.getElementById('books-search-results');
    if (resultsDiv) {
        if (filteredBooks.length === 0) {
            resultsDiv.innerHTML = `
                <div class="alert alert-warning">
                    No books found for "<strong>${query}</strong>". Try a different search term.
                </div>
            `;
        } else {
            resultsDiv.innerHTML = `
                <div class="alert alert-info">
                    Found ${filteredBooks.length} ${filteredBooks.length === 1 ? 'book' : 'books'} for "<strong>${query}</strong>"
                </div>
            `;
        }
    }
    
    displayBooks(filteredBooks);
};

// Homepage Search Functionality
window.performHomeSearch = function() {
    const searchInput = document.getElementById('main-search');
    const resultsDiv = document.getElementById('search-results');
    
    if (!searchInput || !resultsDiv) return;
    
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
        resultsDiv.innerHTML = '<p class="text-muted">Enter at least 2 characters to search.</p>';
        return;
    }
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );
    
    if (filteredBooks.length === 0) {
        resultsDiv.innerHTML = '<p class="text-muted">No books found. Try a different search term.</p>';
        return;
    }
    
    resultsDiv.innerHTML = `
        <h5 class="mb-3">Search Results (${filteredBooks.length})</h5>
        <div class="row g-3">
            ${filteredBooks.map(book => `
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-8">
                                    <h6 class="card-title">${book.title}</h6>
                                    <p class="card-text text-muted">${book.author} | ${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</p>
                                    <p class="card-text">${book.description.substring(0, 100)}...</p>
                                </div>
                                <div class="col-md-4 text-end">
                                    <p class="h5 text-primary">ETB ${book.price.toFixed(2)}</p>
                                    <button class="btn btn-sm btn-primary" onclick="addToCart(${book.id})">
                                        <i class="bi bi-cart-plus"></i> Add to Cart
                                    </button>
                                    <a href="product.html?id=${book.id}" class="btn btn-sm btn-outline-secondary">
                                        Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};

// Universal Navbar Search Function (works on all pages)
window.setupNavbarSearch = function() {
    // Try multiple possible element IDs (for different pages)
    const navSearchBtn = document.getElementById('nav-search-btn');
    const navSearchInput = document.getElementById('nav-search');
    
    if (!navSearchBtn || !navSearchInput) {
        console.log('Navbar search elements not found or already handled');
        return;
    }
    
    console.log('Setting up navbar search...');
    
    function performNavSearch() {
        const query = navSearchInput.value.trim();
        console.log('Nav search query:', query);
        
        if (!query) {
            alert('Please enter a search term.');
            return;
        }
        
        // Always redirect to books.html with search parameter
        window.location.href = `books.html?search=${encodeURIComponent(query)}`;
    }
    
    // Add click event
    navSearchBtn.addEventListener('click', performNavSearch);
    
    // Add enter key event
    navSearchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performNavSearch();
        }
    });
    
    console.log('Navbar search setup complete');
};

// ========== WISHLIST FUNCTIONS ==========

// Add to wishlist
window.addToWishlist = function(bookId, showAlert = true) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if book already in wishlist
    if (wishlist.some(item => item.id === bookId)) {
        if (showAlert) {
            showWishlistNotification(`"${book.title}" is already in your wishlist`, 'info');
        }
        return;
    }
    
    // Add to wishlist
    wishlist.push({
        id: book.id,
        title: book.title,
        price: book.price,
        addedDate: new Date().toISOString()
    });
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    if (showAlert) {
        showWishlistNotification(`"${book.title}" added to wishlist!`, 'success');
    }
};

// Update wishlist count in navbar
window.updateWishlistCount = function() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistCountElements = document.querySelectorAll('#wishlist-count');
    
    wishlistCountElements.forEach(element => {
        element.textContent = wishlist.length;
    });
};

// Remove from wishlist
window.removeFromWishlist = function(bookId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== bookId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    // Refresh wishlist page if open
    if (window.location.pathname.includes('wishlist.html')) {
        window.location.reload();
    }
};

// Show wishlist notification
function showWishlistNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 80px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            const bsAlert = new bootstrap.Alert(notification);
            bsAlert.close();
        }
    }, 5000);
}

// Check if item is in wishlist
window.isInWishlist = function(bookId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.some(item => item.id === bookId);
};

// Initialize wishlist count on all pages
document.addEventListener('DOMContentLoaded', function() {
    updateWishlistCount();
});

// Initialize all pages
window.initializePage = function() {
    updateCartCount();
    
    // Setup homepage features if elements exist
    if (document.getElementById('featured-books')) {
        displayFeaturedBooks();
    }
    
    if (document.getElementById('main-search')) {
        const searchInput = document.getElementById('main-search');
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performHomeSearch();
            }
        });
        // Add this inside window.initializePage
const balance = localStorage.getItem('user_balance') || '27261.23';
const balanceElement = document.getElementById('nav-balance');
if (balanceElement) {
    balanceElement.textContent = balance;
} 
    }
    
    if (document.getElementById('nav-search')) {
        setupNavbarSearch();
    }
    
    // Check book count
    if (books.length < 20) {
        console.log(`Note: You have ${books.length} books. Add ${20 - books.length} more to meet requirements.`);
    }
};
// Homepage Search Functions
function setupHomepageSearch() {
    console.log('Setting up homepage search...');
    
    // Main search button (large search section)
    const mainSearchBtn = document.getElementById('main-search-btn');
    const mainSearchInput = document.getElementById('main-search');
    const searchResults = document.getElementById('search-results');
    
    if (mainSearchBtn && mainSearchInput) {
        mainSearchBtn.addEventListener('click', function() {
            console.log('Main search clicked');
            performHomepageSearch(mainSearchInput.value);
        });
        
        mainSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                console.log('Enter pressed in main search');
                performHomepageSearch(this.value);
            }
        });
    }
    
    // Navbar search
    const navSearchBtn = document.getElementById('nav-search-btn');
    const navSearchInput = document.getElementById('nav-search');
    
   /* if (navSearchBtn && navSearchInput) {
        navSearchBtn.addEventListener('click', function() {
            console.log('Nav search clicked');
            const query = navSearchInput.value.trim();
            if (query) {
                // Redirect to books page with search
                window.location.href = `books.html?search=${encodeURIComponent(query)}`;
            }
        });
        
        navSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Enter pressed in nav search');
                const query = this.value.trim();
                if (query) {
                    window.location.href = `books.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }*/
}

function performHomepageSearch(query) {
    console.log('Performing search for:', query);
    const searchResults = document.getElementById('search-results');
    
    if (!searchResults) {
        console.error('Search results container not found!');
        return;
    }
    
    const trimmedQuery = query.toLowerCase().trim();
    
    if (trimmedQuery.length < 2) {
        searchResults.innerHTML = `
            <div class="alert alert-info mt-3">
                <i class="fas fa-info-circle me-2"></i>
                Please enter at least 2 characters to search.
            </div>
        `;
        return;
    }
    
    // Filter books
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(trimmedQuery) || 
        book.author.toLowerCase().includes(trimmedQuery) ||
        book.category.toLowerCase().includes(trimmedQuery) ||
        book.description.toLowerCase().includes(trimmedQuery)
    );
    
    if (filteredBooks.length === 0) {
        searchResults.innerHTML = `
            <div class="alert alert-warning mt-3">
                <i class="fas fa-search me-2"></i>
                No books found for "<strong>${query}</strong>". Try a different search term.
            </div>
        `;
        return;
    }
    
    // Display results
    searchResults.innerHTML = `
        <div class="search-results-container mt-4">
            <h5 class="mb-3">
                <i class="fas fa-search me-2"></i>
                Search Results (${filteredBooks.length} found)
            </h5>
            <div class="row g-3">
                ${filteredBooks.map(book => `
                    <div class="col-12">
                        <div class="card search-result-card border-0 shadow-sm">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-md-2">
                                        <img src="images/books/${book.image}" 
                                             class="img-fluid rounded" 
                                             alt="${book.title}"
                                             onerror="this.src='https://via.placeholder.com/150x200?text=Book+Cover'">
                                    </div>
                                    <div class="col-md-7">
                                        <h6 class="card-title mb-1">${book.title}</h6>
                                        <p class="card-text text-muted small mb-1">
                                            <i class="fas fa-user me-1"></i> ${book.author}
                                        </p>
                                        <p class="card-text text-muted small mb-1">
                                            <i class="fas fa-tag me-1"></i> ${book.category.charAt(0).toUpperCase() + book.category.slice(1)}
                                        </p>
                                        <p class="card-text small">${book.description.substring(0, 120)}...</p>
                                        
                                        <!-- Star Rating -->
                                        <div class="small text-warning mb-2">
                                            ${getStarRating(book.id)}
                                            <span class="text-muted ms-1">(${getReviewCount(book.id)})</span>
                                        </div>
                                    </div>
                                    <div class="col-md-3 text-end">
                                        <p class="h5 text-primary mb-2">ETB ${book.price.toFixed(2)}</p>
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-sm btn-primary" onclick="addToCart(${book.id})">
                                                <i class="fas fa-cart-plus"></i> Add to Cart
                                            </button>
                                            <a href="product.html?id=${book.id}" class="btn btn-sm btn-outline-primary">
                                                <i class="fas fa-info-circle"></i> View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Call this in your initializePage function
function initializePage() {
    updateCartCount();
    
    // Setup homepage features if elements exist
    if (document.getElementById('featured-books')) {
        displayFeaturedBooks();
    }
    
    // Setup search functionality
    setupHomepageSearch();
    
    // Check book count
    if (books.length < 20) {
        console.log(`Note: You have ${books.length} books. Add ${20 - books.length} more to meet requirements.`);
    }
}

// Update the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    // Load featured books if on homepage
    if (document.getElementById('featured-books')) {
        displayFeaturedBooks();
    }
    
    // Setup homepage search
    setupHomepageSearch();
    
    // Setup navbar search (for all pages)
    setupNavbarSearch();
    
    // Back to top button
    const backToTopBtn = document.querySelector('.btn-back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const mainSearch = document.getElementById('main-search');
    const mainSearchBtn = document.getElementById('main-search-btn');
    const mainClearBtn = document.getElementById('main-clear-btn');
    const searchResults = document.getElementById('search-results');

    // Only bind handlers if all elements exist on the page
    if (mainSearch && mainSearchBtn && mainClearBtn && searchResults) {
        // Show/Hide Clear button based on input
        mainSearch.addEventListener('input', function() {
            if (this.value.length > 0) {
                mainClearBtn.classList.remove('d-none');
            } else {
                mainClearBtn.classList.add('d-none');
            }
        });

        // Clear Button Functionality
        mainClearBtn.addEventListener('click', function() {
            mainSearch.value = ''; // Clear input text
            this.classList.add('d-none'); // Hide clear button
            searchResults.innerHTML = ''; // Remove search results from the page
            mainSearch.focus(); // Return focus to search bar
        });

        // Integrated Search Functionality
        const performSearch = () => {
            const query = mainSearch.value.trim();
            if (query) {
                // This calls your existing search logic in script.js
                if (typeof performHomeSearch === 'function') {
                    performHomeSearch();
                }
            }
        };

        mainSearchBtn.addEventListener('click', performSearch);
        
        // Allow pressing "Enter" to search
        mainSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});
window.updateBalanceDisplay = function() {
    const balance = localStorage.getItem('user_balance') || '27261.23';
    
    // Update Navbar balance
    const navBalance = document.getElementById('nav-balance');
    if (navBalance) navBalance.textContent = balance;

    // Update History page balance
    const historyBalance = document.getElementById('history-balance');
    if (historyBalance) historyBalance.textContent = balance;
};
// Handle the final purchase button
window.confirmPurchase = function() {
    const totalElement = document.getElementById('cart-total');
    if (!totalElement) return;
    
    // Parse number robustly (remove currency symbols like 'ETB' and other non-numeric characters)
    const totalAmount = parseFloat(totalElement.textContent.replace(/[^\d.-]/g, ''));
    const result = processTransaction(totalAmount);

    if (result.success) {
        alert(`Payment Successful!\nTransaction ID: ${result.trxId}`);
        localStorage.setItem('cart', JSON.stringify([])); // Clear cart
        
        // Update the display immediately
        updateBalanceDisplay();
        
        // Close modal if exists
        const modalElement = document.getElementById('checkoutModal');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        }
        
        // Refresh to show empty cart and new balance
        window.location.reload(); 
    } else {
        alert("PAYMENT REJECTED: " + result.message);
    }
};

// Update cart count icon
window.updateCartCount = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = cart.length;
};

// Free-shipping helpers
function getFreeShippingThreshold() {
    return parseFloat(localStorage.getItem('free_shipping_threshold')) || 50;
}
function updateFreeShippingText() {
    const val = getFreeShippingThreshold();
    const nodes = document.querySelectorAll('#free-shipping-threshold, .free-shipping-text');
    nodes.forEach(el => {
        if (el.id === 'free-shipping-threshold') el.textContent = `ETB ${val.toFixed(2)}`;
        else el.textContent = `Free shipping on orders over ETB ${val.toFixed(2)}`;
    });
}

// ========================================
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateBalanceDisplay();
    
    // Ensure books are up-to-date and UI is refreshed
    refreshBookData();
    
    // If on homepage, display featured books
    if (document.getElementById('featured-books')) {
        displayFeaturedBooks();
    }

    // Update free shipping text across pages
    updateFreeShippingText();
});