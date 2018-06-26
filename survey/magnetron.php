<?php
/*
MAGNETRON Survey Bot
By Jake Henderson
www.henderson3.net
*/

$debug = false;

if($debug) {
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
}
//This may be needed depending on webserver configuration for AJAX requests
/*
if ($_SERVER['HTTP_HOST'] != 'greenamsterdam.nl') {
    header('Location: https://greenamsterdam.nl' . $_SERVER['REQUEST_URI']);
    exit();
} */

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function GET($param) {
    if (isset($_GET[$param])) {
        return $_GET[$param];
    } else {
        return null;
    }
}

$doSave = false;

if (GET('lang') == 'nl') {
    $lang = 'nl';
} else {
    $lang = 'en';
}

if ((isset($_COOKIE['active_survey'])) && 
    (GET('reset') != 'true') && 
    (GET('forget')!= 'true')) {
    $key = $_COOKIE['active_survey'];
    if (isset($_COOKIE['last_question'])) {
        $last_question = $_COOKIE['last_question'];
    } else {
        $last_question = 0;
    }
} else {
    $last_question = 0;
    $key = hash("sha256", (string)rand() . (string)time() . generateRandomString());
    $doSave = true;
}
// Make sure to change cookie path if not in /survey/ directory, as well as favicon and JS cookie paths.
if (GET('forget') != 'true') {
    setcookie('active_survey', $key, time() + (86400 * 10), '/survey/');
    setcookie('last_question', $last_question, time() + (86400 * 10), '/survey/');
    $forget = 'false';
} else {
    $forget = 'true';
}
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui">
  <meta name="robots" content="noindex, nofollow">
  <title>MAGNETRON</title>
  <!-- favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="/survey/apple-touch-icon.png?v=PY4PLAQrdz">
  <link rel="icon" type="image/png" sizes="32x32" href="/survey/favicon-32x32.png?v=PY4PLAQrdz">
  <link rel="icon" type="image/png" sizes="16x16" href="/survey/favicon-16x16.png?v=PY4PLAQrdz">
  <link rel="manifest" href="/survey/site.webmanifest?v=PY4PLAQrdz">
  <link rel="mask-icon" href="/survey/safari-pinned-tab.svg?v=PY4PLAQrdz" color="#5bbad5">
  <link rel="shortcut icon" href="/survey/favicon.ico?v=PY4PLAQrdz">
  <meta name="apple-mobile-web-app-title" content="MAGNETRON">
  <meta name="application-name" content="MAGNETRON">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="msapplication-config" content="/survey/browserconfig.xml?v=PY4PLAQrdz">
  <meta name="theme-color" content="#ffffff">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
      <script>
          var last_question = <?php echo $last_question; ?>;
          var forget = <?php echo $forget; ?>;
          if (forget) {
            Cookies.remove('active_survey', { path: '/survey/' });
            Cookies.remove('last_question', { path: '/survey/' });
            Cookies.remove('user_name', { path: '/survey/' });
          }
          function isNo(val){
              var nopes = ['no', 'nope', 'nein', 'nee', 'nothing', "i don't want to answer"];
              if (nopes.indexOf(val.toLowerCase()) > -1) {
                  return true;
              } else {
                  return false;
              }
          }
      </script>
</head>

<body>

<form id="form">
<input type="hidden" name="key" id="key" value="<?php echo $key; ?>">
<?php
include("lang_files/" . $lang . ".html");
?>
</form>
<script>
    //value-piping fix for return users
    if (last_question > 0) {
        var user_name = Cookies.get('user_name');
        var names = ["intro", "intro2", "2025", "if-green-energy-convince", "closing"];
        for (i=0;i<names.length;i++) {
            document.getElementById(names[i]).setAttribute("cf-questions", document.getElementById(names[i]).getAttribute("cf-questions").replace("{name}", user_name));
        }
    }
</script>
<div id="cf-context" class="dark-theme" role="cf-context" cf-context></div>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/conversational-form@0.9.83/dist/conversational-form.min.js" crossorigin></script>
<script type="text/javascript" src="js/index_<?php echo $lang; ?>.js?v=9"></script>
</body>
</html>
<?php
 if ($doSave) {
    require_once("db.inc.php");
    $ip = $_SERVER['REMOTE_ADDR'];
    $ua = strip_tags(htmlspecialchars($_SERVER ['HTTP_USER_AGENT']));
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    if($conn->connect_error) {
        if ($debug) { echo "<!-- " . $conn->error . " -->"; }
        echo("<script>alert(\"Error: I can't seem to find my brain. I won't remember the answers you give me. Please come back later.\");</script>");
    }
    $conn->set_charset('utf8mb4');
    $qry = $conn->prepare("INSERT INTO Surveys (Survey_ID, Time_Added, IP, User_Agent, Lang) VALUES (?, NOW(), ?, ?, ?)");
    $qry->bind_param("ssss", $key,$ip,$ua,$lang);
    $qry->execute();
    $qry->close();
    $conn->close();
 }
?>