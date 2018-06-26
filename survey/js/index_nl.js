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
    dictionaryData: {
        "entry-not-found": "Woordenboeksleutel is niet gevonden.",
        "input-placeholder": "Voer hier uw antwoord in ...",
        "group-placeholder": "Typ in om lijst te filteren ...",
        "input-placeholder-required": "Input vereist ...",
        "input-placeholder-error": "Uw invoer is onjuist ...",
        "input-placeholder-file-error": "Uploaden bestand mislukt  ...",
        "input-placeholder-file-size-error": "Bestandsgrootte te groot ...",
        "input-no-filter": "Geen resultaten voor {input-value}",
        "user-reponse-and": " en ",
        "user-reponse-missing": "Invoer ontbreekt ...",
        "general": "Algemeen Type1|Algemeen Type2"
    },// empty will throw error
    dictionaryRobot: {
        "text": "Schrijf hier wat tekst alstublieft.",
        "input": "Schrijf hier wat tekst alstublieft..",
        "name": "Hoe heet u?",
        "email": "Vul hier uw e-mailadres in.",
        "password": "Vul hier uw wachtwoord in.",
        "tel": "Wat is uw telefoonnummer?",
        "radio": "Kies alstublieft een van deze opties.",
        "checkbox": "Kies er zoveel als u wilt.",
        "select": "Kies een van deze opties.",
        "general": "Algemeen1|Algemeen2|Algemeen3.."
    },
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
                window.ConversationalForm.addRobotChatResponse("Oh nee! Ik heb een probleem.<br><br>" + resp + " 😵");
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
    //welcome back!
    window.ConversationalForm.addRobotChatResponse("Hoi " + user_name + ", welkom terug! Ik zie dat we al aan het praten waren, dus laten verder gaan met waar we gebleven waren.<br>Wil je misschien toch opnieuw beginnen? <a href=\"?reset=true&lang=nl\">klik hier</a>.");
  } else {
    var h = new Date();
    h = h.getHours();
    var m;
    if (h<5) {
        m = "Ik zie dat je nog laat op bent! 🌜";
    } else if ((4 < h) && (h < 7)) {
        m = "Wow, jij bent vroeg op! 😴";
    } else if ((6 < h) && (h < 12)) {
        m = "Goede morgen! 😊";
    } else if ((12 < h) && (h < 17)) {
        m = "Goede middag! 😎";
    } else if (h==12) {
        m = "Goede dag! 😋";
    } else {
        m = "Goede avond! 😆";
    }
    window.ConversationalForm.addRobotChatResponse("Hallo! " + m);
  }
  window.ConversationalForm.remapTagsAndStartFrom(window.last_question);
});