const main = document.querySelector('section .main');
const monthName = document.querySelector('.month-Name');
const yearInput = document.querySelector('.year-Name input');
const section = document.querySelector('section');
const changeBtn = document.querySelector('.change');
const valid = document.querySelector('.valid');


//New Date from date Object
const date = new Date();
const today = date.getDate();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth() - date.getMonth();


//Array of months
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Name of days
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  
const load = () => {
  yearInput.value = currentYear;
  
  const month = document.createElement('div');
  month.className = 'month';
  const monthName = document.createElement('h2');
  monthName.className = 'month-Name';
  const week = document.createElement('div');
  week.className = 'days';
  const number = document.createElement('div');
  number.className = 'number';
  
  
  //Last date of previous month
  const lastDateOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
  
  //last days of Previous month
  const remainingDaysOfPreviousMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  //Last Date of current month
  const lastDateOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  //frist days of next month
  const fristDaysOfNextMonth = new Date(currentYear, currentMonth, lastDateOfCurrentMonth).getDay();
  
  //set month Name
  months.forEach((month, index) => {
    if (index == currentMonth) {
      monthName.innerText = month;
    };
  });
  
  //Last days of last month
  for (let i = remainingDaysOfPreviousMonth;i>0; i--) {
    const span = document.createElement('span');
    span.className = 'prev';
    span.innerText = lastDateOfPreviousMonth - i + 1;
    number.append(span)
  };
  
  //fetch week days 
  for (let i=0;i<days.length;i++) {
    const span = document.createElement('span');
    span.innerText = days[i];
    week.append(span)
  };
  
  //Fetch 1 to 30 days
  for (let i =1; i <= lastDateOfCurrentMonth; i++) {
    const span = document.createElement('span');
    span.innerText = i;
    number.append(span)
  };
  
  //fetch frist days of next month
  for (let i = fristDaysOfNextMonth; i < 6; i++) {
    const span = document.createElement('span');
    span.className = 'next';
    span.innerText = i - fristDaysOfNextMonth + 1;
    number.appendChild(span);
  };
  
  //Appending EachOther
  month.append(monthName, week, number);
  main.append(month);
  
};


//Fetch all months of Year
const allMonths = () => {
  if (main.childElementCount >= 12) {
    main.innerHTML = '';
  };
  
  //Loading All Months
  for (let i = 0; i < months.length; i++) {
    currentMonth = i;
    load();
  };
  
};
allMonths();


//Get And highlight Today s Date
const highlightToday = () => {
  if (date.getFullYear() != currentYear) {
    return;
  };
  
  const current = document.querySelectorAll('.month');
  //Add a class to current month
  current.forEach((month, index) => {
    if (index == date.getMonth()) {
      month.classList.add('current');
    };
  });
  
  //make a circle on currrent month curent date
  const days = document.querySelectorAll('.current span');
  days.forEach(day => {
    if (day.innerText == today) {
      day.className = 'today';
    };
  });
  
};
highlightToday()



const pageScroll = () => {
  
  if (currentYear != date.getFullYear()) {
    return;
    //Return Here if not current Year
  };
  
  //Scroll page to Current Month
  switch (date.getMonth()) {
      case 0:
        section.scrollTop = 0;
        break;
      case 1:
        section.scrollTop = 310;
        break;
      case 2:
        section.scrollTop = 612;
        break;
      case 3:
        section.scrollTop = 915;
        break;
      case 4:
        section.scrollTop = 1256;
        break;
      case 5:
        section.scrollTop = 1558;
        break;
      case 6:
        section.scrollTop = 1861;
        break;
      case 7:
        section.scrollTop = 2200;
        break;
      case 8:
        section.scrollTop = 2503;
        break;
      case 9:
        section.scrollTop = 2805;
        break;
      case 10:
        section.scrollTop = 3108;
        break;
      case 11:
        section.scrollTop = 3323;
        break;
  };
  
};
//Scroll page on Current Month
window.addEventListener('load', pageScroll);


//Change Year Function
const addYear = (e) => {
  const clas = e.target.innerText;
  //Prevent input
  if (yearInput.value.length > 4 ||   yearInput.value < 1970 ||
      yearInput.value > 2050) {
      return;
  };
  
  //Change Year
  if (clas !== 'Enter') {
    yearInput.removeAttribute('readonly');
    yearInput.style.border = '1px solid black';
    yearInput.focus()
    changeBtn.innerText = 'Enter';
  }else {
    changeBtn.innerText = 'Change';
    currentYear = yearInput.value;
    yearInput.blur();
    yearInput.style.border = null;
    yearInput.setAttribute('readonly', 'readonly');
    allMonths();
    //Check input value its current Year or Not
    if (yearInput.value != date.getFullYear()) {
      section.scrollTop = 0;
    }else {
      pageScroll();
      highlightToday();
    };
    
  };
  
};
changeBtn.addEventListener('click', addYear);


//Some Validation
const validate = (event) => {
  const value = event.target.value;
  
  if (value.length > 4) {
    yearInput.style.border = '1px solid red';
    valid.style.display = 'block';
  } else {
    valid.style.display = 'none';
    yearInput.style.border = '1px solid black';
  };
  
};
yearInput.addEventListener('input', validate);

//Kshapii