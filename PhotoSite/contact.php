<?php
/****************************************************************************
 * Name: contact.php
 * Version; 1.0
 * Created: 07 Oct 2009
 * Last Modified: 07 Oct 2009
 * Author: Mark Kenyon
 * Description:
 * Output to WHAT action page:
 * 	txtName
 * 	txtEmail
 * 	txtPhone
 * 	txtareaMessage
 * This is the contact page. It allows  website users to contact the author.
 * The contact details for the system administrators are provided in vCard format.
 * WE NEED TO IMPLEMENT HOW THIS IS ACTIONED? EMAIL TO THE ADMIN EMAIL ADDRESS PROVIDED ON SUBMIT?
 * FEEDBACK PAGE PROVIDED INDICATING EITHER SUCCESS OR FAILURE?
 * ADD HEADING INFORMATION TO ENSURE USERS REALIZE WHAT SITE THEY ARE ON
 * DECIDE ON LOCATION OF PAGE EG IN ADMIN FOLDER? IN ROOT FOLDER?
 ******************************************************************************/
//echo the xml version otherwise <? mark up confuses the php parser
echo '<?xml version="1.0" encoding="ISO-8859-1" ?>'
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<!-- 
  Use the Import statement to link to the stylesheet.
  This statement is not supported in older browsers so only
  browsers that support css correctly will use the stylesheets.
  Older browsers will not apply the style. This workaround relies 
  on the HTML being structured correctly so that the page will
  still be rendered in a usable manner.
 -->
<style type="text/css">
	@import url("./Styles/contact.css");
</style>
<title>Contact Page</title>
</head>

<body>
<!-- create a two column layout contained in a wrapper 
     The clearcols class is required because the two 
     column divs are both floated-->

<div id="wrapper" class="clearcols">
  <!-- The mainContent div contains the page heading, an explanatory paragraph and the form itself--> 
  <div id="mainContent">
     <h1>Contact Details</h1>
     <p>Contact us by submitting the form below or via post or teleohone using the details listed in the side
       bar on the right</p>
     <form action="" method="post" enctype="application/x-www-form-urlencoded">
       <fieldset class="clearcols">
         <legend>Personal Information</legend>
         <!-- Add a class row to style labels and input boxes -->
         <div class="row">
           <span class="formLabel"><label for="name">Name</label></span>
           <span class="formControl"><input class="formField" type="text" id="name" name="txtName" size="30"></input></span>
         </div>
         <div class="row">
           <span class="formLabel"><label for="email">Email Address</label></span>
           <span class="formControl"><input class="formField" type="text" id="email" name="txtEmail" size="30"></input></span>
         </div>
         <div class="row">
           <span class="formLabel"><label for="phone">Telephone</label></span>
           <span class="formControl"><input class="formField" type="text" id="phone" name="txtPhone" size="30"></input></span>
         </div>
       </fieldset>
       <!-- Add a paragraph to hold the message box -->
       <p><strong><label for="message">Message</label></strong><br />
       <textarea id="message" name="txtareaMessage" rows="5" cols="30"></textarea></p>
       <p><input class="submitButton" name="SUBMIT" type="submit" value="SUBMIT"></input></p>
     </form>
     <p><strong>Privacy Policy: </strong>It is the policy of this organisation not to use
     any personal information for any purposes without the express permission of the individual who has provided 
     those details.</p>
  </div>
  <div id="sidebar">
      <!-- Using a microformat allows users to easily download contact details as a vcard -->
     <div class="vcard">
       <h2>Mail</h2>
       <p class="fn org">Iris Design Solutions</p>
       <p class="adr"> <!-- Each line of the address is placed within a <span> with a relevant class value -->
         <span class="type hidden">Work</span>
         <span class="street-address">Fieldside, Lyeway Lane</span><br />
         <span class="locality">Ropley</span><br />
         <span class="region">Hampshire</span><br />
         <span class="postal-code">SO24 0DW</span><br />
       </p>
       
       <h2>Telephone/Fax</h2>
       <!-- Each item is palced in a <p> with a class of tel -->
       <!-- A type hidden <span> is used to define different types e.g home, work, mobile, fax, cell, pager, video etc -->
       <!-- The contact number is palced in a <span> with a class of "value" -->
       <p class="tel">Tel: <span class="type hidden">work</span><span class="value">+44 (0)7599 123456</span></p>
       <p class="tel">Fax: <span class="type hidden">fax</span><span class="type hidden">work</span><span class="value">+44 (0)7599 000000</span></p>
       <p class="tel">Mobile: <span class="type hidden">cell</span><span class="value">+44 (0)7595 777636</span></p>
     </div>
     <p class="saveCard"><a href="http://h2vx.com/vcf/footballdatabase.irisdesignsolutions.co.uk/Admin/contact.php">
     	Download vCard</a>. (<em>This process may take a few seconds</em>)</p>
  </div>

</div>

</body>
</html>