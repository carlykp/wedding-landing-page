(function() {
  var questions = [{
    question: "How far are you and your wedding party willing to travel from the airport?",
    choices: [" Not at all", " < 1 hour", " > 1 hour"],
    correctAnswer0: 0,
    correctAnswer1: 1,
    correctAnswer2: 2
  }, {
    question: "Which setting do you imagine for your wedding?",
    choices: [" Beach", " Vineyards", " Quinta", " Farmhouse/glamping space", " Modern venue"],
    correctAnswer0: 0,
    correctAnswer1: 1,
    correctAnswer2: 2,
    correctAnswer3: 3,
    correctAnswer4: 4
  }, {
    question: "What kind of weather are you hoping for?",
    choices: [" The hotter the better!", " Sunshine, please.", " Just no rain.", " It doesn't matter to us."],
    correctAnswer0: 0,
    correctAnswer1: 1,
    correctAnswer2: 2,
    correctAnswer3: 3
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {;

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Click handler for the 'Regions' button
  $('#read').on('click', function (e) {;

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#read').hide();
  });


  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').hide();
        $('#read').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = "";
      if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Western Algarve";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Western Algarve";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Western Algarve";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Western Algarve";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Lisbon";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Lisbon";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Lisbon";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Porto";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Wester Algarve";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Lisbon";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Lisbon";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Porto";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Western Algarve";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Lisbon";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Lisbon";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Porto";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Western Algarve";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Lisbon";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Lisbon";
      } else if (selections[0] === questions[0].correctAnswer0 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Porto";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Eastern Algarve";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Eastern Algarve";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Cascais/Sintra";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Cascais/Sintra";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Western Douro Valley";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Western Douro Valley";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Western Douro Valley";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Central Portugal";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Central Portugal";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Cascais/Sintra";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Cascais/Sintra";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Cascais/Sintra";
      } else if (selections[0] === questions[0].correctAnswer1 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Central Portugal";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Easter Algarve";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Eastern Algarve";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Eastern Algarve";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer0 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Cascais/Sintra";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Easter Douro Valley";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer1 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Eastern Douro Valley";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Central Portugal";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Central Portugal";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer2 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "North of Portugal";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Alentejo";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Central Portugal";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Central Portugal";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer3 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "North of Portugal";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer0) {
        numCorrect = "Cascais/Sintra";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer1) {
        numCorrect = "Cascais/Sintra";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer2) {
        numCorrect = "Cascais/Sintra";
      } else if (selections[0] === questions[0].correctAnswer2 && selections[1] === questions[1].correctAnswer4 && selections[2] === questions[2].correctAnswer3) {
        numCorrect = "Central Portugal";
      }

      var regionPage = ""
      if (numCorrect === "Lisbon") {
        regionPage = "lisbon.html";
      } else if (numCorrect === "Porto") {
        regionPage = "porto.html";
      } else if (numCorrect === "Alentejo") {
        regionPage = "alentejo.html";
      } else if (numCorrect === "North of Portugal") {
        regionPage = "north.html";
      } else if (numCorrect === "Central Portugal") {
        regionPage = "central.html";
      } else if (numCorrect === "Eastern Algarve") {
        regionPage = "ealgarve.html";
      } else if (numCorrect === "Western Algarve") {
        regionPage = "walgarve.html";
      } else if (numCorrect === "Eastern Douro Valley") {
        regionPage = "edouro.html";
      } else if (numCorrect === "Western Douro Valley") {
        regionPage = "wdouro.html";
      } else if (numCorrect === "Cascais/Sintra") {
        regionPage = "cascaissintra.html";
      }



    score.append('Based on your responses, the best place for you to have your wedding is ' + numCorrect + '!');
    return score;
  }
})();
