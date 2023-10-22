const authProvider: any = {

};

export const checkUser = () => {
    // Get the user data from your auth provider
    // This is just a placeholder, replace it with your actual logic
    const user = authProvider.currentUser;
  
    if (user) {
      // If the user is logged in, return their data
      // The user type should be stored as part of their data
      return user;
    } else {
      // If the user is not logged in, return null
      return null;
    }
  }
  