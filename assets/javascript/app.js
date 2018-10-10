
$(document).ready(function(){
    var x = document.getElementById("myVideo");
    function setPlaySpeed() { 
        x.playbackRate = 0.5;
    } 
    setPlaySpeed()
    var triviapanel = $("#triviapanel");

    // Object to hold Questons and Answers
    var questions = [{
      question: "The ____ originated in Croatia.",
      answers: ["Box office", "Ballpoint pen","Chain saw","Necktie"],
      correctAnswer: "Necktie"
    }, {
      question: "Between 1900 and 1920, ____ was an Olympic event.",
      answers: ["Egg on Spoon", "Sack Race","Tug of War","Three-Legged Race"],
      correctAnswer: "Tug of War"
    }, {
      question: "George Washington insisted his Continental Army be permitted a quart of ____ as part of their daily rations.",
      answers: ["Beer","Melted chocolate", "Gravy","Goat's milk"],
      correctAnswer: "Beer"
    }, {
      question: "Deipnophobia is the fear of ________.",
      answers: ["cell phone battery depletion", "Police sirens","Dinner conversations","Car door dents"],
      correctAnswer: "Dinner conversations"
    }, {
      question: "There's a city in Turkey named ____. In 2008, the mayor sued Warner Brothers for using the name without permission.",
      answers: ["Mad Max", "Disraeli","Warner Bros","Batman"],
      correctAnswer: "Batman"
    }, {
      question: "In what place was Christmas once illegal?",
      answers: ["Russia", "Brazil", "England", "France"],
      correctAnswer: "England"
    },  {
      question: "Coulrophobia means fear of what?",
      answers: ["Sacred Things", "Antz", "Old People", "Clowns"],
      correctAnswer: "Clowns"
    }, {
        question: "At what temperature are Fahrenheit and Celsius the same?",
        answers: ["0", "-40", "50", "92"],
        correctAnswer: "-40"
    }, ];


    // Variable/Object that will hold the setInterval
    var timer;
    var game = {
      correct: 0,
      incorrect: 0,
      counter: 90, 
      countdown: function() {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
          game.done();
        }
      },
      start: function() {
        timer = setInterval(game.countdown, 1000);
        $(".firstrow").prepend("<h2>Time Remaining: <span id='counter-number'>90</span> Seconds</h2>"); 
        $("#start").remove();
        for (var i = 0; i < questions.length; i++) {
          triviapanel.append("<h2>" + questions[i].question + "</h2>");
          for (var j = 0; j < questions[i].answers.length; j++) {
            triviapanel.append("<input style='font-size:20px;margin:0 10px 30px 10px;' type='radio' name='question-" + i +
            "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
          }
        }
        triviapanel.append("<button id='done'>Done</button>");
      },
      done: function() {
        for (var i=0;i<=questions.length;i++){
        $.each($("input[name='question-"+ i +"']:checked"), function() {
          if ($(this).val() === questions[i].correctAnswer) {
            game.correct++;
          }
          else {
            game.incorrect++;
          }
        });
        }
    
        this.result();
      },
      result: function() {
        clearInterval(timer);
        $(".firstrow h2").remove();
        triviapanel.html("<h2>All Done!</h2>");
        triviapanel.append("<h3>Correct Answers: " + this.correct + "</h3>");
        triviapanel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        triviapanel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
      }
    };
    
    
    // Recording the click events for Start and Done buttons

    $(document).on("click", "#start", function() {
      game.start();
    });
    $(document).on("click", "#done", function() {
      game.done();
    });

})
