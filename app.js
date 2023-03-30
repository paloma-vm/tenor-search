
// Require Libraries
const express = require('express');

// Require tenorjs near the top of the file
const Tenor = require("tenorjs").client({
  // Replace with your own key
  // "Key": "TENOR_API_KEY", // https://tenor.com/developer/keyregistration
  "Key": "AIzaSyC-2OG3waKRD77LS588MaWloweKFpe27Pg", // https://tenor.com/developer/keyregistration

  "Filter": "high", // "off", "low", "medium", "high", not case sensitive
  "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// App Setup
const app = express();
app.use(express.static('public')); // added this here

// Middleware
const exphbs  = require('express-handlebars');

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.engine('handlebars', exphbs.engine()); // help from Josh F.
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
  // Handle the home page when we haven't queried yet
  term = ""
  if (req.query.term) {
      term = req.query.term
  // }
  // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
  Tenor.Search.Query(term, "10")
    .then(response => {
      // store the gifs we get back from the search
      const gifs = response;
      // pass the gifs as an object into the home page
      res.render('home', { gifs })
    }).catch(console.error);
  } else if (req.trending) {
      // Tenor.Trending.GIFs("LIMIT HERE")
      Tenor.Trending.GIFs("10")
      .then(Results => {
        // Results.forEach(Post => {
          const gifs = Results;
          res.render('home', { gifs })
          // console.log(`Item #${Post.id} (${Post.created}) @ ${Post.url}`);
      }).catch(console.error);

    }


})

// example URL "http://localhost:3000/?term=hey"
// app.get('/', (req, res) => {
// console.log(req.query) // => "{ term: hey" }[/bold]  * had to remove bold to get it to work
//   res.render('home')
//   })

// app.get('/', (req, res) => {
//   // set the url of the gif
//   const gifUrl = 'https://media1.tenor.com/images/561c988433b8d71d378c9ccb4b719b6c/tenor.gif?itemid=10058245'
//   // render the hello-gif view, passing the gifUrl into the view to be displayed
//   res.render('hello-gif', { gifUrl })
// })

app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
})

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});