var debug = false;

//return user last question fix
var magnetron = document.getElementById("form").getElementsByTagName("input");
var names = [];
for (i=0;i<magnetron.length;i++) {
  if (names.indexOf(magnetron[i].name) == -1) {
      names.push(magnetron[i].name);
  }
}

window.addEventListener("DOMContentLoaded", function(evt) {

  var conversationalForm = new cf.ConversationalForm({
    formEl: document.getElementById("form"),
    context: document.getElementById("cf-context"),
    preventAutoStart: true,
    preventAutoFocus: false,
    flowStepCallback: function(dto, success, error) {
      if (debug) {
        console.log("flowstep, dto:", dto, success, error);
        /* var val = dto.tag.value;
        if (Array.isArray(val)) {
          val = val[0];
        }
        window.ConversationalForm.addRobotChatResponse(val); */
      }
      //EASTER EGSS
      if (dto.text.toLowerCase() == "wake me up")
        window.ConversationalForm.addRobotChatResponse("WAKE ME UP INSIDE!!!");
      if (dto.text.toLowerCase() == "chinchilla" || dto.text.toLowerCase() == "flobby")
        window.ConversationalForm.addRobotChatResponse('<img src="img/chinchilla.gif">');
      if (dto.text.toLowerCase().indexOf("tornado") > -1)
        window.ConversationalForm.addRobotChatResponse('<img src="img/tornado.gif">');
      //Update Cookies (if user wants)
      //window.last_question++;
      if (!window.forget) {
        Cookies.set('last_question', names.indexOf(dto.tag.name), { expires: 10, path: '/survey/' });
      }
      //Save response
      var save = true;
      if (save) {
        var tag = dto.tag.name;
        if (tag.substring(0,4) == "cfc-") {
          return success();
        }
        var key = document.getElementById('key').value;
        var val = dto.tag.value;
        if (Array.isArray(val)) {
          val = val[0];
        }
        //Postal Fix
        if (tag=="postal") {
          val = val.replace(" ", "");
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var resp = this.responseText;
              if (resp!="success") {
                window.ConversationalForm.addRobotChatResponse("Oh dear! I seem to be having a problem.<br><br>" + resp + " 😵");
              }
         }
        };
        xhttp.open("POST", "https://greenamsterdam.nl/survey/update.php");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("key="+key+"&"+"tag="+tag+"&value="+val);
      }
      success();
    },
    submitCallback: function() {
      // remove Conversational Form
      //alert("You made it!");
      //console.log("Form submitted...");
      Cookies.remove('active_survey', { path: '/survey/' });
      Cookies.remove('last_question', { path: '/survey/' });
      Cookies.remove('user_name', { path: '/survey/' });
    }
  });
  if (window.last_question > 0) {
    var user_name = Cookies.get('user_name');
    //Welcome back!
    window.ConversationalForm.addRobotChatResponse("Hey there " + user_name + ", welcome back! It looks like we were already chatting, so let's pick up the conversation again where we left off.<br>Want a second chance to meet again for the first time? <a href=\"?reset=true\">click here</a>.");
  } else {
    var h = new Date();
    h = h.getHours();
    var m;
    if (h<5) {
        m = "I see you're up late! 🌜";
    } else if ((4 < h) && (h < 7)) {
        m = "Wow, you're up early! 😴";
    } else if ((6 < h) && (h < 12)) {
        m = "Good morning! 😊";
    } else if ((12 < h) && (h < 17)) {
        m = "Good afternoon! 😎";
    } else if (h==12) {
      m = "Good day! 😋";
    } else {
        m = "Good evening! 😆";
    }
    window.ConversationalForm.addRobotChatResponse("Hi there! " + m);
  }
  window.ConversationalForm.remapTagsAndStartFrom(window.last_question);
});