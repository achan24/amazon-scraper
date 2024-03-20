const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express() //methods of express attached to variable app

app.use(cors())//override any cors messages

const username = "dude2025";
const password = "0DHnw3K4ES4eTzM";

app.get('/deals', async (req, res) => {

  try {
  const body = {
    'source': 'amazon_search',
    'domain': 'co.uk',
    'query': 'deal of the day',
    'parse': 'true',
    'pages': 1
  }

  //fetch is an async function
  const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    }
  });

  //json is an async method so we need await too
  const data = await response.json()

  //res.send(data) //send it to the browser via res

  // we're going to find out which has the biggest price difference

  const results = data.results[0].content.results.organic

  //only return deals with price strikethrough if exists
  const filteredDeals = results.filter(deal => deal.price_strikethrough)

  const sortedByBestDeal = filteredDeals.sort((b, a) => ((a.price_strikethrough-a.price) / a.price_strikethrough * 100) - ((b.price_strikethrough-b.price)/b.price_strikethrough * 100))

  //use this to build out our frontend
  res.send(sortedByBestDeal)

  } catch(err) {
    console.error(err)
  }

})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

