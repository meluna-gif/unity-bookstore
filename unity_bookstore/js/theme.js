// Premium Theme Switcher
class ThemeManager {
    constructor() {
        this.themes = ['light', 'dark', 'wood', 'forest'];
        this.orb = document.getElementById('theme-switcher-orb');
        this.options = document.getElementById('theme-options');
        this.particles = document.getElementById('theme-particles');
        this.init();
    }
    
    init() {
        this.loadTheme();
        this.createOverlay();
        this.bindEvents();
        this.updateMetaTags();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('preferred-theme') || 'light';
        this.setTheme(savedTheme, false); // false = no animation on load
    }
    
    setTheme(theme, animate = true) {
        if (!this.themes.includes(theme)) return;
        
        if (animate) {
            // Create ripple effect
            this.createRipple();
            
            // Show transition overlay
            this.showOverlay();
            
            // Change theme after delay
            setTimeout(() => {
                this.applyTheme(theme);
                this.hideOverlay();
                this.createParticles();
            }, 300);
        } else {
            // Apply theme immediately without animation
            this.applyTheme(theme);
        }
    }
    
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('preferred-theme', theme);
        this.updateActiveButton(theme);
        this.updateMetaTags();
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    updateActiveButton(theme) {
        document.querySelectorAll('.theme-option').forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-theme') === theme) {
                button.classList.add('active');
            }
        });
    }
    
    updateMetaTags() {
        const theme = document.body.getAttribute('data-theme');
        let themeColor;
        
        switch(theme) {
            case 'dark':
                themeColor = '#121212';
                break;
            case 'wood':
                themeColor = '#8B4513';
                break;
            case 'forest':
                themeColor = '#2E8B57';
                break;
            default:
                themeColor = '#4a6fa5';
        }
        
        // Update theme-color meta tag
        const metaTag = document.querySelector('meta[name="theme-color"]');
        if (metaTag) {
            metaTag.setAttribute('content', themeColor);
        }
    }
    
    createOverlay() {
        if (!document.getElementById('theme-transition-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'theme-transition-overlay';
            overlay.className = 'theme-transition-overlay';
            document.body.appendChild(overlay);
        }
    }
    
    showOverlay() {
        const overlay = document.getElementById('theme-transition-overlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
    
    hideOverlay() {
        const overlay = document.getElementById('theme-transition-overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 500);
        }
    }
    
    createRipple() {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        const rect = this.orb.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.left + rect.width / 2 - size / 2;
        const y = rect.top + rect.height / 2 - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        document.body.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
    
    createParticles() {
        // Clear existing particles
        this.particles.innerHTML = '';
        
        // Create 15 particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: var(--primary-color);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                opacity: ${Math.random() * 0.5 + 0.5};
            `;
            
            this.particles.appendChild(particle);
            
            // Animate particle
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1000 + 500;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.2, 0, 0.8, 1)'
            });
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, duration);
        }
    }
    
    bindEvents() {
        // Toggle theme options
        this.orb.addEventListener('click', (e) => {
            e.stopPropagation();
            this.options.classList.toggle('show');
        });
        
        // Theme selection
        document.querySelectorAll('.theme-option').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const theme = button.getAttribute('data-theme');
                this.setTheme(theme);
                this.options.classList.remove('show');
                
                // Add click animation to button
                button.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
            });
        });
        
        // Close theme options when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.orb.contains(e.target) && !this.options.contains(e.target)) {
                this.options.classList.remove('show');
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.options.classList.remove('show');
            }
        });
        
        // Keyboard shortcuts for theme switching
        document.addEventListener('keydown', (e) => {
            // Alt + 1-4 for quick theme switching
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        this.setTheme('light');
                        break;
                    case '2':
                        this.setTheme('dark');
                        break;
                    case '3':
                        this.setTheme('wood');
                        break;
                    case '4':
                        this.setTheme('forest');
                        break;
                }
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    
    // Listen for theme changes to update any theme-specific elements
    document.addEventListener('themeChanged', (e) => {
        console.log(`Theme changed to: ${e.detail.theme}`);
    });
});