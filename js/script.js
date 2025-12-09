// Unity Bookstore - Main JavaScript File

// Sample Book Data (Minimum 20 books)
// Unity Bookstore - Complete Book Catalog (20+ Books)
const books = [
    {
        id: 1,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        price: 45.99,
        category: "education",
        image: "algorithms.jpg",
        description: "Comprehensive guide to computer algorithms and data structures. Essential for computer science students.",
        featured: true
    },
    {
        id: 2,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 12.99,
        category: "fiction",
        image: "gatsby.jpg",
        description: "Classic American novel about the Jazz Age, wealth, and the American Dream.",
        featured: true
    },
    {
        id: 3,
        title: "Research Methods in Psychology",
        author: "David G. Elmes",
        price: 60.00,
        category: "research",
        image: "psychology.jpg",
        description: "Essential textbook for academic research methodologies in psychology.",
        featured: true
    },
    {
        id: 4,
        title: "The Very Hungry Caterpillar",
        author: "Eric Carle",
        price: 8.99,
        category: "children",
        image: "caterpillar.jpg",
        description: "Beloved children's picture book about transformation and growth.",
        featured: true
    },
    {
        id: 5,
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        price: 39.99,
        category: "education",
        image: "cleancode.jpg",
        description: "Best practices for writing maintainable, efficient, and clean code.",
        featured: true
    },
    {
        id: 6,
        title: "1984",
        author: "George Orwell",
        price: 10.99,
        category: "fiction",
        image: "1984.jpg",
        description: "Dystopian social science fiction novel about totalitarian regime.",
        featured: false
    },
    {
        id: 7,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 11.99,
        category: "fiction",
        image: "mockingbird.jpg",
        description: "Classic novel addressing racial injustice and moral growth.",
        featured: false
    },
    {
        id: 8,
        title: "Data Structures and Algorithms in Python",
        author: "Michael T. Goodrich",
        price: 55.00,
        category: "education",
        image: "python_dsa.jpg",
        description: "Comprehensive guide to data structures using Python programming language.",
        featured: false
    },
    {
        id: 9,
        title: "The Cat in the Hat",
        author: "Dr. Seuss",
        price: 7.99,
        category: "children",
        image: "catinthehat.jpg",
        description: "Fun and educational children's book with rhyming text.",
        featured: false
    },
    {
        id: 10,
        title: "Academic Writing for Graduate Students",
        author: "John M. Swales",
        price: 35.00,
        category: "research",
        image: "academic_writing.jpg",
        description: "Guide to writing research papers, theses, and dissertations.",
        featured: false
    },
    {
        id: 11,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 9.99,
        category: "fiction",
        image: "pride.jpg",
        description: "Romantic novel of manners set in early 19th century England.",
        featured: false
    },
    {
        id: 12,
        title: "Computer Networking: A Top-Down Approach",
        author: "James F. Kurose",
        price: 65.99,
        category: "education",
        image: "networking.jpg",
        description: "Comprehensive textbook on computer networking principles.",
        featured: false
    },
    {
        id: 13,
        title: "Goodnight Moon",
        author: "Margaret Wise Brown",
        price: 6.99,
        category: "children",
        image: "goodnight.jpg",
        description: "Beloved bedtime story for young children.",
        featured: false
    },
    {
        id: 14,
        title: "Qualitative Research Methods",
        author: "Monique Hennink",
        price: 42.00,
        category: "research",
        image: "qualitative.jpg",
        description: "Guide to qualitative research design, data collection, and analysis.",
        featured: false
    },
    {
        id: 15,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 13.99,
        category: "fiction",
        image: "hobbit.jpg",
        description: "Fantasy novel about Bilbo Baggins' adventure in Middle-earth.",
        featured: false
    },
    {
        id: 16,
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        price: 58.99,
        category: "education",
        image: "database.jpg",
        description: "Comprehensive introduction to database systems.",
        featured: false
    },
    {
        id: 17,
        title: "Brown Bear, Brown Bear, What Do You See?",
        author: "Bill Martin Jr.",
        price: 5.99,
        category: "children",
        image: "brownbear.jpg",
        description: "Classic children's picture book with repetitive text and colorful illustrations.",
        featured: false
    },
    {
        id: 18,
        title: "Research Design: Qualitative, Quantitative, and Mixed Methods Approaches",
        author: "John W. Creswell",
        price: 48.00,
        category: "research",
        image: "research_design.jpg",
        description: "Guide to planning, conducting, and evaluating research.",
        featured: false
    },
    {
        id: 19,
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        price: 14.99,
        category: "fiction",
        image: "harrypotter.jpg",
        description: "First book in the Harry Potter series about a young wizard.",
        featured: false
    },
    {
        id: 20,
        title: "Operating System Concepts",
        author: "Abraham Silberschatz",
        price: 62.99,
        category: "education",
        image: "os.jpg",
        description: "Comprehensive textbook on operating system principles.",
        featured: false
    },
    {
        id: 21,
        title: "Where the Wild Things Are",
        author: "Maurice Sendak",
        price: 8.49,
        category: "children",
        image: "wildthings.jpg",
        description: "Classic children's picture book about imagination and adventure.",
        featured: false
    },
    {
        id: 22,
        title: "Statistics for Research",
        author: "Sharon L. Lohr",
        price: 52.00,
        category: "research",
        image: "statistics.jpg",
        description: "Statistical methods for research design and data analysis.",
        featured: false
    }
];

// Add to cart function
// In your script.js file, make sure you have:
function addToCart(bookId) {
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
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('main-search');
    const searchBtn = document.getElementById('main-search-btn');
    const resultsDiv = document.getElementById('search-results');
    
    if (!searchInput || !searchBtn || !resultsDiv) return;
    
    function performSearch() {
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
                                        <p class="h5 text-primary">$${book.price.toFixed(2)}</p>
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
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}
// Homepage Search Functionality
function performHomeSearch() {
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
                                    <p class="h5 text-primary">$${book.price.toFixed(2)}</p>
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
}

// Also add event listener for Enter key in homepage search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('main-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performHomeSearch();
            }
        });
    }
});
// Navbar Search Functionality
function setupNavbarSearch() {
    const navSearch = document.getElementById('nav-search');
    const navSearchBtn = document.getElementById('nav-search-btn');
    
    if (!navSearch || !navSearchBtn) return;
    
    function performNavSearch() {
        const query = navSearch.value.trim();
        if (query) {
            // Redirect to books page with search parameter
            window.location.href = `books.html?search=${encodeURIComponent(query)}`;
        }
    }
    
    navSearchBtn.addEventListener('click', performNavSearch);
    navSearch.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performNavSearch();
        }
    });
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayFeaturedBooks(<img src="https://via.placeholder.com/300x400?text=${encodeURIComponent(book.title.substring(0, 20))}" 
     class="card-img-top" 
     alt="${book.title}"></img>);
    setupSearch();
    setupNavbarSearch(); // Add this line
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayFeaturedBooks();
    setupSearch();
    
    // Add more books if needed (to reach 20)
    if (books.length < 20) {
        console.log(`Note: You have ${books.length} books. Add ${20 - books.length} more to meet requirements.`);
    }
});