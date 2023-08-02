import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const formKey = 'feed-back-form-data';

let formData = {
  email: '',
  message: '',
};

feedbackForm.email.addEventListener('input', throttle(updateFormState, 500));
feedbackForm.message.addEventListener('input', throttle(updateFormState, 500));
feedbackForm.addEventListener('submit', submitForm);

loadFormState();
updateFormState();

function updateFormState() {
  formData = {
    email: feedbackForm.email.value,
    message: feedbackForm.message.value,
  };

  localStorage.setItem(formKey, JSON.stringify(formData));
}

function loadFormState() {
  const savedFormData = JSON.parse(localStorage.getItem(formKey));
  if (savedFormData) {
    formData = savedFormData;
    feedbackForm.email.value = formData.email;
    feedbackForm.message.value = formData.message;
  }
}

function submitForm(event) {
  event.preventDefault();

  if (feedbackForm.email.value && feedbackForm.message.value) {
    feedbackForm.reset();
    localStorage.removeItem(formKey);
    console.log(formData);
    formData.email = '';
    formData.message = '';
  } else {
    alert('Увага! Всі поля форми мають бути заповнені!');
  }
}
