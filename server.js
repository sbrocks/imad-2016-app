var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

var articles={
'article-one':{
    title:'Article-One | Shaury Baranwal',
    heading: 'Article-One',
    date: 'Oct 4,2016',
    content:`
          <p>
              This is the content for my first article.   This is the content for my first article.  This is the content for my first article.  This is the content for my first article.  This is the content for my first article.  This is the content for my first article.
              </p>
        
          <p>
              This is the content for my first article.  This is the content for my first article.  This is the content for my first article.  This is the content for my first article.  This is the content for my first article.  This is the content for my first article.
              </p>
              
          <p>
              This is the content for my first article.  This is the content for my first article.  This is the content for my first article.  This is the content for my first article.  This is the content for my first article.  This is the content for my first article. 
              </p>`
    },
'article-two':{
    title:'Article-Two | Shaury Baranwal',
    heading: 'Article-Two',
    date: 'Oct 6,2016',
    content:`<p>
              This is the content for my second article. 
              </p>`
          
    
},
    
'article-three':{
    title:'Article-Three | Shaury Baranwal',
    heading: 'Article-Three',
    date: 'Oct 10,2016',
    content:`
          <p>
              This is the content for my third article.  
              </p>`
    
}
}

function createTemplate (data){
var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;

var htmlTemplate=`
<html>
    <head>
        <title>${title}</title>
           <meta name="viewport" content="width-device-width, initial-scale=1"/>
           <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
       <div class="container">
       <div>
           <a href="/">Home</a>
       </div>
       <hr/>
       <h1>
           ${heading}
       </h1>
       <div>
           ${date}
       </div>
       <div>
           ${content}
       </div>
    </body>
</html>
`;
    return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //how do we create a hash
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',functio(req,res){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
})

app.get('/:articleName',function(req,res){
    //articleName=articleOne
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
