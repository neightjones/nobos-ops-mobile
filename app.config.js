import 'dotenv/config';

export default {
  extra: {
    cognitoRegion: process.env.COGNITO_REGION,
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    cognitoWebClientId: process.env.COGNITO_WEB_CLIENT_ID,
    apiUrl: process.env.API_URL,
  },
};