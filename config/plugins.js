module.exports = {
    email: {
      config: {
        provider: '@strapi/provider-email-amazon-ses',
        providerOptions: {
          key: process.env.AWS_SES_ACCESS_KEY,
          secret: process.env.AWS_SES_SECRET_KEY,
          amazon: `https://email.${process.env.AWS_SES_REGION}.amazonaws.com`
        },
        settings: {
          defaultFrom: 'noreply@osrs-snowflakes.com',
          defaultReplyTo: 'noreply@osrs-snowflakes.com'
        }
      }
    }
  };