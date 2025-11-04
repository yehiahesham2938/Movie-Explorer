import './profile-page.css';

// Load and display user data from localStorage
document.addEventListener('DOMContentLoaded', () => {
	const userData = localStorage.getItem('user');
	
	if (!userData) {
		// If no user data, redirect to sign-in page
		console.log('No user data found, redirecting to sign-in');
		window.location.href = 'signin-page.html';
		return;
	}

	try {
		const user = JSON.parse(userData);
		console.log('✅ User is logged in:', user.email || user.fullName || 'User');
		
		// Profile page loaded successfully
		// The profile form will show with default values
		
	} catch (error) {
		console.error('❌ Error parsing user data:', error);
		// Redirect to sign-in if data is corrupted
		localStorage.removeItem('user');
		window.location.href = 'signin-page.html';
		return;
	}

	// Handle sign out button
	const signOutBtn = document.getElementById('signout-btn');
	if (signOutBtn) {
		signOutBtn.addEventListener('click', () => {
			console.log('🔓 Signing out user...');
			// Clear user data from localStorage
			localStorage.removeItem('user');
			// Redirect to sign-in page
			window.location.href = 'signin-page.html';
		});
	}
});

