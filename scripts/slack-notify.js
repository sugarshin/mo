const { IncomingWebhook } = require('@slack/client')

new IncomingWebhook(process.env.SLACK_WEBHOOK_URL).send(
  '`mo` has been updated :tada: <https://moci.now.sh/>',
  err => {
    if (err) {
      console.log('Error:\n\n', err)
    } else {
      console.log('Message sent successfully.')
    }
  }
)
