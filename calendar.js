var currentYear;
var currentMonth;
var calendarList;

window.onload = function() {
	var now = new Date();

	currentYear = now.getFullYear();
	currentMonth = now.getMonth();
	initialCalendar();
	showTime();
}

function initialCalendar() {
	var calendarLength;
	var headLength;
	var left_pos;
	var top_pos;
	var calendarItem;
	var headList;
	var headItem;

	left_pos = 0;
	top_pos = 0;

	calendarList = document.getElementsByTagName("li");
	calendarLength = calendarList.length;
	headList = document.getElementById("head").getElementsByTagName("div");
	headLength = headList.length;

	// 初始化日历的排列
	for (var count = 0; count < headLength; count++) {
		headItem = headList[count];
		headItem.style.left = left_pos + "px";
		headItem.style.top = top_pos + "px";

		left_pos += 150;
	}

	left_pos = 0;
	top_pos = -50;

	for (var count = 0; count < calendarLength; count++) {
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
	// 显示日历项的日期
	initialCalendarItem();
}

function initialCalendarItem() {
	var firstDayOfCurrentMonth;
	var startWeekDay; // what day is it the first day of current month 
	var startDate; // the date should be show at the first item
	var daysOfCurrentMonth;

	length = calendarList.length;
	firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);
	startWeekDay = firstDayOfCurrentMonth.getDay();
	if (startWeekDay != 7) {
		daysOfCurrentMonth = (new Date(currentYear, currentMonth-1, 0)).getDate();
		startDate = daysOfCurrentMonth - startWeekDay + 1;
	}
	else {
		daysOfCurrentMonth = (new Date(currentYear, currentMonth, 0)).getDate();
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

function showTime() {
	var now;
	var timerId;
	var timesDom;

	timesDom = document.getElementById("times");
	timesDom.appendChild(document.createTextNode(""));
	timerId = setInterval(function() {
		now = new Date();
		timesDom.firstChild.nodeValue = "北京时间: " + now.getHours() + " : " + now.getMinutes() + " : " + now.getSeconds();
	}, 1000);
}









