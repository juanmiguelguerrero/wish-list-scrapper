const express = require('express')
const server = express()
const cors = require('cors')
const port = process.env.PORT || 8080

const productScrapper = require('./scrapper.js')

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cors())

server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

server.post("/", async (req, res) => {
	
	let url = req.body.url

	if (!url) {
		res.json({ message: "URL parameter not received"})
	} else {
		let results = await productScrapper(url)
		res.json(results)
	}
})

server.listen(port, () => {
	console.log(`Server listening at ${port}`)
})