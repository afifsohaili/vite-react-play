const SIGNUP_URL = 'https://api.raisely.com/v3/check-user';

export const validateEmail = async ({campaignUuid, email}) => {
    try {
        const response = await fetch(SIGNUP_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({campaignUuid, data: {email}})
        });
        const responseObject = await response.json();
        return responseObject?.data?.status === 'OK';
    } catch (error) {
        console.error(error);
    }
}
