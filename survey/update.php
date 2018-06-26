<?php
$debug = false;

if($debug) {
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
}

function errexit($msg) {
	echo $msg;
	exit();
}

if (empty($_POST['key'])) {
    errexit("I didn't get a key.");
}

if (empty($_POST['tag'])) {
    errexit("I didn't get a tag.");
}

if (empty($_POST['value'])) {
    errexit("I didn't get value.");
}

$tag = $_POST['tag'];
$tags = array("name","gender","age","live","neighborhood","postal","occupation","if-occupation-other","study","if-study-other","house","if-house-other","rent-status","energy","if-energy-other","energy-aware","if-energy-aware","if-not-energy-aware","natural-gas","if-natural-gas-other","aware-2025","reduce-gas","if-reduce-gas-no","green-energy","if-green-energy-why","if-green-energy-how","if-green-energy-ease","if-green-energy-buying","solar","if-solar","green-convince","if-green-energy-convince","community","if-community","green-motivations","magicwand","nextstep","stopping_nextstep","email_address","closing");
if (!in_array($tag, $tags)) {
    errexit("I don't seem to have a valid tag.");
}

require_once("db.inc.php");
$key = strip_tags(htmlspecialchars($_POST['key']));
$value = strip_tags(htmlspecialchars($_POST['value']));
/* if ($debug) {
    echo "Tag: $tag, Key: $key, Value: $value <br><br>";
} */

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if($conn->connect_error) {
    if ($debug) { echo $conn->error . "<br>"; }
    errexit(" I can't seem to find my brain. I didn't remember the answer you gave me. Please come back later.");
}
$conn->set_charset('utf8mb4');

$sql = 'UPDATE Surveys SET `' . $tag . '` = ? WHERE Survey_ID = ?';
if ($debug) {
    //echo $sql;
}
$qry = $conn->prepare($sql);
if (!$qry) {
    if($debug) {
        echo $conn->error . "<br>";
    }
}
if(!$qry->bind_param("ss", $value, $key)) {
    if($debug) {
        echo $conn->error . "<br>";
    }
}
$qry->execute();
if($qry) {
  if($conn->affected_rows == 0) {
    //errexit("The key doesn't seem to exist.");
  } else if ($conn->affected_rows == -1){
    if ($debug) { echo $conn->error . "<br>"; }
    errexit("I seem to be losing my mind and didn't remember! Sorry about that!");
  }
} else {
  if ($debug) { echo $conn->error . "<br>"; }
  errexit(" I had a problem remembering.");
}
$qry->close();
$conn->close();
echo "success";
?>