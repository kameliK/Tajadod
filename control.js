document.addEventListener("DOMContentLoaded", function() {
    // Hover effect for first image
    const hoverImg = document.getElementById('hover-img');
    if (hoverImg) {
        hoverImg.addEventListener('mouseover', function() {
            this.src = './img/2 (2).jpg';
        });
        hoverImg.addEventListener('mouseout', function() {
            this.src = './img/1.jpg';
        });
    }

    // Hover effect for third image
    const hoverImg3 = document.getElementById('hover-img-3');
    if (hoverImg3) {
        hoverImg3.addEventListener('mouseover', function() {
            this.src = './img/flat-lay-arrangement-zero-waste-lettering-with-copy-space.jpg';
        });
        hoverImg3.addEventListener('mouseout', function() {
            this.src = './img/jordan-map-design-with-flag-light-background-vector_1142-3683.jpg';
        });
    }

    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('change', function() {
            var labelEn = document.getElementById('slider-label-en');
            var labelAr = document.getElementById('slider-label-ar');
            if (labelEn && labelAr) {
                if (this.checked) {
                    labelEn.style.opacity = '0';
                    labelAr.style.opacity = '1';
                } else {
                    labelEn.style.opacity = '1';
                    labelAr.style.opacity = '0';
                }
            }
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
            }
        });
    }

    // Language dropdown functionality
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            console.log(`Language changed to: ${selectedLanguage}`);
            // Add logic to handle language change if needed
        });
    }

    // Counter functionality
    const counters = document.querySelectorAll(".counter");
    if (counters.length > 0) {
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
    }

    // IntersectionObserver for #section2
    const section2 = document.getElementById('section2');
    if (section2) {
        const heading = section2.querySelector('.featurette-heading');
        const paragraph = section2.querySelector('p');
        if (heading && paragraph) {
            const options = {
                root: null,
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        section2.classList.add('visible');
                        heading.style.opacity = '1';
                        heading.style.transform = 'translateY(0)';
                        paragraph.style.opacity = '1';
                        paragraph.style.transform = 'translateY(0)';
                    }
                });
            }, options);

            observer.observe(section2);
        }
    }

    // IntersectionObserver for #section3
    const section3 = document.getElementById('section3');
    if (section3) {
        const heading = section3.querySelector('#recycling-heading');
        const paragraph = section3.querySelector('#recycling-paragraph');
        if (heading && paragraph) {
            const options = {
                root: null,
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        section3.classList.add('visible');
                        heading.style.opacity = '1';
                        heading.style.transform = 'translateY(0)';
                        paragraph.style.opacity = '1';
                        paragraph.style.transform = 'translateY(0)';
                    }
                });
            }, options);

            observer.observe(section3);
        }
    }

    // Card hover effect
    const cards = document.querySelectorAll(".card");
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = "scale(1.05)";
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "scale(1)";
            });
        });
    }

    // Flags code
    const selectElement = document.getElementById("providerCountryCode");
    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownContent = document.getElementById("dropdownContent");
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
    dropdownBtn.onclick = () => {
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    };
    window.onclick = (event) => {
        if (!event.target.matches('.dropdown-btn')) {
            dropdownContent.style.display = "none";
        }
    };
    const firstOption = selectElement.querySelector("option");
    dropdownBtn.className = `dropdown-btn flag-${firstOption.getAttribute("data-flag")}`;
    dropdownBtn.textContent = firstOption.textContent;

    // Show dropdown content for material items
    const materialItems = document.querySelectorAll('.form-check.provider-material-item');
    materialItems.forEach(item => {
        const input = item.querySelector('input[type="checkbox"]');
        const amountInput = item.querySelector('.form-floating');

        if (input && amountInput) {
            input.addEventListener('click', () => {
                // Toggle visibility of the amount input
                if (input.checked) {
                    amountInput.style.display = 'block';
                } else {
                    amountInput.style.display = 'none';
                }
            });

            // Initially hide the amount input
            amountInput.style.display = 'none';
        }
    });

    // Button code
    document.querySelector('.provider-confirm-btn').addEventListener('click', function() {
        let message = '';
        let totalAmount = 0;
        let totalMoney = 0;
        let totalPoints = 0;

        const selectedMaterials = document.querySelectorAll('input[type="checkbox"]:checked');
        if (selectedMaterials.length === 0) {
            alert("الرجاء اختيار مادة.");
            return;
        }

        for (const selectedMaterial of selectedMaterials) {
            const materialId = selectedMaterial.id;
            const amountInput = document.querySelector(`.${materialId}-amount`);
            const amount = parseFloat(amountInput.value);

            if (isNaN(amount) || amount < 5 || amount > 50) {
                alert(`الرجاء إدخال كمية صحيحة بين 5 و 50 للمادة: ${materialId}`);
                return; // Exit immediately if any input is invalid
            }

            totalAmount += amount;

            switch (materialId) {
                case 'wood':
                    if (amount >= 5 && amount <= 10) {
                        message += `الخشب: تمت إضافة 10 نقاط لرصيد نقاطك , و سوف تحصل على 5 دنانير عند الاستلام.\n`;
                        totalMoney += 5;
                        totalPoints += 10;
                    } else if (amount > 10 && amount <= 30) {
                        message += `الخشب: تمت إضافة 20 نقاط لرصيد نقاطك , و سوف تحصل على 10 دنانير عند الاستلام.\n`;
                        totalMoney += 10;
                        totalPoints += 20;
                    } else if (amount > 30 && amount <= 50) {
                        message += `الخشب: تمت إضافة 30 نقاط لرصيد نقاطك , و سوف تحصل على 20 دنانير عند الاستلام.\n`;
                        totalMoney += 20;
                        totalPoints += 30;
                    }
                    break;

                case 'aluminum':
                    if (amount >= 5 && amount <= 10) {
                        message += `الألمنيوم: تمت إضافة 20 نقاط لرصيد نقاطك , و سوف تحصل على 20 دنانير عند الاستلام.\n`;
                        totalMoney += 20;
                        totalPoints += 20;
                    } else if (amount > 10 && amount <= 30) {
                        message += `الألمنيوم: تمت إضافة 30 نقاط لرصيد نقاطك , و سوف تحصل على 15 دنانير عند الاستلام.\n`;
                        totalMoney += 15;
                        totalPoints += 30;
                    } else if (amount > 30 && amount <= 50) {
                        message += `الألمنيوم: تمت إضافة 50 نقاط لرصيد نقاطك , و سوف تحصل على 25 دنانير عند الاستلام.\n`;
                        totalMoney += 25;
                        totalPoints += 50;
                    }
                    break;

                case 'carton':
                    if (amount >= 5 && amount <= 10) {
                        message += `الكرتون: تمت إضافة 5 نقاط لرصيد نقاطك , و سوف تحصل على 2 دنانير عند الاستلام.\n`;
                        totalMoney += 2;
                        totalPoints += 5;
                    } else if (amount > 10 && amount <= 30) {
                        message += `الكرتون: تمت إضافة 10 نقاط لرصيد نقاطك , و سوف تحصل على 5 دنانير عند الاستلام.\n`;
                        totalMoney += 5;
                        totalPoints += 10;
                    } else if (amount > 30 && amount <= 50) {
                        message += `الكرتون: تمت إضافة 20 نقاط لرصيد نقاطك , و سوف تحصل على 7 دنانير عند الاستلام.\n`;
                        totalMoney += 7;
                        totalPoints += 20;
                    }
                    break;

                case 'plastic':
                    if (amount >= 5 && amount <= 10) {
                        message += `البلاستيك: تمت إضافة 5 نقاط لرصيد نقاطك , و سوف تحصل على 2 دنانير عند الاستلام.\n`;
                        totalMoney += 2;
                        totalPoints += 5;
                    } else if (amount > 10 && amount <= 30) {
                        message += `البلاستيك: تمت إضافة 10 نقاط لرصيد نقاطك , و سوف تحصل على 5 دنانير عند الاستلام.\n`;
                        totalMoney += 5;
                        totalPoints += 10;
                    } else if (amount > 30 && amount <= 50) {
                        message += `البلاستيك: تمت إضافة 20 نقاط لرصيد نقاطك , و سوف تحصل على 7 دنانير عند الاستلام.\n`;
                        totalMoney += 7;
                        totalPoints += 20;
                    }
                    break;

                default:
                    alert(`مادة غير معروفة: ${materialId}`);
                    return;
            }
        }

        // Display the success message only if all inputs are valid
        alert(`الكمية الإجمالية: ${totalAmount}\nالمبلغ الإجمالي: ${totalMoney} دنانير\nالنقاط الإجمالية: ${totalPoints}\n${message}`);
        alert("تم تأكيد الطلب بنجاح!");
    });
});

function openModal(title, description, priceCash, pricePoints, imageUrl) {
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const modalImage = document.getElementById("modal-image");
    const modal = document.getElementById("modal");

    if (modalTitle && modalDescription && modalPrice && modalImage && modal) {
        modalTitle.innerText = title;
        modalDescription.innerText = description;
        modalPrice.innerText = `السعر: ${priceCash} ريال / ${pricePoints} نقطة`;
        modalImage.src = imageUrl;

        modal.style.display = "flex";
        modal.style.animation = "fadeIn 0.5s ease-in-out";
    }
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.animation = "fadeOut 0.5s ease-in-out";
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    }
}

function purchase() {
    alert("تمت عملية الشراء بنجاح!");
    closeModal();
}
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const searchBox = document.querySelector('.search-box');
    const languageDropdown = document.querySelector('.language-dropdown');
    const navButtons = document.querySelector('.nav-buttons');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Store original positions of elements
    const originalStructure = {
        searchBox: { parent: searchBox.parentNode, nextSibling: searchBox.nextSibling },
        languageDropdown: { parent: languageDropdown.parentNode, nextSibling: languageDropdown.nextSibling },
        navLinks: { parent: navLinks.parentNode, nextSibling: navLinks.nextSibling },
        navButtons: { parent: navButtons.parentNode, nextSibling: navButtons.nextSibling }
    };
    
    let isMobileView = window.innerWidth <= 768;
    
    // Initialize based on screen size
    function setupNavigation() {
        const currentIsMobile = window.innerWidth <= 768;
        
        // Only make changes if viewport state has changed
        if (currentIsMobile !== isMobileView) {
            isMobileView = currentIsMobile;
            
            if (isMobileView) {
                // Move elements to mobile menu for mobile view
                mobileMenu.appendChild(searchBox);
                mobileMenu.appendChild(languageDropdown);
                mobileMenu.appendChild(navLinks);
                mobileMenu.appendChild(navButtons);
                nav.appendChild(mobileMenu);
            } else {
                // Restore original structure for desktop view
                if (mobileMenu.parentNode) {
                    mobileMenu.remove();
                }
                
                // Restore elements to their original positions
                if (originalStructure.searchBox.nextSibling) {
                    originalStructure.searchBox.parent.insertBefore(searchBox, originalStructure.searchBox.nextSibling);
                } else {
                    originalStructure.searchBox.parent.appendChild(searchBox);
                }
                
                if (originalStructure.languageDropdown.nextSibling) {
                    originalStructure.languageDropdown.parent.insertBefore(languageDropdown, originalStructure.languageDropdown.nextSibling);
                } else {
                    originalStructure.languageDropdown.parent.appendChild(languageDropdown);
                }
                
                if (originalStructure.navLinks.nextSibling) {
                    originalStructure.navLinks.parent.insertBefore(navLinks, originalStructure.navLinks.nextSibling);
                } else {
                    originalStructure.navLinks.parent.appendChild(navLinks);
                }
                
                if (originalStructure.navButtons.nextSibling) {
                    originalStructure.navButtons.parent.insertBefore(navButtons, originalStructure.navButtons.nextSibling);
                } else {
                    originalStructure.navButtons.parent.appendChild(navButtons);
                }
                
                // Close any open dropdowns when returning to desktop
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    }
    
    // Initial setup
    setupNavigation();
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Toggle menu icon animation
        this.classList.toggle('active');
    });
    
    // Toggle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        dropbtn.addEventListener('click', function(e) {
            if (isMobileView) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns when opening one
                if (dropdown.classList.contains('active')) {
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            }
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            setupNavigation();
        }, 250);
    });
});






