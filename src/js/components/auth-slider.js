const authButtons = document.querySelectorAll('.auth-form__bottom-btn');
const authBackButton = document.querySelector('.auth-form__back');
const authForms = document.querySelectorAll('form');

// forms
// const registrationForm = document.querySelector('#registration-form');
// const authorizationForm = document.querySelector('#authorization-form');
// const retrievalForm = document.querySelector('#retrieval-form');

// if (authForms.length) {
//   let authFormsCounter = 0;

//   function changeForms() {
//     if (authFormsCounter > 0) {
//       authBackButton.classList.add('active');
//     } else {
//       authBackButton.classList.remove('active');
//     }

//     authForms.forEach(form => form.classList.remove('active'));

//     authForms[authFormsCounter].classList.add('active');
//   }

//   authButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       if (authFormsCounter < authForms.length) {
//         authFormsCounter++;

//         changeForms();
//       }
//     });
//   });

//   authBackButton.addEventListener('click', () => {
//     if (authFormsCounter > 0) {
//       authFormsCounter--;
//       changeForms();
//     }
//   })
// }
