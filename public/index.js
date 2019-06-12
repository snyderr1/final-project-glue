var modal = document.getElementById('create-goal-modal');
var modalBackdrop = document.getElementById('modal-backdrop');
var modalButton = document.getElementById('create-goal-button');
var modalCloseButton = document.getElementsByClassName('modal-close-button')[0];
var modalCancelButton = document.getElementsByClassName('modal-cancel-button')[0];
var modalCreateButton = document.getElementsByClassName('modal-accept-button')[0];
var goals = document.getElementsByClassName('goals-container');
var editModal = document.getElementById('edit-goal-modal');
var editModalCloseButton = document.getElementsByClassName('modal-edit-close-button')[0];
var editModalDeleteButton = document.getElementsByClassName('modal-delete-button')[0];
var editModalEditButton = document.getElementsByClassName('modal-edit-button')[0];
var goalSelected;

var months = ["january", "february", "march", "april",	"may", "june", "july", "august", "september", "october", "november", "december"];

var goalArray = document.getElementsByClassName('goal-content');

console.log(goalArray);


for(var i = 0; i < goalArray.length; i++) {
	goalArray[i].addEventListener('click', function(event) {
		goalSelected = event.target;
		selectedGoal(event.target);
	});
}


function setMonth() {
	var calendar = document.getElementsByClassName('bottom-calendar')[0];
	var temp = new Date();
	var currentMonth = temp.getMonth();
	var days = getDays(currentMonth);
	var context = {
		date: 0
	}
	for(i = 0; i < days; i++) {
		context.date = i+1;
		if(temp.getDate() == context.date) {
			calendar.insertAdjacentHTML('beforeend', Handlebars.templates.date(context));
		} else {
			calendar.insertAdjacentHTML('beforeend', Handlebars.templates.day(context));
		}
	}
}

function checkMonth(str) {
	if(months.indexOf(str)==-1)  {
		console.log(str);
		return false;
	} else {
		return true;
	}
}
console.log(months.indexOf("June"));
function getDays(currentMonth) {
	var days;
	switch(currentMonth){
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			days = 31;
			break;
		case 3:
		case 5:
		case 8:
		case 10:
			days = 30;
			break;
		default:
			days = 28;
	}
	return days;
}

if(checkMonth(document.getElementById('site-title').textContent)) {
	setMonth();
} else {
	modalButton.addEventListener('click', openModal);
	modalCloseButton.addEventListener('click', closeModal);
	modalCancelButton.addEventListener('click', closeModal);
	modalCreateButton.addEventListener('click', createNewGoal);
	editModalCloseButton.addEventListener('click', closeEditModal);
	editModalEditButton.addEventListener('click', editGoal);
	editModalDeleteButton.addEventListener('click', deleteGoal);
}
function openModal() {
	modalBackdrop.style.display = 'block';
	modal.style.display = 'block';
	console.log(goals[0].goalDate.value);
}

function deleteGoal() {
	var goalBox = goalSelected.parentElement;
	var entireGoalBox = goalBox.parentElement;
	console.log(entireGoalBox);
	entireGoalBox.remove();
	goalSelected = null;
	closeEditModal();
}

function editGoal() {
	var newGoal = document.getElementById('goal-edit-text-input').value;
	var newDate = document.getElementById('goal-edit-attribution-input').value;
	var newGoalBox = goalSelected.parentElement;
	newGoalBox.getElementsByClassName("goal-text")[0].innerText = newGoal;
	newGoalBox.getElementsByClassName("goal-date")[0].innerText = newDate;
	goalSelected = null;
	closeEditModal();
}

function selectedGoal(event) {
	modalBackdrop.style.display = 'block';
	editModal.style.display = 'block';
	var goalTextData = event.parentElement;
	var goalText = goalTextData.getElementsByClassName('goal-text')[0].innerText;
	var dateText = goalTextData.getElementsByClassName('goal-date')[0].innerText;
	document.getElementById('goal-edit-text-input').value = goalText;
	document.getElementById('goal-edit-attribution-input').value = dateText;
}

function closeModal() {
	modalBackdrop.style.display = 'none';
	modal.style.display = 'none';
	document.getElementById('goal-attribution-input').value = "";
	document.getElementById('goal-text-input').value = "";
}

function closeEditModal() {
	modalBackdrop.style.display = 'none';
	editModal.style.display = 'none';
	document.getElementById('goal-edit-attribution-input').value = "";
	document.getElementById('goal-edit-text-input').value = "";
}

//end of modal functions//
function createNewGoal() {
	textInput = document.getElementById('goal-text-input').value;
	textDateInput = document.getElementById('goal-attribution-input').value;
	if(textInput === "" || textDateInput === "") {
		noInputAlert();
		openModal();
	}
	else {
		insertNewGoal();
	}
}

function noInputAlert() {
	console.log(goals.length);
	alert("Please enter all the necessary information before creating a goal");
}
//new twit functions//

function insertNewGoal() {
	var textInput = document.getElementById('goal-text-input').value;
	var textDateInput = document.getElementById('goal-attribution-input').value;

	var goals = document.getElementsByClassName('goals-container');
	var test = document.getElementsByClassName('goals-container').lastChild;
	let goalsArticle = document.createElement('article');
	goalsArticle.classList.add('goal');

	var goalContent = document.createElement('div');
	goalContent.classList.add('goal-content');
	goalsArticle.appendChild(goalContent);

	var goalText = document.createElement('p');
	goalText.classList.add('goal-text');
	goalText.textContent = textInput;
	goalContent.appendChild(goalText);

	var goalDate = document.createElement('p');
	goalDate.classList.add('goal-date');
	goalContent.appendChild(goalDate);

	var goalDateText = document.createElement('a');
	goalDateText.setAttribute("href", "#");
  goalDateText.textContent = textDateInput;
	goalDate.appendChild(goalDateText);

	goals[0].appendChild(goalsArticle);
	closeModal();
}
