
$('.tx-dlf-basket-button a').text("merken");
$('.add-to-cart a').text("merken");
$('#submitBasketForm').text("merken");

$('#kitodo-logo').attr("href", "index.php?id=1");

function listviewCalendarSwitch() {
    $('.tx-dlf-listview li .tx-dlf-type span').each(function() {
        if ($(this).text().trim().toLowerCase() == 'zeitung' || $(this).text().trim().toLowerCase() == 'jahr') {
            var link = $(this).parent().parent().find("h2 a").attr('href');
            link = link.split("?");
            var params = link[1];
            link = link[0];
            link = link.replace('detailseite', 'kalender');
            link = link.replace('/startseite/trefferliste', '');
            $(this).parent().parent().find("h2 a").attr('href', link + '?' + params);
        }
    });
}

$( document ).ready(function() {
    // switch between list and calendar
    calendarSwitchViews();
    calendarSelectBox();
    listviewCalendarSwitch();
    calendarTitleOnly();
});

function calendarTitleOnly() {
    if ($('.tx-dlf-calendar').length) {
        var title = $('.tx-dlf-metadata .metadata-title ul li').text();
        $('.tx-dlf-metadata').parent().append('<div class="title-only">' + title + '</div>')
        $('.tx-dlf-metadata').hide();

    }
}

function calendarSwitchViews() {
    // ,calendar-items // .list-view
    // .select-calendar-view // .select-list-view active
    // .calendar-list-selection
    $('.list-view').hide();
    $('.calendar-list-selection .select-calendar-view').addClass('selection-active');
    $('.calendar-list-selection .select-calendar-view').on('click', function (evt) {
        $('.calendar-items').show();
        $('.list-view').hide()
        $('.calendar-list-selection .select-calendar-view').addClass('selection-active');
        $('.calendar-list-selection .select-list-view').removeClass('selection-active');
    });

    $('.calendar-list-selection .select-list-view').on('click', function (evt) {
        $('.list-view').show();
        $('.calendar-items').hide();
        $('.calendar-list-selection .select-list-view').addClass('selection-active');
        $('.calendar-list-selection .select-calendar-view').removeClass('selection-active');
    });

}

function calendarSelectBox() {

    if (isTouchDevice()) {
        $(document).mouseup(function(e)
        {
            var container = $("div.issues div.openSelectBox");

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0)
            {
                container.hide();
                container.removeClass('openSelectBox');
            }
        });

        // $("div.issues div ul").each(function () {
        //     var interactiveElement = $(this).closest('div.issues');
        //     if ($(this).children('li').length > 1) {
        //         interactiveElement.on('click', function (event) {
        //             $("div.issues div.openSelectBox").hide();
        //
        //             $(this).children("div").addClass('openSelectBox');
        //             $(this).children("div").show();
        //         });
        //     } else {
        //         // dont show select box
        //         // set direct link instead
        //         interactiveElement.on('click', function (event) {
        //             window.location.href = $(this).find('div ul li a').attr('href');
        //         });
        //     }
        // });

    } else {

        $("div.issues div.dayLinkList").each(function () {
            var interactiveElement = $(this).closest('div.issues');
            if ($(this).children('a').length > 1) {
                // show select box
                interactiveElement.on('mouseenter', function (event) {
                    // $("div.issues div.dayLinkList").hide();

                    $(this).children("div").addClass('openSelectBox');
                    $(this).children("div").show();

                    setTimeout(function hoverTimeoutCheck() {
                        if ($('div.issues div.openSelectBox:hover').length == 0 && $('div.issues:hover').length == 0) {
                            $("div.issues div.openSelectBox").hide();
                        } else {
                            setTimeout(hoverTimeoutCheck, 1000);
                        }
                    }, 1000);
                });
            } else {
                // set direct link
                interactiveElement.on('click', function (event) {
                    window.location.href = $(this).find('div a').attr('href');
                });
            }
        });
    }
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// listview

// autocomplete
$('#tx-dlf-search-query').keypress(function () {
    console.log($("#tx-dlf-search-suggest ul li div")
        .text()
        .substr(0, 70) + " ...");
    $("#tx-dlf-search-suggest ul li div").text(
        $("#tx-dlf-search-suggest ul li div")
            .text()
            .substr(0, 70) + " ..."
    );
});


$(".tx-dlf-listview-list ol").hide();

$(".tx-dlf-listview-list ol").hide();

$(".tx-dlf-search-numHits").hide();


// show-volumes-expand
// show-volumes-minimize

$(".show-volumes").each(function () {
    if ($(this).parent().find("ol").length > 0) {
        $(this).show();
    }
});

$(".show-volumes").on("click", function (evt) {
    evt.preventDefault();

    $(this).children("a").toggleClass("down");
    $(this).parent().find("ol").toggle();

    if ($(this).children("a").text() == "Details einblenden") {
        $(this).children("a").text("Details ausblenden");
    } else {
        $(this).children("a").text("Details einblenden");
    }

});


// Detailview

// return to list link
if ($('.tx-dlf-navigation-listview a').length > 0) {
    $('.meta-actions #backlink').show();
    $('.meta-actions #backlink').attr( "href", $('.tx-dlf-navigation-listview a').attr("href"));
}

// $(".tx-dlf-metadata article.metadata-title span").attr("data-full", $(".tx-dlf-metadata article.metadata-title span").text());
//
// $(".tx-dlf-metadata article.metadata-title span").text(
//     $(".tx-dlf-metadata article.metadata-title span")
//         .text()
//         .substring(0, 70) + " ..."
// );

// collapse metadata
$(".tx-dlf-metadata .show-metadata").on("click", function (evt) {
    evt.preventDefault();

    $(this).children("a").toggleClass("down");
    $('.secondpart').toggle();

    if ($(this).children("a").text() == "Details einblenden") {
        $(this).children("a").text("Details ausblenden");
        $(".tx-dlf-metadata dd.tx-dlf-metadata-title").text(
            $(".tx-dlf-metadata dd.tx-dlf-metadata-title").attr("data-full")
        );
    } else {
        $(this).children("a").text("Details einblenden");
        $(".tx-dlf-metadata dd.tx-dlf-metadata-title").attr("data-full",
            $(".tx-dlf-metadata dd.tx-dlf-metadata-title")
                .text()
                .substring(0, 70) + " ..."
            );
    }

});

$(".tx-dlf-navigation-zoom-in").click(function() { tx_dlf_viewer.map.zoomIn(); });
$(".tx-dlf-navigation-zoom-out").click(function() { tx_dlf_viewer.map.zoomOut(); });

$(".tx-dlf-navigation-rotate-right a").click(function () {
    tx_dlf_viewer.map.rotate(90);
});
$(".tx-dlf-navigation-rotate-left a").click(function () {
    tx_dlf_viewer.map.rotate(-90);
});

$('.tx-dlf-navigation-double a, .tx-dlf-navigation-double span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-doublepage.svg" alt="Show double pages">');

$('.tx-dlf-navigation-double-plus a, .tx-dlf-navigation-double-plus span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-verso.svg" alt="Adjust recto/verso">');

$('.tx-dlf-navigation-zoom-in a, .tx-dlf-navigation-zoom-in span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-zoomin.svg" alt="Zoom In">');

$('.tx-dlf-navigation-zoom-out a, .tx-dlf-navigation-zoom-out span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-zoomout.svg" alt="Zoom Out">');

$('.tx-dlf-navigation-rotate-left a, .tx-dlf-navigation-rotate-left span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-rotateleft.svg" alt="Rotate Left">');

$('.tx-dlf-navigation-rotate-right a, .tx-dlf-navigation-rotate-right span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-rotateright.svg" alt="Rotate Right">');

$('.tx-dlf-navigation-first a, .tx-dlf-navigation-first span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-skipleft.svg" alt="First Page">');

$('.tx-dlf-navigation-prev a, .tx-dlf-navigation-prev span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-doubleleft.svg" alt="Back 5 Pages">');

$('.tx-dlf-navigation-back a, .tx-dlf-navigation-back span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-singleleft.svg" alt="Previous Page">');

$('.tx-dlf-navigation-next a, .tx-dlf-navigation-next span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-singleright.svg" alt="Next Page">');

$('.tx-dlf-navigation-fwd a, .tx-dlf-navigation-fwd span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-doubleright.svg" alt="Forward 5 Pages">');

$('.tx-dlf-navigation-last a, .tx-dlf-navigation-last span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-skipright.svg" alt="Last Page">');

$('.tx-dlf-navigation-listview a, .tx-dlf-navigation-listview span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-skipright.svg" alt="Zurück zur Liste">');

$('.tx-dlf-navigation-listview a, .tx-dlf-navigation-listview span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-skipright.svg" alt="Last Page">');


if ($('.tx-dlf-navigation-edit').length) {
    $('ul.tx-dlf-navigation').append('<li class="tx-dlf-navigation-edit">' + $('.tx-dlf-navigation-edit').html() + '</li>');
} else {
    $('ul.tx-dlf-navigation').append('<li class="tx-dlf-navigation-edit"><span></span></li>');
}

if ($('.tx-dlf-navigation-editRemove').length) {
    $('ul.tx-dlf-navigation').append('<li class="tx-dlf-navigation-editRemove" style="padding-left: 4px;">' + $('.tx-dlf-navigation-editRemove').html() + '</li>');
} else {
    $('ul.tx-dlf-navigation').append('<li class="tx-dlf-navigation-editRemove" style="padding-left: 4px;"><span></span></li>');
}

if ($('.tx-dlf-navigation-magnifier').length) {
    $('ul.tx-dlf-navigation').append('<li class="tx-dlf-navigation-magnifier" style="padding-left: 4px;">' + $('.tx-dlf-navigation-magnifier').html() + '</li>');
} else {
    $('ul.tx-dlf-navigation').append('<li class="tx-dlf-navigation-magnifier" style="padding-left: 4px;"><span></span></li>');
}




$('.tx-dlf-navigation-edit a, .tx-dlf-navigation-edit span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-selection.svg" alt="Ausschnitt auswählen">');

$('.tx-dlf-navigation-editRemove a, .tx-dlf-navigation-editRemove span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-selection-x.svg" alt="Ausschnitt entfernen">');

$('.tx-dlf-navigation-magnifier a, .tx-dlf-navigation-magnifier span')
    .text("")
    .append('<img src="../../typo3conf/ext/presentation_package/Resources/Public/Images/icon-magnifying.svg" alt="Lupe">');


$('div.tx-dlf-navigation-edit').hide();
$('div.tx-dlf-navigation-editRemove').hide();
$('div.tx-dlf-navigation-magnifier').hide();

$(document).ready(function() {
    setBackToListviewInBreadcrumb();
    initialFacetValueRestriction();
    setTitleOnDetailPage();
    shortenDescription();
    addLicenseIcon();
});

function shortenDescription() {
    // all short descriptions
    // $('p.short').each(function () {
    //     shortenText($(this));
    // });
    //
    // $('p.long').each(function () {
    //     shortenText($(this));
    // });
    $('.tx-dlf-collection-description').each(function() {
       shortenText($(this));
    });
    showMoreClickHandler();
}

function showMoreClickHandler() {
    $('.description-show-more').on('click', function (evt) {
        evt.preventDefault();
        $(this).parent().siblings('.tx-dlf-collection-description').toggleClass('shorten-text-4');
        if ($(this).text() == 'mehr...') {
            $(this).text('weniger...');
            $(this).toggleClass('show-less');
        } else {
            $(this).text('mehr...');
            $(this).toggleClass('show-less');
        }
    });
}

function shortenText(element) {
    if ($(element).text().length > 100) {
        $(element).addClass('shorten-text-4');
        $('<p><a href="#" class="description-show-more">mehr...</a></p>').insertAfter($(element));
    }

}

function initialFacetValueRestriction() {
    // $('.tx-dlf-search-facets ul').each(function () {
    //     if ($(this).children("li").length != 0 && $(this).children("li").length > 5) {
    //         $($(this).children("li")[4]).nextAll().hide();
    //         $(this).append('<li><a class="facetShowMore" href="#">Mehr ...</a></li>');
    //         $(this).append('<li><a class="facetShowLess" href="#">Weniger ...</a></li>');
    //         $(this).find('li a.facetShowLess').parent().hide();
    //     }
    // });
    $('.facetShowMore').on("click", function (event) {
        event.preventDefault();
        $(this).parent().parent().children("li").show();
        $(this).parent().hide();
        $(this).parent().parent().find('.facetShowLess').parent().show();
    });

    $('.facetShowLess').on("click", function (event) {
        event.preventDefault();
        $($(this).parent().parent().children("li")[4]).nextAll().hide();
        $(this).parent().hide();
        $(this).parent().parent().find('.facetShowMore').parent().show();
    });
}

function setTitleOnDetailPage() {
    var title = '';
    title = $('.tx-dlf-metadata article.metadata-title ul.metadata-values').text();

    // use class add2title to add metadata to title
    // default separator is "-" for a custom separator the data attribute "data-separator" can be used
    $('.tx-dlf-metadata dd.add2title').each(function () {
        if ($(this).data('separator')) {
            title = title + ' ' + $(this).data('separator') + ' ' + $(this).text();
        } else {
            title = title + ' - ' + $(this).text();
        }
    });

    $('.detail-view-header dd.tx-dlf-metadata-title').text(title);
}

function setBackToListviewInBreadcrumb() {
    $('#backtolistview a').attr("href", $('li.tx-dlf-navigation-backtolist a').attr("href"));
}

function addLicenseIcon() {
    if ($('.license-url ul li').length > 0) {
        var link = $('.license-url ul li').text();
        var res = link.split("/");

        // remove empty strings
        res = res.filter(String);

        var category = res[res.length - 4].substring(0,1);
        var shortName = res[res.length - 3];
        var version = res[res.length - 2];

        // http://i.creativecommons.org/p/zero/1.0/88x31.png
        // https://creativecommons.org/licenses/by-nc-sa/4.0/
        // http://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png

        var icon = 'https://i.creativecommons.org/' + category + '/' + shortName + '/' + version + '/88x31.png';

        $('.license_label_value').prepend('<a href="' + link + '"><img src="' + icon + '"/></a>');
    }
}