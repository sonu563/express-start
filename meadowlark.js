
const fortune = require('./lib/fortune.js')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 4000

app.engine('handlebars', expressHandlebars({
  defaultLayout : 'main',
}))

app.set('view engine', 'handlebars')



app.use(express.static(__dirname + '/public'))

// app.get('/', (req,res) =>{
//   res.type('text/plain')
//   res.send('meadowlark page')
// })
app.get('/', (req,res) => res.render('home'))

app.get('/about', (req, res) => {
res.render('about', { fortune: fortune.getFortune() } )
})

app.use((req,res) =>{
  // res.type('text/plain')
  res.status(404)
  res.render('404')
})

app.use((err,req,res,next) =>{
  console.error(err.message)
  // res.type('text/plain')
  res.status(505)
  res.render('505')
})

app.listen(port, () => console.log(
`Express started on http://localhost:${port}; ` +
`press Ctrl-C to terminate.`))
