document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // Hero Text Animator (Character Typing Effect)
    // ==========================================================================
    function typeText(containerId, text, baseDelay = 300, charDelay = 150) {
        const container = document.getElementById(containerId);
        if (!container) return;

        text.split('').forEach((char, index) => {
            const span = document.createElement("span");
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = char;
            }
            span.className = "hero-char";
            container.appendChild(span);
            
            // Stagger animation
            setTimeout(() => {
                span.classList.add("visible");
            }, baseDelay + (index * charDelay));
        });
    }

    function loopText(containerId, text, startDelay, charDelay, pauseDuration) {
        const container = document.getElementById(containerId);
        if (!container) return;

        function animate() {
            container.innerHTML = ""; // clear previous spans
            const chars = text.split('');
            
            chars.forEach((char, index) => {
                const span = document.createElement("span");
                if (char === ' ') {
                    span.innerHTML = '&nbsp;';
                } else {
                    span.textContent = char;
                }
                span.className = "hero-char";
                container.appendChild(span);
                
                // Type in
                setTimeout(() => {
                    span.classList.add("visible");
                }, index * charDelay);
            });

            const totalTypeTime = chars.length * charDelay;
            
            // Wait for display pause, then fade out
            setTimeout(() => {
                const spans = container.querySelectorAll('.hero-char');
                spans.forEach(span => span.classList.remove('visible'));
                
                // Wait for CSS fade out transition (400ms) before restarting
                setTimeout(animate, 600); 
            }, totalTypeTime + pauseDuration);
        }

        setTimeout(animate, startDelay);
    }

    // Animate the main name (types once)
    const nameText = "Shivam.";
    typeText("hero-name", nameText, 300, 150);

    // Animate the skills underneath continuously
    const skillsText = "AI Engineer • Gen AI • Python";
    loopText("hero-skills", skillsText, 1500, 60, 3000); // 3-second pause between loops

    // ==========================================================================
    // Click Spark Canvas Animation
    // ==========================================================================
    const canvas = document.getElementById("click-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let sparks = [];

        // Resize canvas to fill window
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        class Spark {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 6 - 3;
                this.speedY = Math.random() * 6 - 3;
                this.color = `hsl(${Math.random() * 40 + 30}, 100%, 60%)`; // Amber/Orange range
                this.life = 100;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 2;
                this.size -= 0.05;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const animateSparks = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < sparks.length; i++) {
                sparks[i].update();
                sparks[i].draw();
                if (sparks[i].life <= 0 || sparks[i].size <= 0.1) {
                    sparks.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animateSparks);
        };
        animateSparks();

        window.addEventListener("click", (e) => {
            // Create 15-20 sparks on click
            const numSparks = Math.random() * 5 + 15;
            for (let i = 0; i < numSparks; i++) {
                sparks.push(new Spark(e.clientX, e.clientY));
            }
        });
    }

    // ==========================================================================
    // Mobile Menu Toggle
    // ==========================================================================
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileDropdown = document.getElementById("mobile-dropdown");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    if (mobileBtn && mobileDropdown) {
        let isMenuOpen = false;

        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                // Open menu
                mobileDropdown.style.transform = "translateX(0)";
                // Animate hamburger to X
                mobileBtn.querySelector('.top-line').style.transform = 'translateY(8px) rotate(45deg)';
                mobileBtn.querySelector('.middle-line').style.opacity = '0';
                mobileBtn.querySelector('.bottom-line').style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                // Close menu
                mobileDropdown.style.transform = "translateX(-100%)";
                // Reset hamburger
                mobileBtn.querySelector('.top-line').style.transform = 'none';
                mobileBtn.querySelector('.middle-line').style.opacity = '1';
                mobileBtn.querySelector('.bottom-line').style.transform = 'none';
            }
        };

        mobileBtn.addEventListener("click", toggleMenu);

        // Close when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (isMenuOpen) toggleMenu();
            });
        });
    }

    // ==========================================================================
    // Theme Toggle Logic
    // ==========================================================================
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        const icon = themeBtn.querySelector("i");
        
        // Ensure strictly dark or light
        const currentTheme = localStorage.getItem("theme") || "dark";
        if (currentTheme === "light") {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
            icon.classList.replace("fa-sun", "fa-moon");
        }

        themeBtn.addEventListener("click", () => {
            const isDark = document.documentElement.classList.contains("dark");
            if (isDark) {
                document.documentElement.classList.replace("dark", "light");
                icon.classList.replace("fa-moon", "fa-sun");
                localStorage.setItem("theme", "light");
            } else {
                document.documentElement.classList.replace("light", "dark");
                icon.classList.replace("fa-sun", "fa-moon");
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // ==========================================================================
    // GSAP Scroll Animations
    // ==========================================================================
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fade up elements in About section
        gsap.utils.toArray('.scroll-fade-up').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });
    }

    // ==========================================================================
    // Mouse Following Cat
    // ==========================================================================
    const mouseCat = document.getElementById('mouse-cat');
    if (mouseCat) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let catX = mouseX;
        let catY = mouseY;
        let catFaceDirection = 1;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (mouseCat.style.opacity === '0' || mouseCat.style.opacity === '') {
                mouseCat.style.opacity = '1';
                catX = mouseX;
                catY = mouseY;
            }
        });

        document.addEventListener('mouseleave', () => {
            mouseCat.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            mouseCat.style.opacity = '1';
        });

        const updateCatPos = () => {
            const dx = mouseX - catX;
            const dy = mouseY - catY;
            
            catX += dx * 0.15;
            catY += dy * 0.15;

            if (dx > 1) {
                catFaceDirection = 1;
            } else if (dx < -1) {
                catFaceDirection = -1;
            }

            const distance = Math.sqrt(dx * dx + dy * dy);
            
            let scaleY = 1;
            let stretchX = 1;

            if (distance > 3) {
                // Add walking animation class
                mouseCat.classList.add("walking");
                
                // Squash and stretch when moving fast
                if (distance > 20) {
                    scaleY = 0.85;
                    stretchX = 1.15;
                }
            } else {
                // Remove walking animation class when static
                mouseCat.classList.remove("walking");
            }

            // Offset from cursor
            const offsetX = 15;
            const offsetY = 15;

            // Translate then scale (no manual rotation needed for sprite)
            mouseCat.style.transform = `translate(${catX + offsetX}px, ${catY + offsetY}px) scale(${catFaceDirection * stretchX}, ${scaleY})`;
            
            requestAnimationFrame(updateCatPos);
        };
        updateCatPos();
    }
});
