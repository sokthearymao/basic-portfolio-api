const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sendGrid = require('@sendgrid/mail')


const app = express()


app.use(bodyParser.json())

app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})


app.get('/api', (req, res, next) => {
    res.send('API Status: It\'s running punk, I\'m awesome, jerk!')
})


app.post('/api/email', (req, res, next) => {

    console.log(req.body)
    const myApiKey = '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'
    //const myApiKey= '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'
    
    sendGrid.setApiKey(process.env.myApiKey)
    
    const msg = {
        to: 'soktheary.mao@gmail.com',
        from: req.body.email,
        subject: 'Website Contact',
        text: req.body.message
    }

    sendGrid.send(msg)

        .then(result => {
            res.status(200).json({
                success: true
            })
        })
        .catch(err => {
            
            console.log('error: ', err)
            res.status(401).json({
                success: false
            })
        })

})

app.listen(3030, '0.0.0.0')
