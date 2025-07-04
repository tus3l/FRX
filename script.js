document.addEventListener('DOMContentLoaded', () => {
    const analyzeButton = document.getElementById('analyzeButton');
    const actionSection = document.querySelector('.action-section');
    const loaderPlaceholder = document.querySelector('.loader-placeholder');
    const loaderStatusMessage = document.querySelector('.loader-status-message');
    const resultsDisplay = document.querySelector('.results-display');
    const resultsTitle = resultsDisplay.querySelector('h2');
    const fpsTableRows = resultsDisplay.querySelectorAll('.fps-table tbody tr');
    const mouseGlow = document.getElementById('mouse-glow-follower');
    const body = document.body;
    const mainTitle = document.getElementById('main-title');
    const subtitleText = document.getElementById('subtitle-text');

    // --- CPU Selection Elements ---
    const cpuBrandSelect = document.getElementById('cpu-brand');
    const cpuSeriesGroup = document.querySelector('label[for="cpu-series"]').closest('.input-group');
    const cpuSeriesSelect = document.getElementById('cpu-series');
    const cpuGenGroup = document.querySelector('label[for="cpu-gen"]').closest('.input-group');
    const cpuGenSelect = document.getElementById('cpu-gen');
    const cpuSuffixGroup = document.querySelector('label[for="cpu-suffix"]').closest('.input-group');
    const cpuSuffixSelect = document.getElementById('cpu-suffix');

    // --- GPU Selection Elements ---
    const gpuBrandGroup = document.querySelector('label[for="gpu-brand"]').closest('.input-group');
    const gpuBrandSelect = document.getElementById('gpu-brand');
    const gpuSeriesGroup = document.querySelector('label[for="gpu-series"]').closest('.input-group');
    const gpuSeriesSelect = document.getElementById('gpu-series');
    const gpuModelSeriesGroup = document.querySelector('label[for="gpu-model-series"]').closest('.input-group');
    const gpuModelSeriesSelect = document.getElementById('gpu-model-series');
    const gpuModelGroup = document.querySelector('label[for="gpu-model"]').closest('.input-group');
    const gpuModelSelect = document.getElementById('gpu-model');

    // --- RAM Selection Elements ---
    const ramSizeGroup = document.querySelector('label[for="ram-size"]').closest('.input-group');
    const ramSizeSelect = document.getElementById('ram-size');
    const ramTypeGroup = document.querySelector('label[for="ram-type"]').closest('.input-group');
    const ramTypeSelect = document.getElementById('ram-type');

    // --- Motherboard Selection Elements ---
    const moboBrandGroup = document.querySelector('label[for="mobo-brand"]').closest('.input-group');
    const moboBrandSelect = document.getElementById('mobo-brand');
    const moboModelGroup = document.querySelector('label[for="mobo-model"]').closest('.input-group');
    const moboModelSelect = document.getElementById('mobo-model');


    // --- Data for all Dropdowns (Hardcoded for simulation) ---
    const cpuData = {
        "Intel": {
            "Core i3": ["10th Gen", "11th Gen", "12th Gen", "13th Gen"],
            "Core i5": ["10th Gen", "11th Gen", "12th Gen", "13th Gen", "14th Gen"],
            "Core i7": ["10th Gen", "11th Gen", "12th Gen", "13th Gen", "14th Gen"],
            "Core i9": ["10th Gen", "11th Gen", "12th Gen", "13th Gen", "14th Gen"],
            "Core Ultra 9": ["1st Gen"]
        },
        "AMD Ryzen": {
            "Ryzen 3": ["3000 Series", "4000 Series", "5000 Series"],
            "Ryzen 5": ["3000 Series", "4000 Series", "5000 Series", "7000 Series"],
            "Ryzen 7": ["3000 Series", "5000 Series", "7000 Series", "8000 Series"],
            "Ryzen 9": ["3000 Series", "5000 Series", "7000 Series", "8000 Series"]
        }
    };
    const cpuSuffixes = ["None", "K", "KF", "F"];

    const gpuData = {
        "NVIDIA": {
            "RTX": {
                "50 Series": ["RTX 5090", "RTX 5080 Ti", "RTX 5080", "RTX 5070 Ti", "RTX 5070", "RTX 5060 Ti", "RTX 5060"], 
                "40 Series": ["RTX 4090", "RTX 4080 Super", "RTX 4080", "RTX 4070 Ti Super", "RTX 4070 Super", "RTX 4070 Ti", "RTX 4070", "RTX 4060 Ti", "RTX 4060"],
                "30 Series": ["RTX 3090 Ti", "RTX 3090", "RTX 3080 Ti", "RTX 3080", "RTX 3070 Ti", "RTX 3070", "RTX 3060 Ti", "RTX 3060"],
                "20 Series": ["RTX 2080 Ti", "RTX 2080 Super", "RTX 2080", "RTX 2070 Super", "RTX 2070", "RTX 2060 Super", "RTX 2060"]
            },
            "GTX": {
                "16 Series": ["GTX 1660 Super", "GTX 1660 Ti", "GTX 1660", "GTX 1650 Super", "GTX 1650"],
                "10 Series": ["GTX 1080 Ti", "GTX 1080", "GTX 1070 Ti", "GTX 1070", "GTX 1060 (6GB)", "GTX 1060 (3GB)", "GTX 1050 Ti", "GTX 1050"]
            }
        },
        "AMD Radeon": {
            "RX 7000 Series": ["RX 7900 XTX", "RX 7900 XT", "RX 7800 XT", "RX 7700 XT", "RX 7600"],
            "RX 6000 Series": ["RX 6900 XT", "RX 6800 XT", "RX 6800", "RX 6750 XT", "RX 6700 XT", "RX 6650 XT", "RX 6600 XT", "RX 6600"],
            "RX 5000 Series": ["RX 5700 XT", "RX 5700", "RX 5600 XT", "RX 5500 XT", "RX 5500"],
            "RX Vega Series": ["RX Vega 64", "RX Vega 56"]
        }
    };
    const ramData = {
        "2": ["DDR3"], "4": ["DDR3", "DDR4"], "6": ["DDR3", "DDR4"], "8": ["DDR3", "DDR4", "DDR5"],
        "10": ["DDR3", "DDR4", "DDR5"], "12": ["DDR3", "DDR4", "DDR5"], "16": ["DDR3", "DDR4", "DDR5"],
        "18": ["DDR4", "DDR5"], "20": ["DDR3", "DDR4", "DDR5"], "24": ["DDR4", "DDR5"], // Added DDR3 to 20/24 for more flexibility
        "26": ["DDR4", "DDR5"], "28": ["DDR4", "DDR5"], "30": ["DDR4", "DDR5"],
        "32": ["DDR4", "DDR5"], "64": ["DDR4", "DDR5"], "128": ["DDR5"]
    };
    const motherboardData = {
        "ASUS": [
            "ROG Maximus Z790 Hero", "ROG Strix Z790-E Gaming WiFi II", "TUF Gaming Z790-PLUS WiFi", "Prime Z790-A WiFi",
            "ROG Crosshair X670E Hero", "TUF Gaming B650-PLUS WIFI", "Prime B650M-A WIFI II", "ROG Strix B550-F Gaming WiFi II"
        ],
        "MSI": [
            "MEG Z790 ACE", "MPG Z790 Carbon WiFi", "MAG Z790 Tomahawk WiFi", "PRO Z790-A WiFi",
            "MPG X670E Carbon WiFi", "MAG B650 Tomahawk WiFi", "PRO B650M-A WIFI", "B550 GAMING PLUS"
        ],
        "Gigabyte": [
            "Z790 AORUS Master", "Z790 AORUS Elite AX", "Z790 UD AC", "B760 AORUS Elite AX",
            "X670E AORUS Master", "B650 AORUS Elite AX", "A620M S2H", "B550 AORUS Elite V2"
        ],
        "ASRock": [
            "Z790 Taichi Lite", "Z790 Pro RS WiFi", "B760M Steel Legend WiFi",
            "X670E Taichi", "B650E Steel Legend WiFi", "A620M Pro RS WiFi"
        ],
        "NZXT": [
            "N7 Z790", "N5 Z690", "N7 B650E"
        ]
    };

    // --- NEW: Performance Scoring Data (Simulated Procedural Calculation) ---
    // This defines base scores for each component model/tier.
    const componentScores = {
        // GPU Base Scores (Higher is better)
        "GPUs": {
            "RTX 5090": 1000, "RTX 5080 Ti": 950, "RTX 5080": 900, "RTX 5070 Ti": 850, "RTX 5070": 800, "RTX 5060 Ti": 750, "RTX 5060": 700,
            "RTX 4090": 900, "RTX 4080 Super": 820, "RTX 4080": 800, "RTX 4070 Ti Super": 750, "RTX 4070 Super": 700, "RTX 4070 Ti": 680, "RTX 4070": 650, "RTX 4060 Ti": 500, "RTX 4060": 450,
            "RTX 3090 Ti": 700, "RTX 3090": 680, "RTX 3080 Ti": 650, "RTX 3080": 600, "RTX 3070 Ti": 550, "RTX 3070": 500, "RTX 3060 Ti": 400, "RTX 3060": 350,
            "RTX 2080 Ti": 450, "RTX 2080 Super": 400, "RTX 2080": 380, "RTX 2070 Super": 350, "RTX 2070": 320, "RTX 2060 Super": 280, "RTX 2060": 250,
            "GTX 1660 Super": 150, "GTX 1660 Ti": 140, "GTX 1660": 130, "GTX 1650 Super": 100, "GTX 1650": 90,
            "GTX 1080 Ti": 200, "GTX 1080": 180, "GTX 1070 Ti": 160, "GTX 1070": 140, "GTX 1060 (6GB)": 100, "GTX 1060 (3GB)": 80, "GTX 1050 Ti": 60, "GTX 1050": 50,
            "RX 7900 XTX": 880, "RX 7900 XT": 800, "RX 7800 XT": 700, "RX 7700 XT": 600, "RX 7600": 480,
            "RX 6900 XT": 650, "RX 6800 XT": 600, "RX 6800": 550, "RX 6750 XT": 520, "RX 6700 XT": 500, "RX 6650 XT": 420, "RX 6600 XT": 400, "RX 6600": 380,
            "RX 5700 XT": 300, "RX 5700": 280, "RX 5600 XT": 220, "RX 5500 XT": 120, "RX 5500": 100,
            "RX Vega 64": 180, "RX Vega 56": 160
        },
        // CPU Tier Multipliers
        "CPUs": {
            "High-End CPU": 1.0, // Base multiplier for high-end CPU
            "Mid-Range CPU": 0.90, // Mid-range CPUs might reduce overall score by 10%
            "Budget CPU": 0.70,   // Budget CPUs might reduce overall score by 30%
            "Unknown CPU": 0.95   // Fallback multiplier
        },
        // RAM Tier Multipliers
        "RAMs": {
            "High-End DDR5": 1.08, // 32GB+ DDR5
            "Standard DDR5": 1.05, // 16GB-30GB DDR5
            "Low-End DDR5": 1.02,  // <16GB DDR5
            "High-Capacity DDR4": 0.98, // 32GB+ DDR4
            "Standard DDR4": 0.95, // 16GB-30GB DDR4
            "Low-End DDR4": 0.90,  // <16GB DDR4
            "Legacy DDR3": 0.80,   // DDR3
            "Unknown RAM": 1.00    // Fallback
        }
    };

    // Game Difficulty Multipliers (Higher factor means lower final FPS from raw score)
    // Adjusted these multipliers slightly to get more varied and higher FPS results with base scores
    const gameDifficultyFactors = {
        "Cyberpunk 2077": { "1080p": 0.30, "2K": 0.20, "4K": 0.10 }, // Adjusted
        "Red Dead Redemption 2": { "1080p": 0.35, "2K": 0.25, "4K": 0.15 }, // Adjusted
        "GTA V": { "1080p": 0.45, "2K": 0.35, "4K": 0.25 }, // Adjusted
        "Fortnite": { "1080p": 0.50, "2K": 0.40, "4K": 0.30 } // Adjusted
        // Add more games here
    };

    // Define FPS output tiers based on calculated raw score range
    const fpsOutputTiers = [
        { score: 800, rating: "Ultimate", fps: { "1080p": "250-350+", "2K": "180-250+", "4K": "110-150+" } },
        { score: 600, rating: "Elite", "fps": { "1080p": "180-250", "2K": "130-180", "4K": "75-100" } },
        { score: 400, rating: "Excellent", "fps": { "1080p": "140-180", "2K": "90-130", "4K": "50-70" } },
        { score: 250, rating: "Very Good", "fps": { "1080p": "100-140", "2K": "60-90", "4K": "35-50" } },
        { score: 150, rating: "Good", "fps": { "1080p": "70-100", "2K": "40-60", "4K": "25-35" } },
        { score: 80, rating: "Playable", "fps": { "1080p": "45-70", "2K": "25-40", "4K": "---" } },
        { score: 30, rating: "Basic", "fps": { "1080p": "30-45", "2K": "---", "4K": "---" } },
        { score: 0, rating: "Entry", "fps": { "1080p": "15-30", "2K": "---", "4K": "---" } }
    ];


    // --- Mouse Glow Variables and Animation Loop ---
    let mouseX = 0;
    let mouseY = 0;
    let mouseGlowX = 0;
    let mouseGlowY = 0;
    const glowSpeed = 0.15;

    function updateMouseGlow() {
        mouseGlowX += (mouseX - mouseGlowX) * glowSpeed;
        mouseGlowY += (mouseY - mouseGlowY) * glowSpeed;
        mouseGlow.style.left = `${mouseGlowX}px`;
        mouseGlow.style.top = `${mouseGlowY}px`;
        requestAnimationFrame(updateMouseGlow);
    }

    // --- Helper function to populate a select element ---
    const populateSelect = (selectElement, optionsArray, defaultOptionText) => {
        selectElement.innerHTML = `<option value="">${defaultOptionText}</option>`; // Always add default option
        optionsArray.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionValue;
            selectElement.appendChild(option);
        });
    };

    // --- Helper function to clear and hide a specific dropdown group ---
    const resetAndHideDropdown = (groupElement, selectElement, defaultOptionText) => {
        // Ensure groupElement and selectElement exist before trying to modify
        if (groupElement && selectElement) {
            populateSelect(selectElement, [], defaultOptionText); // Clear by populating with empty array
            groupElement.classList.add('hidden');
        }
    };

    // --- Chain of all dropdown groups for reset/visibility control ---
    const allDropdownGroups = [
        cpuSeriesGroup, cpuGenGroup, cpuSuffixGroup,
        gpuBrandGroup, gpuSeriesGroup, gpuModelSeriesGroup,
        gpuModelGroup,
        ramSizeGroup, ramTypeGroup,
        moboBrandGroup, moboModelGroup
    ];


    // --- Initial Setup ---
    loaderPlaceholder.style.display = 'none';
    resultsDisplay.style.display = 'none';
    loaderStatusMessage.style.display = 'none';

    // Hide all dependent dropdowns initially using the helper
    allDropdownGroups.forEach(group => {
        if (group) { // Ensure group exists
            const selectEl = group.querySelector('select');
            const defaultText = selectEl ? selectEl.options[0].textContent : '';
            resetAndHideDropdown(group, selectEl, defaultText);
        }
    });


    // --- Typing Animation Helper Function ---
    const typeText = (element, textContent, duration, blinkDuration) => {
        return new Promise(resolve => {
            element.textContent = textContent;
            element.style.width = '0';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.borderRight = `.15em solid var(--neon-blue)`;

            element.style.animation = 'none';
            void element.offsetWidth; // Trigger reflow

            element.classList.add('typing-active');
            
            element.style.animation = `typing ${duration}s steps(${textContent.length}, end) forwards, blink-caret ${blinkDuration}s step-end infinite`;
            
            element.addEventListener('animationend', function handler(event) {
                if (event.animationName === 'typing') {
                    element.style.borderRight = 'none';
                    element.classList.remove('typing-active');
                    element.removeEventListener('animationend', handler);
                    resolve();
                }
            }, { once: true });
        });
    };

    // --- Header Title and Subtitle Animations Sequence ---
    typeText(mainTitle, "FrameRateX_", 2.5, 0.75).then(() => {
        mainTitle.classList.add('header-scanline-active');
        mainTitle.addEventListener('animationend', function handler(event) {
            if (event.animationName === 'header-scanline-move') {
                this.classList.remove('header-scanline-active');
                this.removeEventListener('animationend', handler);
            }
        }, { once: true });
    });

    setTimeout(() => {
        typeText(subtitleText, "Your future in gaming performance starts here.", 2.5, 0.75);
    }, 2500);

    // --- FPS Number Animation Function (Adapted for ranges like "100+") ---
    const animateFpsNumber = (element, predictedFpsValue) => {
        // Clear any previous color classes before applying new ones
        element.classList.remove('high-fps', 'mid-fps', 'low-fps', 'unavailable-fps');

        // If it's a range or "---" or "N/A", just set the text directly
        if (isNaN(parseInt(predictedFpsValue)) || String(predictedFpsValue).includes('+') || String(predictedFpsValue).includes('-') || predictedFpsValue === "N/A" || predictedFpsValue === "---") {
            element.textContent = predictedFpsValue;
            // Apply appropriate color class based on content
            if (String(predictedFpsValue).includes('+') || predictedFpsValue.includes('Elite') || predictedFpsValue.includes('Excellent') || predictedFpsValue.includes('Overkill') || predictedFpsValue.includes('Ideal') || predictedFpsValue.includes('Ultimate')) {
                element.classList.add('high-fps');
            } else if (String(predictedFpsValue).includes('-') || predictedFpsValue.includes('Good') || predictedFpsValue.includes('Very Good') || predictedFpsValue.includes('Playable')) {
                 element.classList.add('mid-fps');
            } else if (predictedFpsValue.includes('Basic') || predictedFpsValue.includes('Entry')) {
                element.classList.add('low-fps');
            } else { // Unknown or N/A
                element.classList.add('unavailable-fps');
            }
            return;
        }
        // Original animation for pure numbers
        const targetFps = parseInt(predictedFpsValue);
        let currentFps = 0;
        const duration = 800;
        const step = targetFps / (duration / 10);

        const timer = setInterval(() => {
            currentFps += step;
            if (currentFps >= targetFps) {
                currentFps = targetFps;
                clearInterval(timer);
                element.classList.add('fps-pop-glow');
                element.addEventListener('animationend', () => {
                    element.classList.remove('fps-pop-glow');
                }, { once: true });
            }
            element.textContent = Math.floor(currentFps);
        }, 10);
        // Apply color based on numerical value (simplified for demonstration)
        if (numericTarget >= 90) {
            element.classList.add('high-fps');
        } else if (numericTarget >= 60) {
            element.classList.add('mid-fps');
        } else {
            element.classList.add('low-fps');
        }
    };

    // --- Populate Dropdowns Logic ---

    // Populate CPU Brand
    populateSelect(cpuBrandSelect, Object.keys(cpuData), "Select CPU Brand");

    // Event listener for CPU Brand selection
    cpuBrandSelect.addEventListener('change', () => {
        const selectedBrand = cpuBrandSelect.value;
        // Clear and hide all subsequent dropdowns
        resetAndHideDropdown(cpuSeriesGroup, cpuSeriesSelect, "Select CPU Series");
        resetAndHideDropdown(cpuGenGroup, cpuGenSelect, "Select CPU Generation");
        resetAndHideDropdown(cpuSuffixGroup, cpuSuffixSelect, "Select CPU Suffix");
        resetAndHideDropdown(gpuBrandGroup, gpuBrandSelect, "Select GPU Brand");
        resetAndHideDropdown(gpuSeriesGroup, gpuSeriesSelect, "Select GPU Series");
        resetAndHideDropdown(gpuModelSeriesGroup, gpuModelSeriesSelect, "Select GPU Model Series");
        resetAndHideDropdown(gpuModelGroup, gpuModelSelect, "Select GPU Model");
        resetAndHideDropdown(ramSizeGroup, ramSizeSelect, "Select RAM Size");
        resetAndHideDropdown(ramTypeGroup, ramTypeSelect, "Select RAM Type");
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");
        
        if (selectedBrand) {
            populateSelect(cpuSeriesSelect, Object.keys(cpuData[selectedBrand]), "Select CPU Series");
            cpuSeriesGroup.classList.remove('hidden');
        }
    });

    // Event listener for CPU Series selection
    cpuSeriesSelect.addEventListener('change', () => {
        const selectedBrand = cpuBrandSelect.value;
        const selectedSeries = cpuSeriesSelect.value;
        resetAndHideDropdown(cpuGenGroup, cpuGenSelect, "Select CPU Generation");
        resetAndHideDropdown(cpuSuffixGroup, cpuSuffixSelect, "Select CPU Suffix");
        resetAndHideDropdown(gpuBrandGroup, gpuBrandSelect, "Select GPU Brand");
        resetAndHideDropdown(gpuSeriesGroup, gpuSeriesSelect, "Select GPU Series");
        resetAndHideDropdown(gpuModelSeriesGroup, gpuModelSeriesSelect, "Select GPU Model Series");
        resetAndHideDropdown(gpuModelGroup, gpuModelSelect, "Select GPU Model");
        resetAndHideDropdown(ramSizeGroup, ramSizeSelect, "Select RAM Size");
        resetAndHideDropdown(ramTypeGroup, ramTypeSelect, "Select RAM Type");
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedBrand && selectedSeries) {
            populateSelect(cpuGenSelect, cpuData[selectedBrand][selectedSeries], "Select CPU Generation");
            cpuGenGroup.classList.remove('hidden');
        }
    });

    // Event listener for CPU Generation selection
    cpuGenSelect.addEventListener('change', () => {
        const selectedGen = cpuGenSelect.value;
        resetAndHideDropdown(cpuSuffixGroup, cpuSuffixSelect, "Select CPU Suffix");
        resetAndHideDropdown(gpuBrandGroup, gpuBrandSelect, "Select GPU Brand");
        resetAndHideDropdown(gpuSeriesGroup, gpuSeriesSelect, "Select GPU Series");
        resetAndHideDropdown(gpuModelSeriesGroup, gpuModelSeriesSelect, "Select GPU Model Series");
        resetAndHideDropdown(gpuModelGroup, gpuModelSelect, "Select GPU Model");
        resetAndHideDropdown(ramSizeGroup, ramSizeSelect, "Select RAM Size");
        resetAndHideDropdown(ramTypeGroup, ramTypeSelect, "Select RAM Type");
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedGen) {
            populateSelect(cpuSuffixSelect, cpuSuffixes, "Select CPU Suffix");
            cpuSuffixGroup.classList.remove('hidden');
        }
    });

    // Event listener for CPU Suffix selection (THIS IS WHERE GPU BRAND APPEARS)
    cpuSuffixSelect.addEventListener('change', () => {
        const selectedSuffix = cpuSuffixSelect.value;
        resetAndHideDropdown(gpuBrandGroup, gpuBrandSelect, "Select GPU Brand");
        resetAndHideDropdown(gpuSeriesGroup, gpuSeriesSelect, "Select GPU Series");
        resetAndHideDropdown(gpuModelSeriesGroup, gpuModelSeriesSelect, "Select GPU Model Series");
        resetAndHideDropdown(gpuModelGroup, gpuModelSelect, "Select GPU Model");
        resetAndHideDropdown(ramSizeGroup, ramSizeSelect, "Select RAM Size");
        resetAndHideDropdown(ramTypeGroup, ramTypeSelect, "Select RAM Type");
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedSuffix) {
            populateSelect(gpuBrandSelect, Object.keys(gpuData), "Select GPU Brand");
            gpuBrandGroup.classList.remove('hidden');
        }
    });

    // Event listener for GPU Brand selection
    gpuBrandSelect.addEventListener('change', () => {
        const selectedBrand = gpuBrandSelect.value;
        resetAndHideDropdown(gpuSeriesGroup, gpuSeriesSelect, "Select GPU Series");
        resetAndHideDropdown(gpuModelSeriesGroup, gpuModelSeriesSelect, "Select GPU Model Series");
        resetAndHideDropdown(gpuModelGroup, gpuModelSelect, "Select GPU Model");
        resetAndHideDropdown(ramSizeGroup, ramSizeSelect, "Select RAM Size");
        resetAndHideDropdown(ramTypeGroup, ramTypeSelect, "Select RAM Type");
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedBrand) {
            const series = gpuData[selectedBrand]; 
            
            if (series && Object.keys(series).length > 0) {
                populateSelect(gpuSeriesSelect, Object.keys(series), "Select GPU Series"); 
                gpuSeriesGroup.classList.remove('hidden');
            } else {
                console.warn(`No series data found for GPU brand: ${selectedBrand}. Check gpuData structure.`);
            }
        }
    });

    // Event listener for GPU Series selection (e.g., RTX, GTX, RX 7000 Series)
    gpuSeriesSelect.addEventListener('change', () => {
        const selectedBrand = gpuBrandSelect.value;
        const selectedSeries = gpuSeriesSelect.value; 
        resetAndHideDropdown(gpuModelSeriesGroup, gpuModelSeriesSelect, "Select GPU Model Series");
        resetAndHideDropdown(gpuModelGroup, gpuModelSelect, "Select GPU Model");
        resetAndHideDropdown(ramSizeGroup, ramSizeSelect, "Select RAM Size");
        resetAndHideDropdown(ramTypeGroup, ramTypeSelect, "Select RAM Type");
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedBrand && selectedSeries) {
            const modelsContainer = gpuData[selectedBrand][selectedSeries];
            
            if (modelsContainer && Object.keys(modelsContainer).length > 0) {
                populateSelect(gpuModelSeriesSelect, Object.keys(modelsContainer), "Select GPU Model Series");
                gpuModelSeriesGroup.classList.remove('hidden');
            } else {
                console.warn(`No model series data found for GPU brand: ${selectedBrand}, series: ${selectedSeries}. Check gpuData structure.`);
            }
        }
    });

    // Event listener for GPU Model Series selection (e.g., 40 Series, 30 Series)
    gpuModelSeriesSelect.addEventListener('change', () => {
        const selectedBrand = gpuBrandSelect.value;
        const selectedSeries = gpuSeriesSelect.value;
        const selectedModelSeries = gpuModelSeriesSelect.value; 
        resetAndHideDropdown(gpuModelGroup, gpuModelSelect, "Select GPU Model");
        resetAndHideDropdown(ramSizeGroup, ramSizeSelect, "Select RAM Size");
        resetAndHideDropdown(ramTypeGroup, ramTypeSelect, "Select RAM Type");
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedBrand && selectedSeries && selectedModelSeries) {
            const models = gpuData[selectedBrand][selectedSeries][selectedModelSeries]; 

            if (models && Array.isArray(models) && models.length > 0) {
                populateSelect(gpuModelSelect, models, "Select GPU Model");
                gpuModelGroup.classList.remove('hidden');
            } else {
                console.warn(`No final GPU models (or invalid data) found for Brand: ${selectedBrand}, Series: ${selectedSeries}, Model Series: ${selectedModelSeries}. Check gpuData structure.`);
            }
        }
    });


    // Event listener for GPU Model selection (THIS IS WHERE RAM APPEARS)
    gpuModelSelect.addEventListener('change', () => {
        const selectedModel = gpuModelSelect.value;
        resetAndHideDropdown(ramSizeGroup, ramSizeSelect, "Select RAM Size");
        resetAndHideDropdown(ramTypeGroup, ramTypeSelect, "Select RAM Type");
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedModel) {
            populateSelect(ramSizeSelect, Object.keys(ramData), "Select RAM Size");
            ramSizeGroup.classList.remove('hidden');
        }
    });


    // Event listener for RAM Size selection
    ramSizeSelect.addEventListener('change', () => {
        const selectedSize = ramSizeSelect.value;
        resetAndHideDropdown(ramTypeGroup, ramTypeSelect, "Select RAM Type");
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedSize) {
            populateSelect(ramTypeSelect, ramData[selectedSize], "Select RAM Type");
            ramTypeGroup.classList.remove('hidden');
        }
    });

    // Event listener for RAM Type selection (THIS IS WHERE MOTHERBOARD APPEARS)
    ramTypeSelect.addEventListener('change', () => {
        const selectedType = ramTypeSelect.value;
        resetAndHideDropdown(moboBrandGroup, moboBrandSelect, "Select Motherboard Brand");
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedType) {
            populateSelect(moboBrandSelect, Object.keys(motherboardData), "Select Motherboard Brand");
            moboBrandGroup.classList.remove('hidden');
        }
    });

    // Event listener for Motherboard Brand selection
    moboBrandSelect.addEventListener('change', () => {
        const selectedBrand = moboBrandSelect.value;
        resetAndHideDropdown(moboModelGroup, moboModelSelect, "Select Motherboard Model");

        if (selectedBrand) {
            populateSelect(moboModelSelect, motherboardData[selectedBrand], "Select Motherboard Model");
            moboModelGroup.classList.remove('hidden');
        }
    });


    // --- Main Analyze Button Click Handler ---
    analyzeButton.addEventListener('click', async () => {
        // Collect selected specs
        const selectedCpuBrand = cpuBrandSelect.value;
        const selectedCpuSeries = cpuSeriesSelect.value;
        const selectedCpuGen = cpuGenSelect.value;
        const selectedCpuSuffix = cpuSuffixSelect.value;
        const selectedGpuBrand = gpuBrandSelect.value;
        const selectedGpuSeries = gpuSeriesSelect.value;
        const selectedGpuModelSeries = gpuModelSeriesSelect.value;
        const selectedGpuModel = gpuModelSelect.value;
        const selectedRamSize = ramSizeSelect.value;
        const selectedRamType = ramTypeSelect.value;
        const selectedMoboBrand = moboBrandSelect.value;
        const selectedMoboModel = moboModelSelect.value;

        // Basic validation for all fields
        if (!selectedCpuBrand || !selectedCpuSeries || !selectedCpuGen || !selectedCpuSuffix ||
            !selectedGpuBrand || !selectedGpuSeries || !selectedGpuModelSeries || !selectedGpuModel ||
            !selectedRamSize || !selectedRamType ||
            !selectedMoboBrand || !selectedMoboModel) {
            alert("Please select all specifications before analyzing!");
            return;
        }
        
        console.log("Selected Specs:", {
            cpuBrand: selectedCpuBrand,
            cpuSeries: selectedCpuSeries,
            cpuGeneration: selectedCpuGen,
            cpuSuffix: selectedCpuSuffix,
            gpuBrand: selectedGpuBrand,
            gpuSeries: selectedGpuSeries,
            gpuModelSeries: selectedGpuModelSeries,
            gpuModel: selectedGpuModel,
            ramSize: selectedRamSize,
            ramType: selectedRamType,
            moboBrand: selectedMoboBrand,
            moboModel: selectedMoboModel
        });

        // --- Determine CPU Tier ---
        let cpuTier = "Unknown CPU"; 
        if (selectedCpuBrand === "Intel") {
            if (selectedCpuSeries.includes("i9") || selectedCpuSeries.includes("Ultra 9")) { 
                cpuTier = "High-End CPU";
            } else if (selectedCpuSeries.includes("i7") || selectedCpuSeries.includes("i5")) { 
                cpuTier = "Mid-Range CPU";
            } else { 
                cpuTier = "Budget CPU";
            }
        } else if (selectedCpuBrand === "AMD Ryzen") {
            if (selectedCpuSeries.includes("Ryzen 9") || selectedCpuSeries.includes("Ryzen 7")) { 
                cpuTier = "High-End CPU";
            } else if (selectedCpuSeries.includes("Ryzen 5")) { 
                cpuTier = "Mid-Range CPU";
            } else { 
                cpuTier = "Budget CPU";
            }
        }
        console.log("Determined CPU Tier:", cpuTier);

        // --- Determine RAM Tier ---
        let ramTier = "Unknown RAM"; 
        const ramSizeNum = parseInt(selectedRamSize);
        if (selectedRamType === "DDR5") {
            if (ramSizeNum >= 32) {
                ramTier = "High-End DDR5";
            } else if (ramSizeNum >= 16) {
                ramTier = "Standard DDR5";
            } else { 
                ramTier = "Low-End DDR5";
            }
        } else if (selectedRamType === "DDR4") {
            if (ramSizeNum >= 32) {
                ramTier = "High-Capacity DDR4";
            } else if (ramSizeNum >= 16) {
                ramTier = "Standard DDR4";
            } else { 
                ramTier = "Low-End DDR4";
            }
        } else if (selectedRamType === "DDR3") { 
             ramTier = "Legacy DDR3";
        }
        console.log("Determined RAM Tier:", ramTier);


        // --- NEW: Perform Score-Based Prediction ---
        let predictedPerformanceResults = {}; // Initialize as an empty object for the final results
        
        const gpuBaseScore = componentScores.GPUs[selectedGpuModel] || 0; // Get base score for selected GPU. Default to 0 if not found.
        const cpuMultiplier = componentScores.CPUs[cpuTier] || 1.0; // Get multiplier for CPU tier. Default to 1.0 if not found.
        const ramMultiplier = componentScores.RAMs[ramTier] || 1.0; // Get multiplier for RAM tier. Default to 1.0 if not found.

        const baseSystemScore = gpuBaseScore * cpuMultiplier * ramMultiplier;
        console.log(`Calculated Base System Score: ${baseSystemScore.toFixed(2)} (GPU: ${gpuBaseScore}, CPU_Mod: ${cpuMultiplier}, RAM_Mod: ${ramMultiplier})`);


        // Generate predictions for each game in the table
        // Use an array of game names from the table or define them here for consistency
        const gameNamesInTable = ["GTA V", "Cyberpunk 2077", "Fortnite", "Red Dead Redemption 2"]; // Ensure this matches your HTML table
        
        for (const game of gameNamesInTable) {
            const difficultyFactors = gameDifficultyFactors[game];
            let gamePrediction = { "1080p": "N/A", "2K": "N/A", "4K": "N/A", "Rating": "Unknown" }; // Default for current game

            if (difficultyFactors) {
                // Adjust score based on game difficulty and resolution
                const score1080p = baseSystemScore * difficultyFactors["1080p"];
                const score2k = baseSystemScore * difficultyFactors["2K"];
                const score4k = baseSystemScore * difficultyFactors["4K"];

                // Find appropriate FPS tier for each resolution
                const findFpsTier = (score) => {
                    for (const tier of fpsOutputTiers) {
                        if (score >= tier.score) {
                            return tier;
                        }
                    }
                    return fpsOutputTiers[fpsOutputTiers.length - 1]; // Return lowest tier if score is too low
                };

                const tier1080p = findFpsTier(score1080p);
                const tier2k = findFpsTier(score2k);
                const tier4k = findFpsTier(score4k);

                gamePrediction["1080p"] = tier1080p.fps["1080p"];
                gamePrediction["2K"] = tier2k.fps["2K"];
                gamePrediction["4K"] = tier4k.fps["4K"];
                gamePrediction["Rating"] = tier1080p.rating; // Base rating on 1080p performance tier
            }
            predictedPerformanceResults[game] = gamePrediction;
        }
        
        console.log("Final Predicted Results per Game:", predictedPerformanceResults);


        // Trigger loading animation
        analyzeButton.classList.add('charging');
        body.classList.add('background-warp');
        body.addEventListener('animationend', () => {
            body.classList.remove('background-warp');
        }, { once: true });

        actionSection.classList.remove('active');
        actionSection.classList.add('hidden');
        
        setTimeout(async () => {
            analyzeButton.classList.remove('charging');
            loaderPlaceholder.style.display = 'flex';
            loaderPlaceholder.style.opacity = '1';
            loaderPlaceholder.style.pointerEvents = 'all';

            const loaderContent = loaderPlaceholder.querySelector('.loader-content');
            loaderContent.style.animation = 'none';
            void loaderContent.offsetWidth; 
            loaderContent.style.animation = 'fadeInUp 0.8s ease-out forwards';

            loaderStatusMessage.style.display = 'block';
            loaderStatusMessage.textContent = "Analyzing your system...";
            
            const fixedLoadingTime = 3000;
            await new Promise(resolve => setTimeout(resolve, fixedLoadingTime));

            loaderPlaceholder.style.opacity = '0';
            loaderPlaceholder.style.pointerEvents = 'none';
            setTimeout(() => {
                loaderPlaceholder.style.display = 'none';
            }, 500);

            resultsDisplay.style.display = 'block';
            resultsDisplay.style.opacity = '1';
            resultsDisplay.style.pointerEvents = 'auto';

            resultsDisplay.classList.add('scan-reveal-effect');
            resultsDisplay.addEventListener('animationend', () => {
                resultsDisplay.classList.remove('scan-reveal-effect');
            }, { once: true });

            resultsTitle.style.animation = 'none'; 
            void resultsTitle.offsetWidth; 
            resultsTitle.style.animation = 'fadeInUp 1s ease-out forwards';

            resultsDisplay.classList.add('shake-on-appear');
            resultsDisplay.addEventListener('animationend', () => {
                resultsDisplay.classList.remove('shake-on-appear');
            }, { once: true });

            // Populate and animate FPS in the table using calculated predictedPerformanceResults
            fpsTableRows.forEach((row, rowIndex) => {
                const gameName = row.querySelector('td:first-child').textContent;
                const gamePredictions = predictedPerformanceResults[gameName]; 

                row.style.opacity = '0';
                row.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateY(0)';
                    
                    const fps1080pElement = row.querySelector('td:nth-child(2) span');
                    const fps2kElement = row.querySelector('td:nth-child(3) span');
                    const fps4kElement = row.querySelector('td:nth-child(4) span');
                    const ratingElement = row.querySelector('td:nth-child(5) span'); 

                    if (gamePredictions) {
                        animateFpsNumber(fps1080pElement, gamePredictions["1080p"]);
                        animateFpsNumber(fps2kElement, gamePredictions["2K"]);
                        animateFpsNumber(fps4kElement, gamePredictions["4K"]);
                        animateFpsNumber(ratingElement, gamePredictions["Rating"]); // Pass rating text directly
                    } else { // Fallback if for some reason a game prediction isn't generated
                        fps1080pElement.textContent = "N/A"; fps1080pElement.classList.add('unavailable-fps');
                        fps2kElement.textContent = "N/A"; fps2kElement.classList.add('unavailable-fps');
                        fps4kElement.textContent = "N/A"; fps4kElement.classList.add('unavailable-fps');
                        ratingElement.textContent = "Unknown"; ratingElement.classList.add('unavailable-fps');
                    }

                }, 500 + (rowIndex * 200));
            });

        }, 300);
    });

    // --- Mouse Glow Follower and Parallax Effect ---
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        document.documentElement.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth - 0.5) * 30}px`);
        document.documentElement.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight - 0.5) * 30}px`);
        
        mouseGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        mouseGlow.style.opacity = '0';
    });

    requestAnimationFrame(updateMouseGlow);

    // --- Header Title Hover Effect ---
    const headerTitles = document.querySelectorAll('.header-glow-hover');
    headerTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.classList.add('hover-active');
        });
        title.addEventListener('mouseleave', () => {
            title.classList.remove('hover-active');
        });
    });
});
