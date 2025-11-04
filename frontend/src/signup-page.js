import './signup-page.css';

const form = document.getElementById('signup-form');

if (form) {
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const fullName = document.getElementById('fullName').value.trim();
		const email = document.getElementById('email').value.trim();
		const password = document.getElementById('password').value;
		const confirmPassword = document.getElementById('confirmPassword').value;

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			const response = await fetch('http://localhost:4000/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ fullName, email, password })
			});

			if (response.status === 201) {
				alert('Account created successfully');
				form.reset();
				return;
			}

			const data = await response.json().catch(() => ({}));
			if (response.status === 409) {
				alert('User already exists');
				return;
			}
			alert(data.message || 'Failed to create account');
		} catch (err) {
			console.error(err);
			alert('Network error, please try again later');
		}
	});
}

