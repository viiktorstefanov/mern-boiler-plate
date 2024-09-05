export const getPasswordStrength = (password: string): number => {
    let strength = 0;
		if (password.length >= 6) strength++;
		if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
		if (password.match(/\d/)) strength++;
		if (password.match(/[^a-zA-Z\d]/)) strength++;
		return strength;
}