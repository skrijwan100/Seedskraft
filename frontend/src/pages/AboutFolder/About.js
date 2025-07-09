document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slide');
            const indicators = document.querySelectorAll('.indicator');
            let currentSlide = 0;
            const slideCount = slides.length;
            
            // Initialize slideshow
            function showSlide(index) {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Show current slide
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
            }
            
            // Auto-advance slides every 2 seconds
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                showSlide(currentSlide);
            }
            
            // Set up click events for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    currentSlide = index;
                    showSlide(currentSlide);
                    resetTimer();
                });
            });
            
            // Start slideshow
            let slideInterval = setInterval(nextSlide, 2000);
            
            // Reset timer when user interacts with slideshow
            function resetTimer() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 2000);
            }
            
            // Pause on hover
            const slideshow = document.querySelector('.slideshow-container');
            slideshow.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slideshow.addEventListener('mouseleave', () => {
                resetTimer();
            });
            
            // Show first slide initially
            showSlide(0);
        });