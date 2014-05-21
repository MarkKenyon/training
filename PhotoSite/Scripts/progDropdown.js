/****************************************************************************************
 * PROGRESSIVE JAVASCRIPT
 * 
 * The aim is to sue Jvascript to prgreesively enhance usability on a site, whilst still providing
 * productive functionality for users without Javascript.
 * The basic approach is to have a HTML structure in place for non Javascript users. However, if 
 * Javascript is enabled we use the DOM to alter the HHTML to hide the dropdown boxes, which  then 
 * become visible on hover.
 * This requires 
 *   - changing the <p> elements that hold the Dropdown headings in the static HTML to <a> 
 *     elements so we can associate a hover event with them.
 *   - applying a class 'hide' to these <li> elements  on page load and then using the 
 *     css cascade to show the sibling <div> in response to a hover event on the <a> toplink
 *     element.
 *************************************************************************************/

/*************************************************************************************
 * GENERIC FUNCTIONS
 *************************************************************************************/
/************************************************************************************************
 * Name: 			addEvent()
 * Arguments: 		element - the  element on which to register the event handler
 * 					eventType the type of event e.g. click, mouseover, mouseout etc
 * 					fn - function that will handle the event i.e. the event handler
 * 					useCapture - a boolean value that determines whether the default
 * 					behaviour associted with the event type on the element will be also
 * 					triggered e.g. a click event on an <a> element will by default open
 * 					the link in a new page.
 * Returns: 		Nothing
 * Error Handling: 	None 
 * Constraints: 	The element must be a valid element within the document
 * 					The prefix 'on' is not required for the event type
 * 					The function (fn) must be defined.
 * Purpose: 		To set an event handler (fn) to the event (eventType) for the
 * 					element (element).
 * Author:			Scott Andrew
 * Date Created:	Not Known
 * Last Modified	
 ***************************************************************************************************/
//The addEvent function easliy adds functions to events. It was written by Scott Andrew.
function addEvent(element, eventType, fn, useCapture){
	//crossbrowser event handling for IE5+, NS6 and Mozilla/Gecko
	if (element.addEventListener){ //IE
		element.addEventListener (eventType, fn,useCapture);
		return true;
	} else if(element.attachEvent){ //NS
		var eventHandler = element.attachEvent('on' + eventType, fn);
		return eventHandler;
	} else { //Mozilla/Gecko
		element['on' + eventType]= fn;
	}
}

/************************************************************************************************
 * Name: 			alterClass()
 * Arguments: 		action - the type of manipulation e.g. check, add, remove etc
 * 					element - the  element on which to apply the changes
 * 					class1 - the name of the class to check, remove, etc
 * 					class2 (optional) - class1 will be replaced (swapped) with class2.
 * 					Only required if the action is swap.
 * Returns: 		Nothing
 * Error Handling: 	None 
 * Constraints: 	None
 * Purpose: 		Manipulates the class property associted with an element. It can check
 * 					if a class is associated with an element as well add, delete and swap classes
 * 					on an element.
 * Author:			Scott Andrew
 * Date Created:	Not Known
 * Last Modified	
 ***************************************************************************************************/
//The alterClass function allows manipulation of class names
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

/*********************************************************************************************************
 * Page Specific Functions
 ********************************************************************************************************/
/************************************************************************************************
 * Name: 			createDropdown()
 * Arguments: 		None
 * Returns: 		Nothing
 * Error Handling: 	Checks that the DOM is supported. If not it exits. 
 * Constraints: 	None
 * Purpose: 		Initialise the page and set the HTML elements that use Javascript via the DOM. 
 * 					These elements will only be created if Javascript is enabled.
 * 					Adds the 'hide' class to the toplevel links (<li>'s) so that the underlying dropdown
 * 					<div>'s are hidden on page load.
 * Author:			Mark Kenyon
 * Date Created:	25th February 2010
 * Last Modified	
 ***************************************************************************************************/
/*******************************************************************************************************
 * Initialise the page. Set the HTML elements that use Javascript via the DOM. they will only be created
 * if Javascript is enabled.
 * Add the 'hide' class to the toplevel links (<li>'s) so that they are hidden on page load.
 ******************************************************************************************************/

//A function to change the <p> element of the toplinks to an <a> element allowing for well supported
//hover events to be added
function createDropdown(){
	 //check the dom is accessible
	 if(!document.getElementById||!document.createTextNode){return;}
	 //assign variables to the <p> elements. These are the first children of the <li> elements
	 //held with in the <ul #maincontent>.
	 
	 var ulContainer = document.getElementById('mainContent');
	 //If the ul cintainer does not exist then return
	 if(!ulContainer){return;}
	 //access all the <li> elements within the container
	 var arrListElements=ulContainer.getElementsByTagName('li');

	 //create a variable to hold the <p> text
	 var headingText;
	 
	 //loop through all the list elements replacing the<p> elements with
	 // <a> elements
	    for(var i=0;i<arrListElements.length;i++) {   
	    	//access the text value of the first child (The <p> element)
	    	headingText=arrListElements[i].firstChild.firstChild.nodeValue;
	    	//add this as the text for the new <a> link
	   	 //Create a placeholder for new <a> links
		    newaLink = document.createElement('a');
	    	newaLink.appendChild(document.createTextNode(headingText));
	    	//Replace the <p. element with the <a> element
	    	arrListElements[i].replaceChild(newaLink,arrListElements[i].firstChild);
		    //add the hide class to each <li> element (Insert|Edit|Delete etc
	    	arrListElements[i].className='hide';
	    }
}




/*********************************************************************************************************
 * Add the functions required on page load.
 ********************************************************************************************************/
 
//Define the anonymous window onload function that we use to add any functions that need to be available
//when the document has loaded
window.onload = function(){
	if(!document.getElementById || !document.createTextNode){return;}
	//Any following code will only be implemented if the DOM is supported and implemented.
	
	//Load a function to enable dropdown boxes if  the user has Javascript enabled
	createDropdown();

};