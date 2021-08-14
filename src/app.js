const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlerbars engine and views location
app.set('view engine', 'hbs') //('name', 'value')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directorey to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Fat7y'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Fat7y'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Fat7y'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Fat7y',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lon, lat, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lon, lat, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get ('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Fat7y',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})