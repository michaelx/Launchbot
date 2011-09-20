<!DOCTYPE html>

<?php 
	### Configuration START ###
	### Instruction: http://launchbot.michaelxander.de/about.html ###
	
	$sets = array (array (setname=>"morning set", "google.com", "twitter.com"),
            	   array (setname=>"evening set", "google.com", "twitter.com", "forrst.com", "dribbble.com")
    ); 
    
    $favbarsites = array("mail.google.com", "docs.google.com", "goo.gl", "twitter.com", "hootsuite.com", "forrst.com", "dribbble.com", "apple.com", "facebook.com");

	### Configuration END ###
?>

<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Launchbot &ndash; Your Personal Startpage Script</title>
	<link rel="shortcut icon" href="favicon.gif" type="image/gif">
	<meta name="keywords" content="Launchbot, Startpage, Script, PHP, Michael Xander, Open-Source">
	<meta name="description" content="Launchbot enables you to easily open Sets of all your favorite Websites with just one Click. It's like restoring Tabs, but on any Computer and Browser. Additional you can use the build in Google Search Bar for a fresh start. Uhw, and certainly this is not all!">
	<meta name="author" content="Michael Xander">
	<link rel="stylesheet" type="text/css" href="style.css">
	<link href="http://fonts.googleapis.com/css?family=Raleway:100" rel="stylesheet" type="text/css" >
	<?php
		$contentwidth = ((count($sets))*200) + 378;
		echo "<style type=\"text/css\">#content { width: ".$contentwidth."px; }</style>" 
	?>	
</head>
<body OnLoad="document.searchForm.q.focus();">

<div id="wrapper">
	<div id="favbar"><?php foreach ($favbarsites as $url) {echo "<a href=\"http://".$url."\" title=\"".$url."\" target=\"_blank\"><img src=\"http://www.google.com/s2/favicons?domain=".$url."\" alt=\"".$url."\"></a> ";} ?> &nbsp;</div>
	<div id="contentWrapper">
		<div id="content"> 
			<h1>&lt; Launchbot &gt;</h1>
			<div class="search">
				<p><img src="img/launchbot_eyes.png" alt="Huh!"></p>
				<form method="get" action="http://www.google.de/search" id="searchForm" name="searchForm">
					<fieldset>
						<input type="text" name="q" maxlength="255" id="searchText" value="" />
						<input type="submit" id="searchSubmit" value="Google" />
					</fieldset>
				</form>
			</div>			
			<div class="xor">xor open</div>
						
			<?php			
			for ($i = 0; $i < count($sets); $i++) {
				
				echo "<div class=\"set\">";
				echo "<p><a href=\"#\" onClick=\"";	
    
    			for ($u = 0; $u < count($sets[$i])-1; $u++) {
    				echo "window.open('http://".$sets[$i][$u]."'); ";
    			}
    			
    			echo "\"><img src=\"img/launchbot_sites.png\" alt=\"Site-Set\"><br /><br />".$sets[$i]["setname"]."</a>";
    			echo "</p>\n <p>";

				for ($u = 0; $u < count($sets[$i])-1; $u++) {
    				echo "<a href=\"http://".$sets[$i][$u]."\" title=\"".$sets[$i][$u]."\" target=\"_blank\"><img src=\"http://www.google.com/s2/favicons?domain=".$sets[$i][$u]."\" alt=\"".$url."\"></a>\n ";
    			}
    			
    			echo "</p>\n </div>\n";
			}
    		?>
						
		</div>
		<div id="footer">
			<p>&copy; 2011 <a href="http://michaelxander.de" target="_blank">Michael Xander</a>.  
			<a href="http://launchbot.michaelxander.de/about.html">Download and about Launchbot.</a>
			Follow me on <a href="http://twitter.com/michael_xander" target="_blank">Twitter</a> for further projects.
			</p>
		</div>
	</div>
</div>

</body>
</html>