// --- Mobile (Hamburger) Menu Toggle ---
// We must check if the button exists first, as it's not on all pages (e.g., the booking form page)
const menuBtn = document.getElementById('menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });
}

// --- Test Search Filter (for services.html) ---
// We check if the search bar exists on the current page
const testSearch = document.getElementById('test-search');
if (testSearch) {
    // This function must be in the global scope to be called by onkeyup
    window.filterTests = function() {
        const input = document.getElementById('test-search');
        const filter = input.value.toUpperCase();
        const listContainer = document.getElementById('test-list-container');
        const items = listContainer.querySelectorAll('.test-item');
        const noResults = document.getElementById('no-results');
        let found = false;
        
        items.forEach(item => {
            const txtValue = item.textContent || item.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                item.style.display = "";
                found = true;
            } else {
                item.style.display = "none";
            }
        });

        const categories = listContainer.querySelectorAll('.text-item-list');
        categories.forEach(category => {
            let hasVisibleChild = false;
            category.querySelectorAll('.test-item').forEach(item => {
                if (item.style.display !== 'none') {
                    hasVisibleChild = true;
                }
            });
            
            if (hasVisibleChild) {
                category.parentElement.style.display = "";
            } else {
                category.parentElement.style.display = "none";
            }
        });
        
        if (found) {
            noResults.classList.add('hidden');
        } else {
            noResults.classList.remove('hidden');
        }
    }
}


// --- Booking Form Logic (for book.html) ---
// Check if the booking form exists on the current page
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    // Handle Booking Form (Simulation)
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('booking-submit-btn');
        const successMsg = document.getElementById('booking-success');
        
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting...';
        
        setTimeout(() => {
            this.reset(); // Clear the form
            // Also reset all cloned 'other' fields
            document.querySelectorAll('.other-test-input').forEach((input, index) => {
                if (index > 0) { // Keep the first row
                    input.parentElement.remove();
                } else {
                    input.classList.add('hidden');
                }
            });
            document.querySelectorAll('.test-field-row').forEach((row, index) => {
                if (index > 0) row.remove();
            });


            submitBtn.disabled = false;
            submitBtn.innerText = 'Request Appointment';
            successMsg.classList.remove('hidden');
            
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        }, 1500);
    });

    // Handle "Add Another Test" button
    document.getElementById('add-test-btn').addEventListener('click', () => {
        const container = document.getElementById('test-fields-container');
        const firstRow = container.querySelector('.test-field-row');
        const newRow = firstRow.cloneNode(true);
        const newSelect = newRow.querySelector('.test-select');
        const newOtherInput = newRow.querySelector('.other-test-input');

        newSelect.value = ""; 
        newOtherInput.value = ""; 
        newOtherInput.classList.add('hidden'); 

        container.appendChild(newRow);
    });

    // Handle showing/hiding the "Other" text field
    const testFieldsContainer = document.getElementById('test-fields-container');
    testFieldsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('test-select')) {
            const selectElement = e.target;
            const otherInput = selectElement.nextElementSibling; 

            if (selectElement.value === 'other') {
                otherInput.classList.remove('hidden');
                otherInput.focus();
            } else {
                otherInput.classList.add('hidden');
                otherInput.value = '';
            }
        }
    });
}


// --- Report Login Logic (for reports.html) ---
// Check if the report form exists on the current page
const reportForm = document.getElementById('report-form');
if (reportForm) {
    // Handle Report Login (Simulation)
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('report-submit-btn');
        const reportData = document.getElementById('report-data');
        const patientName = document.getElementById('report-patient-name');
        const patientId = document.getElementById('patient-id').value;

        submitBtn.disabled = true;
        submitBtn.innerText = 'Logging in...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Login & View Reports';
            patientName.innerText = patientId || "Demo Patient";
            reportData.classList.remove('hidden');
        }, 1500);
    });
}