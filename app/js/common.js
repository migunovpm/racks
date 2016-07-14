$(function() {

	window.onload= function() {
	document.getElementById('toggler').onclick = function() {
		openbox('city_wrap', this);
		return false;
	};
};
function openbox(id, toggler) {
	var div = document.getElementById(id);
	if(div.style.display == 'block') {
		div.style.display = 'none';
		toggler.innerHTML = 'Открыть весь список городов';
	}
	else {
		div.style.display = 'block';
		toggler.innerHTML = 'Закрыть весь список городов';
	}
}


	$.stellar({
		responsive: true,
		horizontalOffset: 60
	});

	$(".carousel").owlCarousel({
		loop : true,
		responsive : {
			0 : {
				items:1,
				nav:true
			}
		},
		navText : ""
	});

	$(".top_phone .tab_item").not(":first").hide();
	$(".top_phone .wrap_tabs .tab").click(function() {
		$(".top_phone .wrap_tabs .tab").removeClass("active").eq($(this).index()).addClass("active");
		$(".top_phone .tab_item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("active");

		$(".bottom_phone .tab_item").not(":first").hide();
	$(".bottom_phone .wrap_tabs .tab").click(function() {
		$(".bottom_phone .wrap_tabs .tab").removeClass("active").eq($(this).index()).addClass("active");
		$(".bottom_phone .tab_item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("active");

	$(".tabs_header .tab_item").not(":first").hide();
	$(".tabs_header .wrap_tabs .tab").click(function() {
		$(".tabs_header .wrap_tabs .tab").removeClass("active").eq($(this).index()).addClass("active");
		$(".tabs_header .tab_item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("active");


	$(".contacts_top .tab").click(function() {
		$(".contacts_top .tab").removeClass("active").eq($(this).index()).addClass("active");
		$(".s_contacts .tab_item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("active");

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});


$(document).ready(function() {

$('#open-close').show();
$('#block-links').hide();

$('#open-close').click(function(event) {
  event.preventDefault(); // Для того чтобы при нажатии на ссылку не кидало вверх
  $('#block-links').slideToggle();
});

// Плавный скролл по якорям
$('a[href^="#"]').on('click', function(e){
        e.preventDefault();

        var
          $this = $(this),
          target = $this.attr('href'),
          strip = target.slice(1),
          anchor = $("[id='"+ strip +"']");

        $('html, body').animate({
                scrollTop: anchor.offset().top
        }, 1000);
 });

	$(".popup_c").magnificPopup();

//Цели для Яндекс.Метрики и Google Analytics
$(".count_element").on("click", (function() {
	ga("send", "event", "goal", "goal");
	yaCounterXXXXXXXX.reachGoal("goal");
	return true;
}));

//SVG Fallback
if(!Modernizr.svg) {
	$("img[src*='svg']").attr("src", function() {
		return $(this).attr("src").replace(".svg", ".png");
	});
};

});

document.getElementById('feedback-form').addEventListener('submit', function(evt){
  var http = new XMLHttpRequest(), f = this;
  evt.preventDefault();
  http.open("POST", "contacts.php", true);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.send("nameFF=" + f.nameFF.value + "&contactFF=" + f.contactFF.value + "&messageFF=" + f.messageFF.value);
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      alert(http.responseText + ', Ваше сообщение получено.\nНаши специалисты ответят Вам в ближайшее время!');
      f.nameFF.removeAttribute('value'); // очистить поле сообщения (две строки)
      f.nameFF.value='';
      f.contactFF.removeAttribute('value'); // очистить поле сообщения (две строки)
      f.contactFF.value='';
      f.messageFF.removeAttribute('value'); // очистить поле сообщения (две строки)
      f.messageFF.value='';
    }
  }
  http.onerror = function() {
    alert('Извините, данные не были переданы');
  }
}, false);

document.getElementById('feedb-form').addEventListener('submit', function(evt){
  var http = new XMLHttpRequest(), f = this;
  evt.preventDefault();
  http.open("POST", "contacts.php", true);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.send("nameFF=" + f.nameFF.value + "&contactFF=" + f.contactFF.value + "&messageFF=" + f.messageFF.value);
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
    	var magnificPopup = $.magnificPopup.instance;
    	magnificPopup.close();
      alert(http.responseText + ', Ваше сообщение получено.\nНаши специалисты ответят Вам в ближайшее время!');
      f.nameFF.removeAttribute('value'); // очистить поле сообщения (две строки)
      f.nameFF.value='';
      f.contactFF.removeAttribute('value'); // очистить поле сообщения (две строки)
      f.contactFF.value='';
      f.messageFF.removeAttribute('value'); // очистить поле сообщения (две строки)
      f.messageFF.value='';
    }
  }
  http.onerror = function() {
    alert('Извините, данные не были переданы');
  }
}, false);

document.getElementById('feedbk-form').addEventListener('submit', function(evt){
  var http = new XMLHttpRequest(), f = this;
  evt.preventDefault();
  http.open("POST", "contacts.php", true);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.send("nameFF=" + f.nameFF.value + "&contactFF=" + f.contactFF.value + "&messageFF=" + f.messageFF.value);
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
    	var magnificPopup = $.magnificPopup.instance;
    	magnificPopup.close();
      alert(http.responseText + ', Ваше сообщение получено.\nНаши специалисты ответят Вам в ближайшее время!');
      f.nameFF.removeAttribute('value'); // очистить поле сообщения (две строки)
      f.nameFF.value='';
      f.contactFF.removeAttribute('value'); // очистить поле сообщения (две строки)
      f.contactFF.value='';
      f.messageFF.removeAttribute('value'); // очистить поле сообщения (две строки)
      f.messageFF.value='';
    }
  }
  http.onerror = function() {
    alert('Извините, данные не были переданы');
  }
}, false);