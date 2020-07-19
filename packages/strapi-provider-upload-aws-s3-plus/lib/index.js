'use strict';

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const AWS = require('aws-sdk');

// TODO: 1. Allow ACL as a parameter
// TODO: 2. Allow a 'folder' parameter to prefix the key

module.exports = {
    init(config) {

        console.debug('strapi-provider-upload-aws-s3-plus:init', 'config:', config);

        const {ACL = 'public-read', folder = null} = config.params;

        const isPublic = (acl) => acl.indexOf('public') > -1;

        const S3 = new AWS.S3({
            apiVersion: '2006-03-01',
            ...config,
        });

        return {
            upload(file, customParams = {}) {
                return new Promise((resolve, reject) => {

                    // upload file on S3 bucket
                    const path = (folder ? `${folder}/`: '') + (file.path ? `${file.path}/` : '');

                    S3.upload(
                        {
                            Key: `${path}${file.hash}${file.ext}`,
                            Body: Buffer.from(file.buffer, 'binary'),
                            ContentType: file.mime,
                            ACL: ACL,
                            ...customParams,
                        },
                        (err, data) => {
                            if (err) {
                                return reject(err);
                            }
                            console.debug('strapi-provider-upload-aws-s3-plus:init', 'S3.upload:data', data);

                            // set the bucket file url
                            file.url = isPublic(ACL) ? data.Location : S3.getSignedUrl('getObject', {
                                Bucket: data.bucket,
                                Key: data.key,
                                Expires: 0
                            });

                            resolve();
                        }
                    );
                });
            },
            delete(file, customParams = {}) {
                return new Promise((resolve, reject) => {
                    // delete file on S3 bucket
                    const path = file.path ? `${file.path}/` : '';
                    S3.deleteObject(
                        {
                            Key: `${path}${file.hash}${file.ext}`,
                            ...customParams,
                        },
                        (err, data) => {
                            if (err) {
                                return reject(err);
                            }

                            resolve();
                        }
                    );
                });
            },
        };
    },
};
