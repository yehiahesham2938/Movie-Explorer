import './signin-page.css';

const form = document.getElementById('signin-form');
const errorMessage = document.getElementById('error-message');

if (form) {
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = document.getElementById('email').value.trim();
		const password = document.getElementById('password').value;
 
		errorMessage.classList.add('hidden');
		errorMessage.textContent = '';

		try {
			const response = await fetch('http://localhost:4000/api/auth/signin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const data = await response.json().catch(() => ({}));

			if (response.status === 200) { 
				localStorage.setItem('user', JSON.stringify(data)); 
				window.location.href = 'index.html';
				return;
			}
 
			if (response.status === 401) {
				errorMessage.textContent = data.message || 'user does not have an account';
				errorMessage.classList.remove('hidden');
			} else {
				errorMessage.textContent = data.message || 'Failed to sign in';
				errorMessage.classList.remove('hidden');
			}
		} catch (err) {
			console.error(err);
			errorMessage.textContent = 'Network error, please try again later';
			errorMessage.classList.remove('hidden');
		}
	});
}

