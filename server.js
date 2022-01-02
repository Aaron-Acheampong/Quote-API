const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const random = getRandomElement(quotes);
    const randomQuote = random.quote;
    res.send(
        {quote: randomQuote});
    }
);

app.get('/api/quotes', (req, res, next) => {
    const personQuote = req.query.person;
    const quotesArray = [];
    if (personQuote) {
      quotes.forEach(quote => {
        if (quote.person == personQuote) {
          quotesArray.push(quote.quote);
        }});
      } else {
        quotes.forEach(quote => {
            quotesArray.push(quote.quote)
          });
      }
      const objectToReturn = {
        quotes: quotesArray
      };
      res.send(objectToReturn);
    });

    app.post('/api/quotes', (req, res, next) => {
        const quoteUpdates = req.query;
        if (req.query.person && req.query.quote) {
          const newQuote = {
            quote: req.query.quote,
            person: req.query.person};
          quotes.push(newQuote);
          res.send(newQuote);
        } else {
          res.status(400).send();
        }
      });


app.listen(PORT);

