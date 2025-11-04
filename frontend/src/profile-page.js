import './profile-page.css';

// Load and display user data from localStorage
document.addEventListener('DOMContentLoaded', () => {
	const userData = localStorage.getItem('user');
	
	if (!userData) {
		// If no user data, redirect to sign-in page
		window.location.href = 'signin-page.html';
		return;
	}

	try {
		const user = JSON.parse(userData);
		
		// Display user information
		document.getElementById('user-fullName').textContent = user.fullName || 'Not provided';
		document.getElementById('user-email').textContent = user.email || 'Not provided';
		document.getElementById('user-id').textContent = user.id || 'Not provided';
		
		// Format and display created date
		if (user.createdAt) {
			const date = new Date(user.createdAt);
			const formattedDate = date.toLocaleDateString('en-US', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			});
			document.getElementById('user-createdAt').textContent = formattedDate;
		} else {
			document.getElementById('user-createdAt').textContent = 'Not available';
		}
	} catch (error) {
		console.error('Error parsing user data:', error);
		// Redirect to sign-in if data is corrupted
		window.location.href = 'signin-page.html';
	}

	// Handle sign out button
	const signOutBtn = document.getElementById('signout-btn');
	if (signOutBtn) {
		signOutBtn.addEventListener('click', () => {
			localStorage.removeItem('user');
			window.location.href = 'index.html';
		});
	}
});

