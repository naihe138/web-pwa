const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.static(__dirname))

app.get('/api/list', async (req, res) => {
  const r = await axios.get('https://www.fullstackjavascript.cn/api/img')
  res.json(r.data)
})

app.listen(4000)