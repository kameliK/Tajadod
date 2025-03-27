document.addEventListener("DOMContentLoaded", function() {
    // Main application object to organize functionality
    const app = {
        // Initialize all components
        init: function() {
            this.setupImageHoverEffects();
            this.setupThemeToggle();
            this.setupLanguageToggle();
            this.setupCounters();
            this.setupSectionAnimations();
            this.setupCardHoverEffects();
            this.setupFlagsDropdown();
            this.setupMaterialCheckboxes();
            this.setupConfirmationButton();
            this.setupModalFunctions();
            this.setupMobileNavigation();
            this.setupStatisticsBoxes();
            this.setupSection3Observer();
        },

        // Image hover effects
        setupImageHoverEffects: function() {
            const hoverImages = [
                { 
                    id: 'hover-img', 
                    hoverSrc: './img/2 (2).jpg', 
                    defaultSrc: './img/1.jpg' 
                },
                { 
                    id: 'hover-img-3', 
                    hoverSrc: './img/flat-lay-arrangement-zero-waste-lettering-with-copy-space.jpg', 
                    defaultSrc: './img/jordan-map-design-with-flag-light-background-vector_1142-3683.jpg' 
                }
            ];

            hoverImages.forEach(imgConfig => {
                const imgElement = document.getElementById(imgConfig.id);
                if (imgElement) {
                    imgElement.addEventListener('mouseover', () => {
                        imgElement.src = imgConfig.hoverSrc;
                    });
                    imgElement.addEventListener('mouseout', () => {
                        imgElement.src = imgConfig.defaultSrc;
                    });
                }
            });
        },

        // Theme toggle functionality
        setupThemeToggle: function() {
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('change', function() {
                    document.body.classList.toggle('light-mode', !this.checked);
                    document.body.classList.toggle('dark-mode', this.checked);
                });
            }
        },

        // Language toggle functionality
        setupLanguageToggle: function() {
            const languageToggle = document.getElementById('language-toggle');
            if (languageToggle) {
                languageToggle.addEventListener('change', function() {
                    const labelEn = document.getElementById('slider-label-en');
                    const labelAr = document.getElementById('slider-label-ar');
                    
                    if (labelEn && labelAr) {
                        labelEn.style.opacity = this.checked ? '0' : '1';
                        labelAr.style.opacity = this.checked ? '1' : '0';
                    }
                });
            }
        },

        // Counter animation
        setupCounters: function() {
            const counters = document.querySelectorAll(".counter");
            if (counters.length === 0) return;

            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const counter = entry.target;
                            const target = +counter.getAttribute("data-target");
                            let count = 0;
                            const increment = target / 150;

                            const updateCounter = () => {
                                if (count < target) {
                                    count += increment;
                                    counter.innerText = Math.floor(count);
                                    setTimeout(updateCounter, 20);
                                } else {
                                    counter.innerText = target;
                                }
                            };

                            updateCounter();
                            observer.unobserve(counter);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            counters.forEach(counter => observer.observe(counter));
        },

        // Section animations
        setupSectionAnimations: function() {
            const sections = [
                { id: 'section2', headingSelector: '.featurette-heading', paragraphSelector: 'p' },
                { id: 'section3', headingSelector: '#recycling-heading', paragraphSelector: '#recycling-paragraph' }
            ];

            sections.forEach(sectionConfig => {
                const section = document.getElementById(sectionConfig.id);
                if (!section) return;

                const heading = section.querySelector(sectionConfig.headingSelector);
                const paragraph = section.querySelector(sectionConfig.paragraphSelector);
                if (!heading || !paragraph) return;

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            section.classList.add('visible');
                            heading.style.opacity = '1';
                            heading.style.transform = 'translateY(0)';
                            paragraph.style.opacity = '1';
                            paragraph.style.transform = 'translateY(0)';
                        }
                    });
                }, { threshold: 0.5 });

                observer.observe(section);
            });
        },

        // Card hover effects
        setupCardHoverEffects: function() {
            const cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                card.addEventListener("mouseenter", () => {
                    card.style.transform = "scale(1.05)";
                });
                card.addEventListener("mouseleave", () => {
                    card.style.transform = "scale(1)";
                });
            });
        },

        // Flags dropdown functionality
        setupFlagsDropdown: function() {
            const selectElement = document.getElementById("providerCountryCode");
            const dropdownBtn = document.getElementById("dropdownBtn");
            const dropdownContent = document.getElementById("dropdownContent");
            
            if (!selectElement || !dropdownBtn || !dropdownContent) return;

            selectElement.querySelectorAll("option").forEach(option => {
                const flagClass = `flag-${option.getAttribute("data-flag")}`;
                const optionDiv = document.createElement("div");
                optionDiv.className = flagClass;
                optionDiv.textContent = option.textContent;
                optionDiv.onclick = () => {
                    selectElement.value = option.value;
                    dropdownBtn.className = `dropdown-btn ${flagClass}`;
                    dropdownBtn.textContent = option.textContent;
                    dropdownContent.style.display = "none";
                };
                dropdownContent.appendChild(optionDiv);
            });

            dropdownBtn.onclick = (e) => {
                e.stopPropagation();
                dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
            };

            document.addEventListener('click', () => {
                dropdownContent.style.display = "none";
            });

            const firstOption = selectElement.querySelector("option");
            if (firstOption) {
                dropdownBtn.className = `dropdown-btn flag-${firstOption.getAttribute("data-flag")}`;
                dropdownBtn.textContent = firstOption.textContent;
            }
        },

        // Material checkboxes functionality
        setupMaterialCheckboxes: function() {
            const materialItems = document.querySelectorAll('.form-check.provider-material-item');
            materialItems.forEach(item => {
                const input = item.querySelector('input[type="checkbox"]');
                const amountInput = item.querySelector('.form-floating');

                if (input && amountInput) {
                    amountInput.style.display = 'none';
                    
                    input.addEventListener('change', () => {
                        amountInput.style.display = input.checked ? 'block' : 'none';
                    });
                }
            });
        },

        // Confirmation button functionality
        setupConfirmationButton: function() {
            const confirmBtn = document.querySelector('.provider-confirm-btn');
            if (!confirmBtn) return;

            confirmBtn.addEventListener('click', () => {
                const materialValues = {
                    wood: [
                        { range: [5, 10], points: 10, money: 5 },
                        { range: [11, 30], points: 20, money: 10 },
                        { range: [31, 50], points: 30, money: 20 }
                    ],
                    aluminum: [
                        { range: [5, 10], points: 15, money: 20 },
                        { range: [11, 30], points: 35, money: 15 },
                        { range: [31, 50], points: 150, money: 25 }
                    ],
                    carton: [
                        { range: [5, 10], points: 16, money: 2 },
                        { range: [11, 30], points: 40, money: 5 },
                        { range: [31, 50], points: 200, money: 7 }
                    ],
                    plastic: [
                        { range: [5, 10], points: 5, money: 2 },
                        { range: [11, 30], points: 10, money: 5 },
                        { range: [31, 50], points: 20, money: 7 }
                    ]
                };

                const materialNames = {
                    wood: 'الخشب',
                    aluminum: 'الألمنيوم',
                    carton: 'الكرتون',
                    plastic: 'البلاستيك'
                };

                let message = '';
                let totalAmount = 0;
                let totalMoney = 0;
                let totalPoints = 0;
                let hasError = false;

                const selectedMaterials = document.querySelectorAll('input[type="checkbox"]:checked');
                if (selectedMaterials.length === 0) {
                    alert("الرجاء اختيار مادة.");
                    return;
                }

                selectedMaterials.forEach(selectedMaterial => {
                    const materialId = selectedMaterial.id;
                    const amountInput = document.querySelector(`.${materialId}-amount`);
                    const amount = parseFloat(amountInput.value);

                    if (isNaN(amount) || amount < 5 || amount > 50) {
                        alert(`الرجاء إدخال كمية صحيحة بين 5 و 50 للمادة: ${materialId}`);
                        hasError = true;
                        return;
                    }

                    totalAmount += amount;

                    const materialConfig = materialValues[materialId];
                    if (!materialConfig) {
                        alert(`مادة غير معروفة: ${materialId}`);
                        hasError = true;
                        return;
                    }

                    const rangeConfig = materialConfig.find(config => 
                        amount >= config.range[0] && amount <= config.range[1]
                    );

                    if (rangeConfig) {
                        message += `${materialNames[materialId]}: تمت إضافة ${rangeConfig.points} نقاط لرصيد نقاطك , و سوف تحصل على ${rangeConfig.money} دنانير عند الاستلام.\n`;
                        totalMoney += rangeConfig.money;
                        totalPoints += rangeConfig.points;
                    }
                });

                if (!hasError) {
                    alert(`الكمية الإجمالية: ${totalAmount}\nالمبلغ الإجمالي: ${totalMoney} دنانير\nالنقاط الإجمالية: ${totalPoints}\n${message}`);
                    alert("تم تأكيد الطلب بنجاح!");
                }
            });
        },

        // Modal functionality
        setupModalFunctions: function() {
            window.openModal = function(title, description, priceCash, pricePoints, imageUrl) {
                const modalTitle = document.getElementById("modal-title");
                const modalDescription = document.getElementById("modal-description");
                const modalPrice = document.getElementById("modal-price");
                const modalImage = document.getElementById("modal-image");
                const modal = document.getElementById("modal");

                if (modal && modalTitle && modalDescription && modalPrice && modalImage) {
                    modalTitle.innerText = title;
                    modalDescription.innerText = description;
                    modalPrice.innerText = `السعر: ${priceCash} دينار / ${pricePoints} نقطة`;
                    modalImage.src = imageUrl;

                    modal.style.display = "flex";
                    modal.style.animation = "fadeIn 0.5s ease-in-out";
                }
            };

            window.closeModal = function() {
                const modal = document.getElementById("modal");
                if (modal) {
                    modal.style.animation = "fadeOut 0.5s ease-in-out";
                    setTimeout(() => {
                        modal.style.display = "none";
                    }, 500);
                }
            };

            window.purchase = function() {
                alert("تمت عملية الشراء بنجاح!");
                closeModal();
            };
        },

        // Optimized mobile navigation setup
        setupMobileNavigation: function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            const searchBox = document.querySelector('.search-box');
            const languageDropdown = document.querySelector('.language-dropdown');
            const navButtons = document.querySelector('.nav-buttons');
            const dropdowns = document.querySelectorAll('.dropdown');
            
            if (!menuToggle || !nav) return;

            // Create mobile menu container
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            
            // Store original positions of elements
            const originalStructure = {
                searchBox: { parent: searchBox?.parentNode, nextSibling: searchBox?.nextSibling },
                languageDropdown: { parent: languageDropdown?.parentNode, nextSibling: languageDropdown?.nextSibling },
                navLinks: { parent: navLinks?.parentNode, nextSibling: navLinks?.nextSibling },
                navButtons: { parent: navButtons?.parentNode, nextSibling: navButtons?.nextSibling }
            };
            
            // Function to check current view mode
            const isMobileView = () => window.innerWidth <= 768;

            // Function to setup mobile navigation
            const setupNavigation = (force = false) => {
                const mobile = isMobileView();
                
                // Move to mobile menu if in mobile view
                if (mobile) {
                    // Only reorganize if forced or if elements aren't in mobile menu
                    if (force || !mobileMenu.contains(searchBox)) {
                        // Clear mobile menu first
                        while (mobileMenu.firstChild) {
                            mobileMenu.removeChild(mobileMenu.firstChild);
                        }
                        
                        // Add elements to mobile menu
                        if (searchBox) mobileMenu.appendChild(searchBox);
                        if (languageDropdown) mobileMenu.appendChild(languageDropdown);
                        if (navLinks) mobileMenu.appendChild(navLinks);
                        if (navButtons) mobileMenu.appendChild(navButtons);
                        
                        // Add mobile menu to nav if not already present
                        if (!mobileMenu.parentNode) {
                            nav.appendChild(mobileMenu);
                        }
                    }
                } 
                // Restore to desktop layout if not in mobile view
                else {
                    // Only reorganize if forced or if mobile menu still exists
                    if (force || mobileMenu.parentNode) {
                        // Remove mobile menu from DOM
                        if (mobileMenu.parentNode) {
                            mobileMenu.remove();
                        }
                        
                        // Restore elements to original positions
                        const restoreElement = (element, original) => {
                            if (element && original.parent && !original.parent.contains(element)) {
                                if (original.nextSibling) {
                                    original.parent.insertBefore(element, original.nextSibling);
                                } else {
                                    original.parent.appendChild(element);
                                }
                            }
                        };
                        
                        restoreElement(searchBox, originalStructure.searchBox);
                        restoreElement(languageDropdown, originalStructure.languageDropdown);
                        restoreElement(navLinks, originalStructure.navLinks);
                        restoreElement(navButtons, originalStructure.navButtons);
                        
                        // Close any open dropdowns
                        dropdowns.forEach(dropdown => {
                            dropdown.classList.remove('active');
                        });
                        
                        // Reset menu toggle state
                        menuToggle.classList.remove('active');
                    }
                }
            };

            // Initial setup - force reorganization
            setupNavigation(true);

            // Toggle mobile menu
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                if (isMobileView()) {
                    mobileMenu.classList.toggle('active');
                    this.classList.toggle('active');
                }
            });
            
            // Handle dropdowns in mobile view
            dropdowns.forEach(dropdown => {
                const dropbtn = dropdown.querySelector('.dropbtn');
                
                if (dropbtn) {
                    dropbtn.addEventListener('click', function(e) {
                        if (isMobileView()) {
                            e.preventDefault();
                            e.stopPropagation();
                            dropdown.classList.toggle('active');
                            
                            // Close other dropdowns
                            dropdowns.forEach(other => {
                                if (other !== dropdown) {
                                    other.classList.remove('active');
                                }
                            });
                        }
                    });
                }
            });

            // Optimized resize handler
            let resizeTimer;
            window.addEventListener('resize', () => {
                // Immediate response when switching to desktop
                if (!isMobileView() && mobileMenu.parentNode) {
                    setupNavigation(true);
                }
                
                // Debounce for other cases
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    setupNavigation();
                }, 100);
            });

            // Close menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!nav.contains(event.target)) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        },

        // Statistics boxes height equalization
        setupStatisticsBoxes: function() {
            const boxes = document.querySelectorAll('.single-ststistics-box');
            let maxHeight = 0;
            
            // Reset heights first
            boxes.forEach(box => {
                box.style.height = 'auto';
            });
            
            // Find max height
            boxes.forEach(box => {
                maxHeight = Math.max(maxHeight, box.offsetHeight);
            });
            
            // Apply max height to all
            boxes.forEach(box => {
                box.style.height = maxHeight + 'px';
            });
        },

        // Section 3 observer
        setupSection3Observer: function() {
            const section3 = document.getElementById('section3');
            if (!section3) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(section3);
        }
    };

    // Initialize the application
    app.init();
});