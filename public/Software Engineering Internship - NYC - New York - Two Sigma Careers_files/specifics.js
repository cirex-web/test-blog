/**
 * Library initialization.
 * In this file you should also add extra behavior.
 */

ServiceFactory.getEventManager().attachToLoadEvent(function() {
    Templates.init();
});

document.addEventListener("TemplatesReady", function() {

    // Related Jobs widget
    if (twigConfig.relatedJobs.relatedJobsEnabled) {
        var selector = document.querySelector(twigConfig.relatedJobs.selector);
        if (selector) {
            Utils.preloader.show(twigConfig.relatedJobs.selector);
            Utils.getPage(twigConfig.relatedJobs.url)
            .then((response) => response.text())
            .then(function(data) {
                if (data) {
                    selector.innerHTML = data;
                    Utils.preloader.hide(twigConfig.relatedJobs.selector);
                } else {
                    selector.classList.add('visibility--hidden');
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }

    // Starting Google Maps plugin
    if (twigConfig.googleMapsEnabled) {
        Utils.googleMaps("#map-canvas",{});
    }
});
