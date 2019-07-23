const express = require('express')
const webpush = require('web-push')
const axios = require('axios')
const app = express()

app.use(express.static(__dirname))

app.get('/api/list', async (req, res) => {
  const r = await axios.get('https://www.fullstackjavascript.cn/api/img')
  res.json(r.data)
})

const publicVapidKey = 'BFuifm15L3lIT94Au4FW3pa13rnZyyQ1Th-A0Jha-waGyFv3Ago8gUExGXpAx8vL-vWC0xbC4oVCiPEXlpeKyYA'
const privateVapidKey = 'o4oTRaAWvQO1pgy1b1we5QwLnga7AagvMXpQakIfX30'

// Replace with your email
webpush.setVapidDetails('mailto:val@karpov.io', publicVapidKey, privateVapidKey)

const app = express();

app.use(require('body-parser').json())

app.post('/subscribe', (req, res) => {
  const subscription = req.body
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'test' })
  // 测试 https://web-push-codelab.glitch.me/
  console.log(subscription)

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack)
  });
});

app.listen(4000)
