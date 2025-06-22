// --- Back to Top Button Logic ---
// Get the button
let mybutton = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// --- Featured Salon Highlight Logic (for index.html only) ---
document.addEventListener('DOMContentLoaded', function() {
    const featuredSalonName = document.getElementById('featured-salon-name');
    const featuredSalonDescription = document.getElementById('featured-salon-description');

    if (featuredSalonName && featuredSalonDescription) {
        const salons = [
            {
                name: "The Glamour Hub",
                description: "Experience unparalleled luxury with our award-winning stylists and spa services."
            },
            {
                name: "Radiant Beauty Co.",
                description: "Your destination for natural beauty enhancements and organic skincare treatments."
            },
            {
                name: "Chic Cut & Color",
                description: "Trendsetting haircuts and vibrant color transformations by expert colorists."
            }
        ];

        let currentIndex = 0;

        function updateFeaturedSalon() {
            featuredSalonName.textContent = salons[currentIndex].name;
            featuredSalonDescription.textContent = salons[currentIndex].description;
            currentIndex = (currentIndex + 1) % salons.length; // Cycle through salons
        }

        // Update immediately on load
        updateFeaturedSalon();

        // Update every 5 seconds (5000 milliseconds)
        setInterval(updateFeaturedSalon, 5000);
    }

    // --- Booking Page Logic (for book.html only) ---
    const bookingForm = document.getElementById('bookingForm');
    const timeSlotsContainer = document.getElementById('time-slots');
    const selectedTimeInput = document.getElementById('selected-time');
    const bookingConfirmation = document.getElementById('booking-confirmation');

    // Populate salon and service info from URL parameters if on book.html
    if (bookingForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const salonName = urlParams.get('salon');
        const salonLocation = urlParams.get('location');
        const suggestedService = urlParams.get('service');

        if (salonName) {
            document.getElementById('salon-name-display').textContent = decodeURIComponent(salonName);
        }
        if (salonLocation) {
            document.getElementById('salon-location-display').textContent = decodeURIComponent(salonLocation);
        }
        if (suggestedService) {
            const serviceSelect = document.getElementById('service');
            // Set the dropdown to the suggested service if it exists in options
            if (serviceSelect) {
                for (let i = 0; i < serviceSelect.options.length; i++) {
                    if (serviceSelect.options[i].value === decodeURIComponent(suggestedService)) {
                        serviceSelect.value = decodeURIComponent(suggestedService);
                        document.getElementById('selected-service-display').textContent = decodeURIComponent(suggestedService);
                        break;
                    }
                }
            }
        } else {
             // If no suggested service, hide the service display line
            document.getElementById('selected-service-display').closest('p').style.display = 'none';
        }


        // Generate dummy time slots
        function generateTimeSlots() {
            timeSlotsContainer.innerHTML = ''; // Clear previous slots
            const times = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
            const unavailableTimes = ["12:00 PM", "03:00 PM"]; // Simulate some unavailable times

            times.forEach(time => {
                const button = document.createElement('button');
                button.type = 'button'; // Important: prevents form submission
                button.classList.add('time-slot-btn');
                button.textContent = time;

                if (unavailableTimes.includes(time)) {
                    button.classList.add('unavailable');
                    button.disabled = true;
                } else {
                    button.addEventListener('click', () => {
                        // Remove 'selected' from all other buttons
                        document.querySelectorAll('.time-slot-btn').forEach(btn => {
                            btn.classList.remove('selected');
                        });
                        // Add 'selected' to the clicked button
                        button.classList.add('selected');
                        selectedTimeInput.value = time; // Set hidden input value
                    });
                }
                timeSlotsContainer.appendChild(button);
            });
        }

        // Generate time slots on page load
        generateTimeSlots();

        // Re-generate time slots if date changes (simulating availability per day)
        document.getElementById('date').addEventListener('change', generateTimeSlots);

        // Handle booking form submission
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            // Basic validation for time slot selection
            if (!selectedTimeInput.value) {
                alert('Please select a time slot.');
                return;
            }

            // Simulate booking confirmation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = selectedTimeInput.value;

            // Populate confirmation message
            document.getElementById('conf-salon-name').textContent = decodeURIComponent(salonName);
            document.getElementById('conf-service').textContent = service;
            document.getElementById('conf-date').textContent = date;
            document.getElementById('conf-time').textContent = time;

            bookingForm.style.display = 'none'; // Hide the form
            bookingConfirmation.style.display = 'block'; // Show the confirmation message

            // Log booking details to console (for development/debugging)
            console.log('Simulated Booking Details:');
            console.log('Salon:', decodeURIComponent(salonName));
            console.log('Service:', service);
            console.log('Date:', date);
            console.log('Time:', time);
            console.log('Name:', name);
            console.log('Email:', email);

            // Optionally, clear the form after "booking"
            bookingForm.reset();
            selectedTimeInput.value = ''; // Clear selected time too
        });
    }
});