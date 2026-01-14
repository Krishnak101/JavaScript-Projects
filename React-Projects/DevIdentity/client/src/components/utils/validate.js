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

export const validateDateRange = (fromDate, toDate, isCurrent) => {
  const now = new Date();
  const start = new Date(fromDate);
  
  // 1. Check if 'From' date exists
  if (!fromDate) return "Start date is required.";

  // 2. Check if 'From' date is in the future
  if (start > now) {
    return "Start date cannot be in the future.";
  }

  // 3. If not current job, validate the 'To' date
  if (!isCurrent) {
    if (!toDate) return "End date is required for previous roles.";
    
    const end = new Date(toDate);
    if (start > end) {
      return "Start date must be before the end date.";
    }
  }

  return null; // Return null if there are no errors
};
