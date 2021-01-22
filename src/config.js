const config = {
    s3: {
      REGION: "us-east-2",
      BUCKET: "hcim-uploads",
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://o408t66g0l.execute-api.us-east-2.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_nS3Cicoao",
      APP_CLIENT_ID: "19q3gkn7kns5uc7pb2h5ok2ars",
      IDENTITY_POOL_ID: "us-east-2:7707b343-266f-46a4-8858-58ea67aaf6cd",
    },
  };
  
  export default config;