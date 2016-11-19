<?php
include_once 'dbconnect.php';
	
	$sql = "SELECT * FROM breed";
	$numResults = mysql_num_rows($sql);
	$counter = 0;
	$result = $conn->query($sql);

	while ($row = mysql_fetch_array($result)) {
	if (++$counter == $numResults) {
	  // last row
	  echo $row["breed"].",".$row["breed_abbreviation"];
	} else {
	  // not last row
	  echo $row["breed"].",".$row["breed_abbreviation"].",";
	}
}
?>
