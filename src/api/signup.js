const SIGNUP_URL = 'https://api.raisely.com/v3/signup';

export const signup = async ({campaignUuid, firstName, lastName, email, password}) => {
    const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({campaignUuid, data: {firstName, lastName, email, password}})
    });
    return response.json();
}
