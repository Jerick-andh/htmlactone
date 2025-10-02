function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = "try.html";
    }
}

$(document).ready(function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    console.log('Logged in user:', loggedInUser); 
    
    if (loggedInUser) {
        $('#usernameBanner').text(loggedInUser);
        $('#welcomeBanner').show().fadeIn('slow');
        
        console.log('Welcome banner should be visible now');
        setTimeout(function() {
            $('#welcomeBanner').fadeOut('slow');
        }, 1000);
    } else {
        console.log('No user logged in, redirecting to login');
        window.location.href = "try.html";
    }

    $('.nav-link[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        if (target !== '#' && $(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70
            }, 800);
        }
    });


    $('#contactForm').validate({
        rules: {
            contactName: {
                required: true,
                minlength: 2
            },
            contactEmail: {
                required: true,
                email: true
            },
            contactSubject: {
                required: true,
                minlength: 3
            },
            contactMessage: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            contactName: {
                required: "Please enter your name",
                minlength: "Name must be at least 2 characters"
            },
            contactEmail: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            contactSubject: {
                required: "Please enter a subject",
                minlength: "Subject must be at least 3 characters"
            },
            contactMessage: {
                required: "Please enter your message",
                minlength: "Message must be at least 10 characters"
            }
        },
        errorElement: 'div',
        errorClass: 'text-danger small',
        submitHandler: function(form) {
            const name = $(form).find('input[name="contactName"]').val();
            const email = $(form).find('input[name="contactEmail"]').val();
            const subject = $(form).find('input[name="contactSubject"]').val();
            const message = $(form).find('textarea[name="contactMessage"]').val();
            
            alert('Form submitted successfully!\n\n' +
                  `Name: ${name}\n` +
                  `Email: ${email}\n` +
                  `Subject: ${subject}\n` +
                  `Message: ${message}`);
            
            form.reset();
        }
    });

    function animateSkillBars() {
        $('.skill-progress').each(function() {
            const $this = $(this);
            const width = $this.data('width');
            const rect = this.getBoundingClientRect();
            
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                if (!$this.hasClass('animated')) {
                    $this.addClass('animated');
                    $this.animate({ width: width + '%' }, 1500);
                    $this.find('.skill-text').fadeIn(1500);
                }
            }
        });
    }

    animateSkillBars();
    $(window).on('scroll', animateSkillBars);
    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    $('a[href="#contact"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 70
        }, 800);
    });

    $(window).scroll(function() {
        const scrollDistance = $(window).scrollTop();
        
        $('section').each(function() {
            const $this = $(this);
            const sectionTop = $this.offset().top - 100;
            const sectionId = $this.attr('id');
            
            if (scrollDistance >= sectionTop) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });

    $('.project-card').hover(
        function() {
            $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).removeClass('shadow-lg').css('transform', 'translateY(0)');
        }
    );

    $('.social-link').hover(
        function() {
            $(this).css('transform', 'scale(1.1)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    function fadeInCards() {
        $('.about-card').each(function() {
            const $this = $(this);
            const rect = this.getBoundingClientRect();
            
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                if (!$this.hasClass('fade-in')) {
                    $this.addClass('fade-in');
                    $this.css('opacity', '0').animate({ opacity: 1 }, 800);
                }
            }
        });
    }

    fadeInCards();
    $(window).on('scroll', fadeInCards);
});