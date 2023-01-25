document.addEventListener('DOMContentLoaded', () => {
  //Variables
  var filters = document.querySelector('.filters')
  var allCoursesDiv = document.getElementById('allCourses')
  var allCoursesButton = document.getElementById('allCoursesButton')
  var findCoursesButton = document.getElementById('findCourses')
  var alreadyClicked1 = 0
  var alreadyClicked2 = 0

  //Event Listeners
  allCoursesButton.onclick = showOrHideAllCourses
  findCourses.onclick = showOrHideFilters

  //Functions

  //alreadyClicked keeps track of if the button has been clicked already
  function showOrHideAllCourses(){
      if (alreadyClicked1 == 0){
        allCoursesDiv.classList.remove('hidden')
        alreadyClicked1++
      }

      else{
        allCoursesDiv.classList.add('hidden')
        alreadyClicked1--
      }
  }

  function showOrHideFilters(){
    if (alreadyClicked2 == 0){
      filters.classList.remove('hidden')
      alreadyClicked2++
    }
    else {
      filters.classList.add('hidden')
      alreadyClicked2--
    }
  }

})
