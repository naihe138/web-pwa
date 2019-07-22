(async function () {
  let ul = document.getElementById('list')
  let request = new Request('/api/list', {
    method: 'get'
  })
  let res = await fetch(request)
  let data = await res.json()
  ul.innerHTML = data.map(item => `<li><img src="${item}" /></li>`).join('')
})()