var modal = document.getElementById('create-goal-modal');
var modalBackdrop = document.getElementById('modal-backdrop');
var modalButton = document.getElementById('create-goal-button');
var modalCloseButton = document.getElementsByClassName('modal-close-button')[0];
var modalCancelButton = document.getElementsByClassName('modal-cancel-button')[0];
var modalCreateButton = document.getElementsByClassName('modal-accept-button')[0];
var goals = document.getElementsByClassName('goals-container');

modalButton.addEventListener('click', openModal);
modalCloseButton.addEventListener('click', closeModal);
modalCancelButton.addEventListener('click', closeModal);
modalCreateButton.addEventListener('click', createNewGoal);

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
