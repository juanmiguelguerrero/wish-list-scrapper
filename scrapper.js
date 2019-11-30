const request = require('request-promise')
const cheerio = require('cheerio')


// Load HTML from a URL
async function loadURL(url) {
	
	const options = {
		url: url,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'			
		}
	}
	try {
		let html = await request(url)
		console.log(html)
		return html
	} catch {
		console.error('Error!!!')
		return "... URL Load Error!!!"
	}
}

// Extract product information from Amazon Wish List URL 
async function productScraper(url) {

	let results = []
	let html = await loadURL(url)
	let $ = cheerio.load(html)
	
	$('#g-items li').each((i, element) => {
		
		let price = $(element).attr('data-price')
		let name = $(element).find('h3 .a-link-normal').attr('title')
		let image = $(element).find('.g-itemImage img').attr('src').replace("._SS135_.", "._AC_UY879_.")
		let params = JSON.parse($(element).attr('data-reposition-action-params'))
		
		let ASIN = params.itemExternalId.slice(5, 15)
		let link = `https://www.amazon.es/dp/${ASIN}`

		results.push({
			asin: ASIN,
			name: name,
			link: link,
			image: image,
			price: price
		})
	})
	console.log(results)
	return results
}

module.exports = productScraper