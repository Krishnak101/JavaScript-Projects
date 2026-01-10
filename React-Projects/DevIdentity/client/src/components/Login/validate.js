export const checkValidData = (
  isLoginForm,
  email,
  password,
  username,
  passwordConfirmation
) => {
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) {
    return "Email ID is not valid";
  }
  if (!isPasswordValid) {
    if (isLoginForm) {
      return "Invalid Credentials";
    }
    return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
  }

  if (!isLoginForm) {
    if (!username || username.trim().length === 0) {
      return "Username cannot be empty";
    }
    if (password !== passwordConfirmation) {
      return "Passwords do not match";
    }
  }
  return null;
};
