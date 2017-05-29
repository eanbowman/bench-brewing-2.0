var Loading = {
    show: function() {
        $("body").prepend(
            $('<div id="preloader">').append(
                $('<div id="status">').html("").append(
                    $('<span class="percentage">')
                )
            )
        );
        $("#preloader, #status").show();
    },
    hide: function() {
        $('#preloader').css({
            opacity: 0
        })
        setTimeout(function() {
            $('html,body').css({ 'overflow': '' });
            $("#preloader").remove()
        }, Preloader.preload_images.length * 150);

    }
}

$(document).ready(function() {
    //$('html, body').css({ 'overflow': 'hidden', 'scrollTop': '0' });
    $("#home div.logo").css("opacity", 0);
    Preloader.init();
});

var Preloader = {
    images_loaded: 0,
    preloader_loaded_percentage: 0,
    enable_scroll: false,
    preload_images: [
        "_assets/images/beercan-ballsfalls.png",
        "_assets/images/beercan-twentymile.png",
        "_assets/images/beercans.png",
        "_assets/images/bknd-findus.jpg",
        "_assets/images/bknd-home.jpg",
        "_assets/images/bknd-locations.jpg",
        "_assets/images/bknd-ourbeer-slideover-ballsfalls.jpg",
        "_assets/images/bknd-ourbeer-slideover-twentymile.jpg",
        "_assets/images/bknd-ourbeer.jpg",
        "_assets/images/bknd-ourbrewery.jpg",
        "_assets/images/bknd-ourhome.jpg",
        "_assets/images/bknd-ourpeople.jpg",
        "_assets/images/bknd-ourregion.jpg",
        "_assets/images/bknd-ourvision.png"
    ],
    init: function() {
        var self = this;
        // Show preload screen 
        Loading.show();

        //console.log("Loading ", self.preload_images.length, " Images");

        $.each(self.preload_images, function(i, image) {
            var img = new Image();

            $(img).load(function() {
                self.images_loaded++;
                self.preloader_loaded_percentage = Math.floor(self.images_loaded * 100 / self.preload_images.length);

                //console.log("Loaded", self.images_loaded, " : ", self.preloader_loaded_percentage, "%");

                /*
                $("#preloader").css("filter", 'invert(' + self.preloader_loaded_percentage + '%)');
                $("#preloader").css("-moz-filter", 'invert(' + self.preloader_loaded_percentage + '%)');
                $("#preloader").css("-o-filter", 'invert(' + self.preloader_loaded_percentage + '%)');
                $("#preloader").css("-ms-filter", 'invert(' + self.preloader_loaded_percentage + '%)');
                */
                $("#home div.logo").css("opacity", (self.preloader_loaded_percentage / 100).toFixed(1));


                $("#status span.percentage").css({
                    width: self.preloader_loaded_percentage + "%"
                });

                console.log(self.preloader_loaded_percentage, (self.preloader_loaded_percentage / 100).toFixed(1));

                // When Image Is Loaded
                if (self.images_loaded === self.preload_images.length) {
                    console.log("Images Loaded");

                    this.enable_scroll = true;
                    $("#preloader span.percentage").animate({
                        width: "100%"
                    }, 25)
                    Loading.hide();
                }
            })
            img.src = image;
        });
    }
}