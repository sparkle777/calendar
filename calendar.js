var currentYear = 2014;
var currentMonth = 9;
var calendarList;

window.onload = function() {
	initialCalendar();
}

function initialCalendar() {
	var length;
	var left_pos;
	var top_pos;
	var calendarItem;
	var firstDayOfCurrentMonth;
	var startWeekDay; // what day is it the first day of current month 
	var startDate; // the date should be show at the first item
	var daysOfCurrentMonth;
	var currentFlag = false;

	top_pos = -50;

	calendarList = document.getElementsByTagName("li");
	length = calendarList.length;

	for (var count = 0; count < length; count++) {
		if (count % 7 == 0) {
			left_pos = 0;
			top_pos += 50;
		}

		calendarItem = calendarList[count];
		calendarItem.appendChild(document.createTextNode(""));

		calendarItem.style.left = left_pos + "px";
		calendarItem.style.top = top_pos + "px";

		left_pos += 100;
	}

	firstDayOfCurrentMonth = new Date(currentYear, currentMonth-1, 1);
	startWeekDay = firstDayOfCurrentMonth.getDay();
	if (startWeekDay != 7) {
		daysOfCurrentMonth = (new Date(currentYear, currentMonth-2, 0)).getDate();
		startDate = daysOfCurrentMonth - startWeekDay + 1;
	}
	else {
		daysOfCurrentMonth = (new Date(currentYear, currentMonth-1, 0)).getDate();
		startDate = 1;
	}

	for (var count = 7; count < length; count++) {
		calendarItem = calendarList[count];
		calendarItem.firstChild.nodeValue = startDate;
		startDate++;
		if (startDate > daysOfCurrentMonth) {
			startDate = 1;
			daysOfCurrentMonth = (new Date(currentYear, currentMonth, 0)).getDate();
		} 
	}	
}










