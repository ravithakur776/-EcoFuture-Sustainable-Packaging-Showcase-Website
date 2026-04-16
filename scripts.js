document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success');

  if (!form) {
    return;
  }

  const fields = {
    firstName: {
      element: form.querySelector('#firstName'),
      validator: (value) => /^[A-Za-z\s]{2,}$/.test(value.trim()),
      message: 'Please enter at least 2 letters.'
    },
    lastName: {
      element: form.querySelector('#lastName'),
      validator: (value) => /^[A-Za-z\s]{2,}$/.test(value.trim()),
      message: 'Please enter at least 2 letters.'
    },
    username: {
      element: form.querySelector('#username'),
      validator: (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value.trim()),
      message: 'Use 3-20 characters: letters, numbers, underscore.'
    },
    city: {
      element: form.querySelector('#city'),
      validator: (value) => /^[A-Za-z\s]{2,}$/.test(value.trim()),
      message: 'Please enter a valid city name.'
    },
    state: {
      element: form.querySelector('#state'),
      validator: (value) => value.trim() !== '',
      message: 'Please choose a state.'
    },
    zip: {
      element: form.querySelector('#zip'),
      validator: (value) => /^\d{5,6}$/.test(value.trim()),
      message: 'Zip should be 5 or 6 digits.'
    }
  };

  const termsCheckbox = form.querySelector('#terms');

  const getErrorElement = (fieldElement) => {
    const formGroup = fieldElement.closest('.form-group');
    return formGroup ? formGroup.querySelector('.form-error') : null;
  };

  const showError = (fieldElement, message) => {
    const errorElement = getErrorElement(fieldElement);
    fieldElement.classList.add('input-invalid');
    if (errorElement) {
      errorElement.textContent = message;
    }
  };

  const clearError = (fieldElement) => {
    const errorElement = getErrorElement(fieldElement);
    fieldElement.classList.remove('input-invalid');
    if (errorElement) {
      errorElement.textContent = '';
    }
  };

  const validateField = (name) => {
    const config = fields[name];
    if (!config || !config.element) {
      return true;
    }

    const isValid = config.validator(config.element.value);
    if (!isValid) {
      showError(config.element, config.message);
      return false;
    }

    clearError(config.element);
    return true;
  };

  Object.keys(fields).forEach((name) => {
    const input = fields[name].element;
    if (!input) {
      return;
    }

    input.addEventListener('input', () => {
      validateField(name);
      if (successBanner) {
        successBanner.classList.remove('is-visible');
      }
    });
  });

  termsCheckbox?.addEventListener('change', () => {
    const termsError = form.querySelector('[data-error-for="terms"]');
    if (termsCheckbox.checked && termsError) {
      termsError.textContent = '';
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let formIsValid = true;

    Object.keys(fields).forEach((name) => {
      if (!validateField(name)) {
        formIsValid = false;
      }
    });

    const termsError = form.querySelector('[data-error-for="terms"]');
    if (!termsCheckbox?.checked) {
      formIsValid = false;
      if (termsError) {
        termsError.textContent = 'You must accept the terms to continue.';
      }
    } else if (termsError) {
      termsError.textContent = '';
    }

    if (!formIsValid) {
      return;
    }

    form.reset();
    Object.keys(fields).forEach((name) => {
      const element = fields[name].element;
      if (element) {
        clearError(element);
      }
    });

    if (successBanner) {
      successBanner.classList.remove('is-visible');
      window.requestAnimationFrame(() => {
        successBanner.classList.add('is-visible');
      });
    }
  });
});
