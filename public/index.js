var modal = document.getElementById('create-goal-modal');
var modal2 = document.getElementById('create-goal-modal2');
var modalBackdrop = document.getElementById('modal-backdrop');
var modalBackdrop2 = document.getElementById('modal-backdrop2');
var modalButton = document.getElementById('create-goal-button');
var modalCloseButton = document.getElementsByClassName('modal-close-button')[0];
var modalCloseButton2 = document.getElementsByClassName('modal-close-button2')[0];
var modalCancelButton = document.getElementsByClassName('modal-cancel-button')[0];
var modalCancelButton2 = document.getElementsByClassName('modal-cancel-button')[0];
var modalCreateButton = document.getElementsByClassName('modal-accept-button')[0];
var modalCreateButton2 = document.getElementsByClassName('modal-accept-button2')[0];
var goals = document.getElementsByClassName('goals-container');

modalButton.addEventListener('click', openModal);
modalCloseButton.addEventListener('click', closeModal);
modalCancelButton.addEventListener('click', closeModal);
modalCreateButton.addEventListener('click', createNewGoal);
modalCloseButton2.addEventListener('click', closeModal2);
modalCancelButton2.addEventListener('click', closeModal2);
modalCreateButton2.addEventListener('click', editGoal);
var goalSelected;

for(var i = 0; i < goals.length; i++) {
	goals[i].addEventListener('click', function(event) {
		goalSelected = event.target;
		selectedGoal(event.target);
	});
}


function editGoal() {
	var newGoal = document.getElementById('goal-text-input2').value;
	var newDate = document.getElementById('goal-attribution-input2').value;
	var newGoalBox = goalSelected.parentElement;
	newGoalBox.getElementsByClassName("goal-text")[0].innerText = newGoal;
	newGoalBox.getElementsByClassName("goal-date")[0].innerText = newDate;
	closeModal2();
}

function selectedGoal(event) {
	modalBackdrop.style.display = 'block';
	modal2.style.display = 'block';
	var goalText = document.getElementsByClassName("goal-text");
	var goalTextData = event.parentElement;
	var test = goalTextData.getElementsByClassName('goal-text')[0].innerText;
	var test2 = goalTextData.getElementsByClassName('goal-date')[0].innerText;
	document.getElementById('goal-text-input2').value = test;
	document.getElementById('goal-attribution-input2').value = test2;
}

function openModal() {
	modalBackdrop.style.display = 'block';
	modal.style.display = 'block';
}

function closeModal() {
	modalBackdrop.style.display = 'none';
	modal.style.display = 'none';
	document.getElementById('goal-attribution-input').value = "";
	document.getElementById('goal-text-input').value = "";
}

function closeModal2() {
	modalBackdrop.style.display = 'none';
	modal2.style.display = 'none';
	document.getElementById('goal-attribution-input2').value = "";
	document.getElementById('goal-text-input').value = "";
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
