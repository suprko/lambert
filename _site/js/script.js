$(document).ready(function() {
    // Navigation
    $('#menu-toggle').on('click tap', function() {
        $('#header').toggleClass('opened');
        $('#mobile-menu-content').toggleClass('opened');
    });

    // Hide menu when mobile menu clicked (bc many are anchor links)
    $('#mobile-menu-content a').on('click tap', function() {
        $('#header').removeClass('opened');
        $('#mobile-menu-content').removeClass('opened');
    });

    $('.dropdown-toggle').on('tap', function() {
        if (!$(this).parent('.menu-item').hasClass('opened')) {
            $('.menu-item.opened').removeClass('opened');
            $(this).parent('.menu-item').addClass('opened');
        } else {
            $('.menu-item.opened').removeClass('opened');
        };
    });

    // Add nav-header bottom border on scroll
    $(window).scroll(function() {
        if (!$('#header').hasClass('scrolled') && $(this).scrollTop() >= 2) {
            $('#header').addClass('scrolled');
        }
        if ($(this).scrollTop() < 2 && $('#header').hasClass('scrolled')) {
            $('#header').removeClass('scrolled');
        }
    });

    // Smooth scroll on anchor click
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .on('click tap', function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
          &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top - 144 + 'px'
            }, 1000, function() {
              // Change focus?
              // var $target = $(target);
              // $target.focus();
              // if ($target.is(":focus")) { // Checking if the target was focused
              //   return false;
              // } else {
              //   $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              //   $target.focus(); // Set focus again
              // };
            });
          }
        }
    });

    // Smooth scroll on loading an anchor link
    if (location.hash) {
        window.scrollTo(0, 0);

        setTimeout(function() {
            $('html, body').animate({
              scrollTop: $(location.hash).offset().top - 144 + 'px'
            }, 1000, function() {
            });
        }, 1);
    }

    //// Fancy sidebar behaviours
    if ($('.sidebar')) {

        // Measure description-section offsets
        var active = 0;
        var ranges = [];
        var sections = [];
        var entries = [];

        var scrollTop = $(window).scrollTop();
        var midWindow = $(window).height() * 0.5;

        if ($('#badges-sidebar')) {
            $('#badges-sidebar .badge').each(function() {
                entries.push($(this));
            });
        }

        if ($('#people-sidebar')) {
            $('#people-sidebar .person').each(function() {
                entries.push($(this));
            });
        }

        $('.description-section').each(function() {
            sections.push($(this));
            ranges.push([$(this).offset().top - midWindow]);
        });

        $(window).resize(function() {
            midWindow = $(window).height() * 0.5;

            for (var i=0; i<sections.length; i++) {
                ranges[i] = [sections[i].offset().top - midWindow];
            }
        });

        $(window).scroll(function() {
            scrollTop = $(window).scrollTop();

            for (var i=0; i<sections.length; i++) {
                if (scrollTop > ranges[i]) {
                    entries[active].removeClass('active');
                    entries[i].addClass('active');
                    active = i;
                }
            }

            // Show/hide sidebar on scroll
            var scrolledPastRef = scrollTop - $('.sidebar-reference').offset().top + 240 > 0;
            var scrolledPastHide = false;

            if ($('.sidebar-hide').length) {
                scrolledPastHide = scrollTop + $(window).height() - $('.sidebar-hide').offset().top > 0;
            }

            if (!$('.sidebar').hasClass('active')) {
                if (scrolledPastRef && !scrolledPastHide) {
                    $('.sidebar').addClass('active');
                }
            } else {
                if (!scrolledPastRef || scrolledPastHide) {
                    $('.sidebar').removeClass('active');
                }
            }

            // Activate sidebar elements when scrolled to corresponding part of page
        });
    }

});
