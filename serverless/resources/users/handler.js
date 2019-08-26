'use strict';

module.exports.read = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'read',
        input: event,
      }
    ),
  };
};




