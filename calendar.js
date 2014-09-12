var currentYear;
var currentMonth;
var calendarList;
var selectedYear;
var selectedMonth;


window.onload = function() {
	var now = new Date();

	currentYear = now.getFullYear();
	currentMonth = now.getMonth(); //0表示1月，11表示12月
	initialCalendar();
	showTime();
}

function initialCalendar() {
	var headLength;
	var left_pos;
	var top_pos;
	var headList;
	var headItem;
	var startYear;
	var endYear;
	var returnToday;

	left_pos = 0;
	top_pos = 0;

	headList = document.getElementsByClassName("headItem");
	headLength = headList.length;

	// 初始化日历的头部
	for (var count = 0; count < headLength; count++) {
		headItem = headList[count];
		headItem.style.left = left_pos + "px";
		headItem.style.top = top_pos + "px";

		left_pos += 150;
	}

	// 初始化年份下拉框
	startYear = currentYear - 100;
	endYear = currentYear + 100;
	selectedYear = document.getElementById("years");
	for (var year = startYear; year < endYear; year++) {
		selectedYear.options.add(new Option(year, year))
	}
	selectedYear.options[selectedYear.options.length-100].selected = "selected";

	//初始化月份下拉框
	selectedMonth = document.getElementById("months");
	for (var month = 1; month < 13; month++) {
		selectedMonth.options.add(new Option(month, month));
		if (month == currentMonth+1)
			selectedMonth.options[month-1].selected = "selected";
	}

	initialCalendarItem();

	// 添加event监听器
	returnToday = document.getElementById("today");
	returnToday.addEventListener("click", backToToday);
}

// 初始化日历项
function initialCalendarItem() {
	var calendarLength;
	var calendarItem;
	var left_pos;
	var top_pos;

	calendarList = document.getElementsByTagName("li");
	calendarLength = calendarList.length;

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

	showCalendarItem();
}

// 显示日历项
function showCalendarItem() {
	var firstDateOfCurrentMonth;
	var startWeekDay; // what day is it the first day of current month 
	var startDate; // the date should be show at the first item
	var daysOfCurrentMonth;

	length = calendarList.length;
	firstDateOfCurrentMonth = new Date(currentYear, currentMonth, 1);
	startWeekDay = firstDateOfCurrentMonth.getDay();
	if (startWeekDay != 0) {
		daysOfCurrentMonth = (new Date(currentYear, currentMonth, 0)).getDate();
		startDate = daysOfCurrentMonth - startWeekDay + 1;
	}
	else {
		daysOfCurrentMonth = (new Date(currentYear, currentMonth+1, 0)).getDate();
		startDate = 1;
	}

	for (var count = 7; count < length; count++) {
		calendarItem = calendarList[count];
		calendarItem.firstChild.nodeValue = startDate;
		startDate++;
		if (startDate > daysOfCurrentMonth) {
			startDate = 1;
			daysOfCurrentMonth = (new Date(currentYear, currentMonth+1, 0)).getDate();
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

function changeYear() {
	var selectedIndex;
	selectedIndex = selectedYear.selectedIndex;
	currentYear = selectedYear.options[selectedIndex].value; 
	showCalendarItem();
}

function changeMonth() {
	var selectedIndex;
	selectedIndex = selectedMonth.selectedIndex;
	currentMonth = selectedMonth.options[selectedIndex].value; 
	currentMonth -= 1;
	showCalendarItem();
}

function backToToday() {
	var now = new Date();

	currentYear = now.getFullYear();
	currentMonth = now.getMonth(); //0表示1月，11表示12月

	showCalendarItem();
}





