module.exports = ({ env }) => ({
  upload: {
    provider: "aws-s3-plus",
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      endpoint: env('AWS_ENDPOINT'),
      params: {
        Bucket: env('AWS_BUCKET'),
        ACL: env('AWS_ACL'),
        folder: env('AWS_FOLDER'),
      }
    }
  },
});
