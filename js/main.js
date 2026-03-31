(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Section reveal animation
    (function () {
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            return;
        }

        var targets = document.querySelectorAll('.blog-item, .container.bg-white, .container.bg-secondary, .contact-form, .carousel');

        if (!targets.length) {
            return;
        }

        targets.forEach(function (el, index) {
            el.classList.add('reveal-on-scroll');
            el.style.transitionDelay = Math.min(index * 70, 420) + 'ms';
        });

        if (!('IntersectionObserver' in window)) {
            targets.forEach(function (el) {
                el.classList.add('is-visible');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        targets.forEach(function (el) {
            observer.observe(el);
        });
    })();

    // Image lightbox
    (function () {
        var triggers = document.querySelectorAll('a.image-lightbox');
        if (!triggers.length) {
            return;
        }

        var overlay = document.createElement('div');
        overlay.className = 'image-lightbox-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = [
            '<button type="button" class="image-lightbox-close" aria-label="Close image preview">&times;</button>',
            '<img class="image-lightbox-image" src="" alt="">',
            '<p class="image-lightbox-caption"></p>'
        ].join('');

        document.body.appendChild(overlay);

        var closeButton = overlay.querySelector('.image-lightbox-close');
        var lightboxImage = overlay.querySelector('.image-lightbox-image');
        var caption = overlay.querySelector('.image-lightbox-caption');

        function closeLightbox() {
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lightbox-open');
            lightboxImage.setAttribute('src', '');
            caption.textContent = '';
        }

        function openLightbox(anchor) {
            var fullImage = anchor.getAttribute('href');
            var preview = anchor.querySelector('img');
            var altText = preview ? (preview.getAttribute('alt') || '') : '';

            lightboxImage.setAttribute('src', fullImage);
            lightboxImage.setAttribute('alt', altText || 'Full image preview');
            caption.textContent = altText;

            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lightbox-open');
            closeButton.focus();
        }

        triggers.forEach(function (anchor) {
            anchor.addEventListener('click', function (event) {
                event.preventDefault();
                openLightbox(anchor);
            });
        });

        closeButton.addEventListener('click', closeLightbox);

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
                closeLightbox();
            }
        });
    })();
})(jQuery);

