// Password visibility toggle for login page
const togglePassword1 = document.getElementById('toggleLoginPassword');
const passwordInput1 = document.getElementById('login-password');
const eyeIcon1 = document.getElementById('loginEyeIcon');

if (togglePassword1 && passwordInput1 && eyeIcon1) {
  togglePassword1.addEventListener('click', () => {
    const type = passwordInput1.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput1.setAttribute('type', type);
    eyeIcon1.classList.toggle('fa-eye');
    eyeIcon1.classList.toggle('fa-eye-slash');
  });
}

// Password visibility toggle for signup page
const togglePassword2 = document.getElementById('togglesignupPassword');
const passwordInput2 = document.getElementById('signup-password');
const eyeIcon2 = document.getElementById('signupEyeIcon');

if (togglePassword2 && passwordInput2 && eyeIcon2) {
  togglePassword2.addEventListener('click', () => {
    const type = passwordInput2.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput2.setAttribute('type', type);
    eyeIcon2.classList.toggle('fa-eye');
    eyeIcon2.classList.toggle('fa-eye-slash');
  });
}

// Signup functionality
const signupBtn = document.getElementById('signup-btn');
const signupForm = document.getElementById('signupForm');
signupBtn && signupBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signup-username');
  const email = document.getElementById('signup-email');
  const password = document.getElementById('signup-password');

  if (!username.value || !email.value || !password.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Information',
      text: 'Please fill all fields',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  try {
    showLoader();
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: username.value,
        },
      },
    });

    if (error) throw error;
    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Signup successful!',
        confirmButtonColor: '#28a745',
        willClose: () => {
          window.location.href = 'post.html';
        }
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    if (error.message.includes('invalid format')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
        confirmButtonColor: '#d33'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.message,
        confirmButtonColor: '#d33'
      });
    }
  } finally {
    hideLoader();
  }
});

// Login functionality
const loginBtn = document.getElementById('login-btn');
loginBtn && loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('login-email');
  const password = document.getElementById('login-password');

  if (!email.value || !password.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Information',
      text: 'Please fill all fields',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  try {
    showLoader();
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;
    if (data) window.location.href = 'post.html';
  } catch (error) {
    console.error('Login error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.message,
      confirmButtonColor: '#d33',
      willClose: () => {
        window.location.href = 'index.html';
      }
    });
  } finally {
    hideLoader();
  }
});

