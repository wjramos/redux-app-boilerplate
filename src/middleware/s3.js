import { S3 } from 'aws-sdk';

export const AWS_CONFIG = {
  accessKeyId: 'AKIAJOYTWF2P4YGCPYUA',
  secretAccessKey: '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',
  region: 'us-west-2',
};

const s3 = new S3(AWS_CONFIG);

function s3Get(Bucket, Key) {
  return new Promise((resolve, reject) => {
    try {
      return s3.getObject({ Bucket, Key }, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data.Body.toString());
      });
    } catch (e) {
      console.error('Could not retrieve content from s3', err);
    }
  });
}

function s3List(Bucket) {
  return new Promise((resolve, reject) => {
    try {
      return s3.listObjects({ Bucket }, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data.Contents);
      });
    } catch (e) {
      console.error('Could not list files s3', err);
    }
  })
}

export default (/* store */) => next => async action => {
  const { middleware, types, bucket, key, onComplete } = action;

  if (middleware === 'S3') {
    const [requestType, successType, failureType] = types;
    next(Object.assign(
      {},
      action,
      { type: requestType }
    ));

    let response;
    try {
      if (key) {
        response = await s3Get(bucket, key);
      } else {
        const files = await s3List(bucket);
        response = [];

        for (let file of files) {
          response.push(await s3Get(bucket, files[file]));
        }
      }

      // if (onComplete) {
      //   onComplete({ response/*, statusCode*/});
      // }

      return next({
        type: successType,
        response,
      });
    } catch (e) {
      return next({
        type: failureType,
        error: e.message || 'Something bad happened',
      });
    }

    // if (err || (statusCode && (statusCode < 200 || statusCode > 299))) {
    //   return next({
    //     type: failureType,
    //     response,
    //   });
    // }
  }

  return next(action);
};
