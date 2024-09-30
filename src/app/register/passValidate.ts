interface PasswordValidationResult {
    valid: boolean;
    message: string;
}

const validatePassword = (password: string): PasswordValidationResult => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
        return { valid: false, message: `Password must be at least ${minLength} characters\n Include lowercase(a-z)\n Include uppercase(A-Z)\n Include digits(0-9)\n Include special chars(!@#$%^&*)` };
    }
    
    return { valid: true, message: "Password is valid." };
}

export default validatePassword