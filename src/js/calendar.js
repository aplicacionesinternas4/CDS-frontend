function daysInMonth(month,year) {
	
	month=parseInt(month)+1;
   	return new Date(year, month, 0).getDate();
}
function initialDay(month,year) {
   	return new Date(year,month,1).getDay();
}
function finalDay(month,year,day) {
   	return new Date(year,month,day).getDay();
}
function selectDate(){
	var d = new Date();
	var month = d.getMonth();
	var year  = d.getFullYear();
	var names = ["Enero", "Febrero", "Marzo","Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre","Octubre", "Noviembre", "Diciembre"];
	//var content = $('#dropdown-year').text();
     //var value = $('#dropdown-year').attr('value');
     var contentParent = $('#dropdown-year').closest('.dropdown');
     contentParent.find('.dropdown-text').text(year);

     var contentParent2 = $('#dropdown-month').closest('.dropdown');
     contentParent2.find('.dropdown-text').text(names[month]).attr('value', month);

     var listCities = document.getElementById("ciudades").innerHTML;
     var cities = getCities();
     listCities=listCities+cities.responseText;
     document.getElementById("ciudades").innerHTML=listCities;
     myReady();
     buildCalendar();

}
function getCities(){
	return $.ajax({
		'async':false,
	  //The URL to process the request
	    'url' : 'cities-calendar.php',
	  //The type of request, also known as the "method" in HTML forms
	  //Can be 'GET' or 'POST'
	    'type' : 'GET',
	  //Any post-data/get-data parameters
	  //This is optional
	    'data' : {
	      
	    },
	  //The response from the server
	    'success' : function(data) {
	    }
    });
}

function buildCalendar(){

	
	document.getElementById("calendar-content-id").innerHTML='<li id="column-1" class="column"><ul class="list-unstyled" id="c1"></ul></li><li id="column-2" class="column"><ul class="list-unstyled" id="c2"></ul></li><li id="column-3" class="column"><ul class="list-unstyled" id="c3"></ul></li>';
	
	var month=document.getElementById('dropdown-month').getAttribute("value");
	var year=document.getElementById('dropdown-year').innerHTML;
	var city=document.getElementById('dropdown-cities').getAttribute("value");

	var chkEvents = document.getElementById("checkbox-1-1");
	var chkCap = document.getElementById("checkbox-1-2");
	
	var numberDays = daysInMonth(month,year);
	var initDay = initialDay(month,year);

	var finDay=finalDay(month,year,numberDays);

	

	
	if(initDay==0)
		var empty = 6;
	else
		var empty = initDay-1;

	if(finDay==0)
		var empty2 = 0;
	else
		var empty2 = 7-finDay;																

	
	var items = document.getElementById("calendar-content-id").innerHTML;
	

	for (var i = 0; i < empty; i++) {
		items=items+"<li></li>";
	}
	
	
	var data = getEvents(numberDays,month,year,city,chkEvents.checked,chkCap.checked);
	data.responseText = data.responseText.trim();
		 	
	items = items + data.responseText;
   
	
	for (var i = 0; i < empty2; i++) {
		items=items+"<li></li>";
	}

	document.getElementById("calendar-content-id").innerHTML=items;
	
	activeDay();


}

function checkbox(){
	//alert('aaa');
	buildCalendar();
	columns();

}

function getEvents(numDays,month,year,city,eventos,capacitaciones){
	
	return $.ajax({
		'async':false,
	  //The URL to process the request
	    'url' : 'event-calendar.php',
	  //The type of request, also known as the "method" in HTML forms
	  //Can be 'GET' or 'POST'
	    'type' : 'GET',
	  //Any post-data/get-data parameters
	  //This is optional
	    'data' : {
	      'numdias' : numDays,
	      'mes' : month,
	      'ano' : year,
	      'ciudad' : city,
	      'eventos' : eventos,
	      'capacitaciones' : capacitaciones
	    },
	  //The response from the server
	    'success' : function(data) {
	    }
    });
	
}