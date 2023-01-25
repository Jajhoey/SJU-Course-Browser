var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var encodedParser = bodyParser.urlencoded({extended: false})
//For accessing json data
const data = require(__dirname + '/assets/courses.json')

//Routes
router.get('/', encodedParser, (req, res) => {
  res.render('index.ejs', {data: data})
})

//Access to req.body comes from the body-parser module

router.post('/searchResults', encodedParser, (req,res) => {
  var results = returnSearchResults(data, req.body)
  res.render('results.ejs', {data: results})
})

router.post('/dropdownResults', encodedParser, (req,res) => {
  var results = returnDropdownResults(data, req.body)
  res.render('results.ejs', {data: results})
})

/**Takes the json file and res.body as parameters, then uses that data
to search through the json array of objects for a match
(req.body is the info passed to the post route (/results) from the forms in the body)*/
function returnSearchResults(json, body){
  var results = []
  json.forEach((course) => {
    if (course.title.toLowerCase().includes(body.input.toLowerCase())
    || course.course_code.toLowerCase().includes(body.input.toLowerCase())
    || course.instructor.toLowerCase().includes(body.input.toLowerCase())
    || course.type.toLowerCase().includes(body.input.toLowerCase())
    || course.day.toLowerCase().includes(body.input.toLowerCase())
    || course.seats_available.toLowerCase().includes(body.input.toLowerCase())) {
      results.push(course)
    }

    if (results.length == 0) {
      results.push({"title": "No courses found."})
    }

  })
  return results
}

/**This function also takes the json file and res.body as parameters. It will
use information gathered from the dropdown menus to return the correct objects from the json array.
The res.body in this case is returned as an array. Information from the first dropdown will be
in req.body.input[0], and info from the second dropdown in req.body.input[1]*/
function returnDropdownResults(json, body){
  var results = []
  json.forEach((course) => {
    var seats = Number(course.seats_available)
    if (course.day == body.input[0] && body.input[1] == 'more') {
      if (seats >= 5) {
        results.push(course)
      }
    }
    if (course.day == body.input[0] && body.input[1] == 'less'){
      if (seats < 5) {
        results.push(course)
      }
    }

  })
  return results
}

module.exports = router
