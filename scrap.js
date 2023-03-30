app.engine('handlebars', exphbs.engine());

  // Tenor.Trending.GIFs("LIMIT HERE")
  Tenor.Trending.GIFs("2").then(Results => {
    Results.forEach(Post => {
      console.log(`Item #${Post.id} (${Post.created}) @ ${Post.url}`);
    });
  }).catch(console.error);