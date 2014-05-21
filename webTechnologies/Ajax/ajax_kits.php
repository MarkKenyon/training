<?php

header("Content-type: text/xml");

$team = $_REQUEST["team"];

if ($team == "Arsenal")
{
	$fileName = "arsenal.xml";
}
else if ($team == "Birmingham City")
{
	$fileName = "birmingham.xml";
}
if ($team == "Chelsea")
{
	$fileName = "chelsea.xml";
}

$filePointer = fopen($fileName, "r");
$xmlData = fread($filePointer, filesize($fileName));
fclose($filePointer);

print($xmlData);

return true;

?>