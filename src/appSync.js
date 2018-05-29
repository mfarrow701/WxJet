import AWSAppSyncClient from 'aws-appsync';

export const appSyncConfig = {
    'graphqlEndpoint': process.env.REACT_APP_APPSYNC_ENDPOINT,
    'region': process.env.REACT_APP_APPSYNC_REGION,
    'authenticationType': process.env.REACT_APP_APPSYNC_AUTHENTICATION_TYPE,
    'apiKey': process.env.REACT_APP_APPSYNC_API_KEY,
};

export const client = new AWSAppSyncClient({
    url: appSyncConfig.graphqlEndpoint,
    region: appSyncConfig.region,
    auth: {
        type: appSyncConfig.authenticationType,
        apiKey: appSyncConfig.apiKey,
    }
});