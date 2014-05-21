
//This is a javascript file to demonstrate the use of unobtrusive accessible javascript

//Test whether the browser supports the DOM:
//	-checking for the documents ID using getElementByID
//	-also try to create a node using createTextNode as some older browsers support the DOM but do not
//	implement it

//If either fails return and exit from the script so no more javascript is implemented.
//The code must be added to the Window onload event. we can do so by adding an anonymous function

window.onload = function() {
	if(!document.getElementById || !document.createTextNode){return;}
	//Any following code will only be implemented if the DOM is supported and implemented.

	
};

//EVENT HANDLERS
//Accessible websites must be device independent so try to use device dependent events 
//e.g the click event which is also fired via the enter button on the keyboard.
//If device dependent events must be used provide redundancy for different devices 
//e.g. onmousedown + onkeydown ; onmouseup + onkeyup ; onclick + onkeypress
//However, this may hijack other events that may be associted with a key press etc. so care 
//must be taken. The click event is safest as it does not generally require a fallback event
//handler.

//Adding Event Handlers inline is not recommended as it mixes behaviour with structure

//A better aproach is to use the DOM to add them via direct assignment



//Note: This is fine when you only one Javascript file but for more complicated applications several 
//Javascript files may exist all trying to add events to the same object e.g. the window.

//The following is a function to dynamically add events to any element. It was written by Scott Andrew.

function addEvent(element, eventType, fn, useCapture){
	//crossbrowser event handling for IE5+, NS6 and Mozilla/Gecko
	if (element.addEventListener){ //IE
		element.addEventListener (eventType, fn,useCapture);
		return true;
	} else if(element.attachEvent){ //NS
		var eventHandler = element.attachEvent('on' + eventType, fn);
		return eventHandker;
	} else { //Mozilla/Gecko
		element['on' + eventType]= fn;
	}
}
 
//Some drawbacks to this technique include
 // - not compatible with all older browsers
 //	- you cannot self reference the calling element e.g. showPic(this.href) using the this keyword

 

 
 //add the changeTextColour() function to the mouse over event for the colourDiv
 function addRollover(){
	 var cDiv=document.getElementById('colourDiv');
	 if(!cDiv){return;};
	 //add the event handler
	 addEvent(cDiv,'mouseover', changeTextColour, false);
 }
 
 //To improve scalability even further we could create a function that adds/removes/checks/swaps classes on
 // a given element
 
 function alterClass(action, element,class1, class2){
	 //create a switch case for each action swap/check/replace/remove etc
	 switch (action){
	 
	 case 'swap':
		 //Swaps one class with another
		 //First check if class1 exists. If it does not, use class1 to replace class 2.
		 //If class1 does exist replace class1 with class2
		 element.className != alterClass('check', element, class1)? element.className.replace(class2, class1):element.className.replace(class1, class2);
		 break;
		 
	 case 'add':
		 //adds a class to an element
		 //check if class1 is associated with the element. If it isn't add it to the class attribute preceded by a space.
		 //Otherwise just add the class. Effectively do nothing.
		 if(!alterClass('check', element, class1)){ element.className+=element.className?' ' +class1:class1;}
		 
	 	break;
	 	
	 case 'remove':
		 //removes a class from an element
		 //Test whether class1 matches or 'space' + class1 and assign the match to a variable classMatch
		 //Replace the matching class with an empty value.
		 var classMatch = element.className.match(' ' + class1)?' ' + class1:class1;
		 element.className=element.className.replace (classMatch, '');
		 break;
		 
	 case 'check':
		 //check whether a class is associated with an element.
		 //Return true if it is associated or false if it is not associated
		 //creates a new regular expression that tests for the beginning of a string (^) or (|) a space (\s) 
		 //followed by the classname and then followed by a space or the end of the string
		 //It then tests this regular expression against any classes associated with the element
		 return new RegExp ("(^|\\s)" + class1 + "(\\s|$)").test(element.className);
		 break;
	 }
	 
 }
 
 //create a function that returns an array containing all the elements woth the given class name

 function getElementsByClass (className) {
	 //check the dom is supported
	 if(!document.getElementById || !document.createTextNode){return;}
	  var allTags = document.getElementsByTagName('*');
	  var elements = new Array();
	  //loop through all the tags and check the class attribute
	  //if it matches add the element to the elements array
	  for (var i = 0; i < allTags.length; i++)
	    if (allTags[i].className == className)
	      elements[elements.length] = allTags[i];
	  //return the array containing all the elements
	  return elements;
	}

 
 //OPENING POPUP WINDOWS
 
 //Sometimes it may be valid to open a pop up window e.g. to link to a separate help or a terms and conditions page
 //You should not remove browser functionality that would render the content inaccessible to some users
 //e.g. turning off scrollbars and menubars etc. Some users may need to incraese text size, resize windows etc.
 //Users must be able to close the popup window, and users without Javascript enables should also be able to access 
 //the content.
 
 //The target attribute can be used to open a new window without Javascript by setting it to "_blank" but this attribute
 //is deprecated/
 
 //The rel attribute can also be used
 
 //A class attribute can be used and a Event handler added to the class to open the window.
 //The click event is the most accessible event to link with the opening of the window as it should be accessible to 
 //other assistive technologies and keyboard users
 
 //the open method of the window object is used to open the cafe photo larger in a new window.
 
 function openClosePopUp(e){
	//define a name and attributes for thePopup window
	 var popupName = 'Large Image';
	 var windowAttributes = 'width=780px, height = 570px, scrollbars=yes,resizable=yes';
	 //Use windowopener to check whether the functioned was called by a popup window.
	 //If it wasn't open a popup, if it was close the popup
	 if (!window.opener){
		 //the function was not called by the popup window, so open a popup
		 var popup = window.open(this.href, popupName, windowAttributes);
		 //check if the window opened successfully. If so give it the focus and prevent the link being follwed as well.
		 if (popup){
			 popup.focus;
			 //if the window open returns a true value, set it to false
			 if (e.returnValue){e.returnValue = false;}
			 //prevent the default behaviour which is to follow the link
			 if(e.preventDefault){e.preventDefault();}
			 return false;
		 }
	 }else{ //otherwise the popup window is calling the function so close the window
		 window.close();
	 }
 }
 
 //we need to add the openClosePopUp event handler to all elements with a class of openCloseImage
 	// - we can use the JQury $(className)
 function addPopupFunction(){
	 //var aClick=document.getElementById('cafe');
	 //access all the elements of class openCloseImage
	 var arrOpenLinks = getElementsByClass('openCloseImage');
	 //exit the function if the array cannot be initialised
	 if(!arrOpenLinks){return;};
	 //add the event handler to each element in the array
	 for (var i = 0; i < arrOpenLinks.length; i++){
		 addEvent(arrOpenLinks[i],'click', openClosePopUp);
	 }
 }
 
 //add this function to thewindows load event
 
 addEvent(window, 'load', addPopupFunction, false);
 
 