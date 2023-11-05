export const loginWithToken = async (loginToken: string) => {
    const response = await fetch(`/api/user/${loginToken}`);
    return response.json();
}

export const loginAsUnit = async (username: string, password: string) => {
    const response = await fetch('/api/login/unit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Include any necessary data in the body
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const userData = await response.json();
    return userData;
  };
  
  export const loginAsVolunteer = async (username: string, password: string) => {
    const response = await fetch('/api/login/volunteer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Include any necessary data in the body
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const userData = await response.json();
    return userData;
  };
  