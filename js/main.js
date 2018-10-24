jQuery(document).ready(function($) {

    // REMOVE LOADING EFFECT 
    $('#loading-cover').delay(100).fadeOut(500);
});



// SOLVE MOBILE ISSUE WITH HEIGHT
$(window).on("load", function(e) {

    if ($('#feat-video').length) {
        $('#feat-video').YTPlayer();
    }
});

// CHECK SCROLL FUNCTION
(function($) {
    var uniqueCntr = 0;
    $.fn.scrolled = function(waitTime, fn) {
        if (typeof waitTime === "function") {
            fn = waitTime;
            waitTime = 300;
        }
        var tag = "scrollTimer" + uniqueCntr++;
        this.scroll(function() {
            var self = $(this);
            var timer = self.data(tag);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function() {
                self.removeData(tag);
                fn.call(self[0]);
            }, waitTime);
            self.data(tag, timer);
        });
    }
})(jQuery);

// MENU FUNCTIONS
$(window).on("load", function(e) {

    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    $('.menu-trigger.main').click(function(e) {
        $(this).toggleClass('close');
        $('.top-menu').toggleClass('open');
        $('.header').toggleClass('menu-open');
        $('div.scroll-down').toggleClass('menu-open');
        $('.bx-controls-direction').fadeToggle(300);
        $('#main-logo').fadeToggle(300);
        setTimeout(function() {
            $('#main-menu').toggleClass('open');
        }, 500);
    });

    $('.menu-trigger.blog').click(function(e) {
        $(this).toggleClass('close');
        $('ul.blog-container').toggleClass('open');
        $('li.blog-menu').toggleClass('open');
        $('section.blog').toggleClass('open');
    });

    $(".scroll-down").click(function() {
        var offset = 20; //Offset of 20px
        $('html, body').animate({
            scrollTop: $("section:first-of-type").offset().top + offset
        }, 600);
    });

    $("#main-menu a").click(function(e) {
        e.preventDefault();
        var offset = 20; //Offset of 20px
        var scrollTo = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(scrollTo).offset().top + offset
        }, 600);
        $('.bx-controls-direction').fadeToggle(300);
        $('#main-logo').fadeToggle(300);
    });

    // BACK TO TOP ARROW 
    $(window).scrolled(function() {
        var offset = 1000;
        var menuOffset = 300;
        var duration = 500;
        var ScrollTop = $(window).scrollTop();

        if (ScrollTop > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
        // HIDE MENU WHEN SCROLLED
        if (ScrollTop > menuOffset) {
            $('.menu-trigger.main').removeClass('close');
            $('.top-menu').removeClass('open');
            $('.header').removeClass('menu-open');
            $('div.scroll-down').removeClass('menu-open');
            $('#main-menu').removeClass('open');
        }
    });

});


// bxslider function
jQuery(document).ready(function($) {
    if ($('.bxslider').length) {
        $('.bxslider').bxSlider({
            infiniteLoop: true,
            preloadImages: 'all',
            controls: true,
            pager: false,
            auto: true,
            pause: 6000,
            speed: 1000,
            touchEnabled: false,
            onSliderLoad: function() {
                $(".bxslider").css("visibility", "visible");
            }
        });
    }


});



$(window).load(function() {
    // LIGHTBOX GALLERY SETTINGS
    $(function() {

        var filter = 'all';

        // ACTIVITY INDICATOR
        var activityIndicatorOn = function() {
                $('<div class="image-loading"></div>').appendTo('body');
            },
            activityIndicatorOff = function() {
                $('.image-loading').remove();
            },

            // OVERLAY
            overlayOn = function() {
                $('<div id="imagelightbox-overlay"></div>').appendTo('body');

            },
            overlayOff = function() {
                $('#imagelightbox-overlay').remove();
            },

            // CLOSE BUTTON
            closeButtonOn = function(instance) {
                $('<div id="imagelightbox-close" ><i class="fa fa-times"></i></div>').appendTo('body').on('click touchend', function() {
                    $(this).remove();
                    instance.quitImageLightbox();
                    return false;
                });
            },
            closeButtonOff = function() {
                $('#imagelightbox-close').remove();
            };

        // ARROWS
        arrowsOn = function(instance, selector) {
                var $arrows = $('<div class="imagelightbox-arrow imagelightbox-arrow-left"><i class="fa fa-chevron-left"></i></div><div  class="imagelightbox-arrow imagelightbox-arrow-right"><i class="fa fa-chevron-right"></i></div>');

                $arrows.appendTo('body');

                $arrows.on('click touchend', function(e) {
                    e.preventDefault();

                    var $this = $(this),
                        $target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]'),
                        index = $target.index(selector);

                    if ($this.hasClass('imagelightbox-arrow-left')) {
                        index = index - 1;
                        if (!$(selector).eq(index).length)
                            index = $(selector).length;
                    } else {
                        index = index + 1;
                        if (!$(selector).eq(index).length)
                            index = 0;
                    }

                    instance.switchImageLightbox(index);
                    return false;
                });
            },
            arrowsOff = function() {
                $('.imagelightbox-arrow').remove();
            },

            // CAPTION
            captionOn = function(selector) {
                var description = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]').data('descr');
                if (description.length > 0)
                    $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
            },
            captionOff = function() {
                $('#imagelightbox-caption').remove();
            };

        // LIGHTBOX INSTANCES

        var $lightbox = $('.lightbox.' + filter).imageLightbox({
            onStart: function() {
                overlayOn();
                arrowsOn($lightbox, '.lightbox.' + filter);
                $('.imagelightbox-arrow').css('display', 'block');
                closeButtonOn($lightbox);
            },
            onEnd: function() {
                arrowsOff();
                overlayOff();
                activityIndicatorOff();
                closeButtonOff();
                captionOff();
            },
            onLoadStart: function() {
                activityIndicatorOn();
                captionOff();
            },
            onLoadEnd: function() {
                activityIndicatorOff();
                captionOn('.gal-item:not([style*="display: none"]) a.lightbox');
            }
        });

        if ($('.blog.page').length || $('article.page').length) {
            var $lightbox_blog = $('a.lightbox').imageLightbox({
                onStart: function() {
                    overlayOn();
                    arrowsOn($lightbox_blog, 'a.lightbox');
                    $('.imagelightbox-arrow').css('display', 'block');
                    closeButtonOn($lightbox_blog);
                },
                onEnd: function() {
                    arrowsOff();
                    overlayOff();
                    activityIndicatorOff();
                    closeButtonOff();
                },
                onLoadStart: function() {
                    activityIndicatorOn();
                },
                onLoadEnd: function() {
                    activityIndicatorOff();
                }
            });
        }

        // Shuffle Masonry
        var $grid = $('#gallery'),
            $gridItems = $grid.find('.gal-item'),
            gutter = $('#gallery').data('gutter'),
            shuffle;

        // instantiate the plugin
        $('#gallery').imagesLoaded(function() {
            $grid.shuffle({
                itemSelector: '#gallery .gal-item',
                gutterWidth: gutter,
            });
        });

        shuffle = $grid.data('group');

        $('.gal-header-center-right-links').click(function(e) {
            filter = $(this).data('group');
            var new_elements = $('.lightbox.' + filter);

            // Filter elements
            $grid.shuffle('shuffle', filter);

            $('.gal-header-center-right-links').removeClass('current');
            $(this).addClass('current');

            // set new Lightbox elements
            $lightbox.removeImagesLightbox();
            $lightbox.addImageLightbox(new_elements);
        });


    });

    jQuery(".video-portfolio").YouTubePopUp();



});

$(window).resize(function() {
    var $grid = $('#gallery');

    $grid.shuffle('update');
});