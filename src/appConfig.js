export const amplifyConfig = {
    'aws_appsync_graphqlEndpoint': process.env.REACT_APP_APPSYNC_ENDPOINT,
    'aws_appsync_region': process.env.REACT_APP_APPSYNC_REGION,
    'aws_appsync_authenticationType': process.env.REACT_APP_APPSYNC_AUTHENTICATION_TYPE,
    'aws_appsync_apiKey': process.env.REACT_APP_APPSYNC_API_KEY,
    'Auth': {
        // // REQUIRED - Amazon Cognito Identity Pool ID
        // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
        // REQUIRED - Amazon Cognito Region
        region: process.env.REACT_APP_AUTH_REGION,
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_AUTH_POOL_ID,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.REACT_APP_AUTH_WEB_CLIENT_ID,
        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: process.env.REACT_APP_AUTH_MANDATORY_SIGN_IN,
        // OPTIONAL - Configuration for cookie storage
        // cookieStorage: {
        //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.yourdomain.com',
        //     // OPTIONAL - Cookie path
        //     path: '/',
        //     // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        //     // OPTIONAL - Cookie secure flag
        //     secure: true
        // }
    }
};