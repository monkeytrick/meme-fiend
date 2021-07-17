let express = require('express');
let app = express();
let request = require('request');
app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
    res.render('form.ejs')
} )


app.get('/results', function (req, res) {
    var range = req.query.range;
    request('https://api.imgflip.com/get_memes', (error, response, body) => {
        if (response.statusCode === 200) {
            var parsedData = JSON.parse(body)
            var memsPass = []
                     //loop through results push into empty array above
            for(i = 0; i < range; i++){
                memsPass.push(parsedData['data']['memes'][i])
                            }
            res.render('results.ejs', {results: memsPass, range:range})
        }
    })    
} )

app.listen(3000, () => console.log(`Example app listening on port 3000!`))