// ADD OUT CLASS
$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 700) {
        $('.upload-button').addClass('visible')
    } else {
        $('.upload-button').removeClass('visible')
    }

    if (scroll >= 105) {
        $('.calendar .calendar-actions').addClass('top-fixed');
    } else {
        $('.calendar .calendar-actions').removeClass('top-fixed');
    }

});

$(document).ready(function() {

  $('.carousel').carousel({
    wrap: false
  })

    if ($(window).width() > 767) {
        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() -15) {
                $('.upload-button').css('bottom','46px');
            } else {
                $('.upload-button').css('bottom','0');
            }
        });
    }

    // LARGER SCREEN 970
    if ($(window).width() > 992) {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 43) {
                $('header').addClass('small');
            } else {
                $('header').removeClass('small');
            }
        });

        // EVENT LARGEST ELEMENT
        var maxHeight = -1;

        $('.event .cont-event').each(function() {
          maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
        });

        $('.event .cont-gen').each(function() {
          $(this).height(maxHeight+24);
        });

    }

    // MAIN SLIDER
    $("#main-slide").owlCarousel({
        navigation : false,
        stopOnHover: true,
        slideSpeed : 300,
        singleItem: true,
        mouseDrag: false,
        mouseDrag : true,
        touchDrag : true,
        autoPlay: 10000
    });

    // MAP FUNCTION
    $('#colombia .map .location').click(function() {
        $('#colombia .map').addClass('move-left');
        $('#colombia .map .active').removeClass('active');
        $(this).toggleClass('active');
    });
    // BARRANQUILLA
    $('.barranquilla .location').click(function() {
        $('#colombia .city-info > div').addClass('hidden');
        $('.city-info .barranquilla-info').removeClass('hidden');
    });
    // VALLEDUPAR
    $('.valledupar .location').click(function() {
        $('#colombia .city-info > div').addClass('hidden');
        $('.city-info .valledupar-info').removeClass('hidden');
    });
    // MONTERIA
    $('.monteria .location').click(function() {
        $('#colombia .city-info > div').addClass('hidden');
        $('.city-info .monteria-info').removeClass('hidden');
    });
    // MEDELLIN
    $('.medellin .location').click(function() {
        $('#colombia .city-info > div').addClass('hidden');
        $('.city-info .medellin-info').removeClass('hidden');
    });
    // BUCARAMANGA
    $('.bucaramanga .location').click(function() {
        $('#colombia .city-info > div').addClass('hidden');
        $('.city-info .bucaramanga-info').removeClass('hidden');
    });
    // TUNJA
    $('.tunja .location').click(function() {
        $('#colombia .city-info > div').addClass('hidden');
        $('.city-info .tunja-info').removeClass('hidden');
    });
    // BOGOTA
    $('.bogota .location').click(function() {
        $('#colombia .city-info > div').addClass('hidden');
        $('.city-info .bogota-info').removeClass('hidden');
    });
    // VILLAVICENCIO
    $('.villavicencio .location').click(function() {
        $('#colombia .city-info > div').addClass('hidden');
        $('.city-info .villavicencio-info').removeClass('hidden');
    });
    // CALI
    $('.cali .location').click(function() {
        $('#colombia .city-info > div').addClass('hidden');
        $('.city-info .cali-info').removeClass('hidden');
    });

    //CHANGE LOCATION IN BOGOTA
    $('#colombia #sede2').click(function() {
        $(this).addClass('active');
        $('#sede1').removeClass('active');
        $('.sede1').addClass('hidden');
        $('.sede2').removeClass('hidden');
        $('.change').text('Centro de capacitación');
        $('.bogota-info img').addClass('hidden');
    });
    $('#colombia #sede1').click(function() {
        $(this).addClass('active');
        $('#sede2').removeClass('active');
        $('.sede2').addClass('hidden');
        $('.sede1').removeClass('hidden');
        $('.change').text('Sede principal');
        $('.bogota-info img').removeClass('hidden');
    });

    // FEATURED HEADER CHANGE OF CITY
    $('.featured-header .dropdown-menu a').click(function() {
        $('.featured-header .dropdown-menu a').removeClass('active');
        $(this).addClass('active');
        if ($('.calendar-container').hasClass('list')) {
          $('html, body').animate({scrollTop:536}, 'slow');
        }
    });
    $('.featured-header .dropdown-menu a').on('click', function () {
         var content = $(this).text();
        var value = $(this).attr('value');
        var contentParent = $(this).closest('.dropdown');
        contentParent.find('.dropdown-text').text(content).attr('value', value);

        buildCalendar();
    });

    // GO TO TOP
    $('.upload-button').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow')
    });
    $('.update-list .btn').click(function () {
        $('html, body').animate({scrollTop:$(document).height()}, 'slow');
        return false;
    });

    // SCROLL TO ANCHOR
    function scrollToAnchor(aid){
        var aTag = $("[name='"+ aid +"']");
        $('html,body').animate({scrollTop: aTag.offset().top+3},'slow');
    }

    $(".page-container a").on('click', function() {
       scrollToAnchor(this.id);
    });

    // CONTACT MODAL
    $('#contactoModal').ready(function() {
        $('.modal-body > div').removeClass('col-xs-6');
        $('.modal-body button').removeClass('pull-right');
        $('.modal-body .services-contact h2').text('Contacto');
        $('.modal-body .checkbox').hide();
    });

    // SIMULATION
    $('.info-right > ul a').click(function() {
        $('.cont-software.star').addClass('hidden');
    });

    $('#simulation-administrator-btn').click(function() {
        $('#simulation-administrator-div').removeClass('hidden');
    });
    $('#simulation-accounts-receivable-btn').click(function() {
        $('#simulation-accounts-receivable-div').removeClass('hidden');
    });
    $('#simulation-debts-to-pay-btn').click(function() {
        $('#simulation-debts-to-pay-div').removeClass('hidden');
    });
    $('#simulation-treasury-btn').click(function() {
        $('#simulation-treasury-div').removeClass('hidden');
    });
    $('#simulation-purchasing-management-btn').click(function() {
        $('#simulation-purchasing-management-div').removeClass('hidden');
    });
    $('#simulation-sales-management-btn').click(function() {
        $('#simulation-sales-management-div').removeClass('hidden');
    });
    $('#simulation-fixed-assets-btn').click(function() {
        $('#simulation-fixed-assets-div').removeClass('hidden');
    });
    $('#simulation-inventories-btn').click(function() {
        $('#simulation-inventories-div').removeClass('hidden');
    });
    $('#simulation-imports-btn').click(function() {
        $('#simulation-imports-div').removeClass('hidden');
    });
    $('#simulation-budgets-btn').click(function() {
        $('#simulation-budgets-div').removeClass('hidden');
    });
    $('#simulation-analysis-btn').click(function() {
        $('#simulation-analysis-div').removeClass('hidden');
    });
    $('#simulation-global-audit-btn').click(function() {
        $('#simulation-global-audit-div').removeClass('hidden');
    });
    $('#simulation-export-btn').click(function() {
        $('#simulation-export-div').removeClass('hidden');
    });

    $('#back-simulation-index').click(function() {
        $('.cont-software.star').removeClass('hidden');
        $('.info-admin').addClass('hidden');
    });

    // HOME CALENDAR
    $('.full-screen').click(function() {
        $('html, body').animate({scrollTop:0});
        $('body').addClass('calendar-full-screen');
        $('.calendar > h2').removeClass('hidden');
        $('.close-calendar-full-screen').removeClass('hidden');
        $('.full-screen').addClass('hidden');
        $('.list-button').addClass('hidden');
    });
    $('.close-calendar-full-screen').click(function() {
        $('html, body').animate({scrollTop:536});
        $('body').removeClass('calendar-full-screen');
        $('.calendar > h2').addClass('hidden');
        $('.close-calendar-full-screen').addClass('hidden');
        $('.full-screen').removeClass('hidden');
        $('.list-button').removeClass('hidden');
    });
    $('.list-button').click(function() {
        $('html, body').animate({scrollTop:102}, 'slow');
        $('.calendar-container').removeClass('tile').addClass('list');
        $('.tile-button').removeClass('hidden');
        $('.full-screen').addClass('hidden');
        $('.column').removeClass('hidden');
        $(this).addClass('hidden');
        columns();
    });
    $('.tile-button').click(function() {
        $('html, body').animate({scrollTop:102}, 'slow');
        $('.calendar-container').removeClass('list').addClass('tile');
        $('.full-screen').removeClass('hidden');
        $('.list-button').removeClass('hidden');
        $('.column').addClass('hidden');
        $(this).addClass('hidden');
    });
    $('.close-day').click(function() {
        $('html, body').animate({scrollTop:102}, 'slow');
        $('.active-day').removeClass('selected-day');
        $('.calendar-container').addClass('tile');
        $('.calendar').removeClass('thisDay');
        $('.full-screen, .list-button').removeClass('hidden');
        $('.close-day').addClass('hidden');
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

});

function myReady(){

  $('.featured-header .dropdown-menu a').click(function() {
        $('.featured-header .dropdown-menu a').removeClass('active');
        $(this).addClass('active');
    });
    $('.featured-header .dropdown-menu a').on('click', function () {
         var content = $(this).text();
        var value = $(this).attr('value');
        var contentParent = $(this).closest('.dropdown');
        contentParent.find('.dropdown-text').text(content).attr('value', value);

        buildCalendar();
        columns();
    });

}

function destroyCarousel(id) {
  var owl=$(id);
  if(owl.data('owlCarousel')!=null)
    owl.data('owlCarousel').destroy();
}


function activeDay(){

   $('.active-day > a').click(function() {

        $('html, body').animate({scrollTop:536}, 'slow');
        $(this).closest('.active-day').addClass('selected-day');
        $('.calendar-container').removeClass('tile');
        $('.calendar').addClass('thisDay');
        $('.full-screen, .list-button').addClass('hidden');
        $('.close-day').removeClass('hidden');
    });

}
function columns(){

  var activeDaysContent = $('#calendar-content-id .active-day').toArray();
   var activeDays = $('#calendar-content-id .active-day').length;
   var numItems = (activeDays)/3;
   var itemsResto = (activeDays)%3;
   var floor = Math.floor(numItems);
   var column1 =  document.getElementById("c1");
   var column2 =  document.getElementById("c2");
   var column3 =  document.getElementById("c3");


   var c1 = floor;
   var c2 = floor;
   var c3 = floor;

   if(itemsResto==1)
      c1++;
   if(itemsResto==2){
    c1++;
    c2++;
   }

   var j=0;

   var it ="";

  
   for (var i = 0; i < c1 ; i++) {
      var html = activeDaysContent[j].innerHTML;

      it = it + "<li>"+ html+ "</li>";
      j++;

   };

   column1.innerHTML = it;
   it="";
   for (var i = 0; i < c2 ; i++) {
      var html = activeDaysContent[j].innerHTML;
      it = it + "<li>"+ html+ "</li>";
      j++;
   };
   column2.innerHTML = it;
   it="";
   for (var i = 0; i < c3 ; i++) {
      var html = activeDaysContent[j].innerHTML;
      it = it + "<li>"+ html+ "</li>";
      j++;
   };
   
   column3.innerHTML = it;


}

