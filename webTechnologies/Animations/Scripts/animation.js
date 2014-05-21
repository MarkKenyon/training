/*Create an animation object with an init method to run the animation code
This will ensure that this script is encapsulated and will not interfere with any other Javascript scripts and objects
*/

var Animation = 
{

	/*PROPERTIES*/
	//set the frame rate and the duration of the animation
	frameRate: 25,
	duration: 0.5,
	
	/*FUNCTIONS*/
	
	/*The init function to run the Javascript*/
	init: function()
	{
		//use JQuery to get all the elemnts with an animated class
		var animatedLists = $(".animated");
		
		//loop through all the animated lists
		for (var i = 0, ii = animatedLists.length; i < ii; i++)
		{
			//get all the child nodes of the lists i.e. including list items
			var listContents = animatedLists[i].childNodes;
			
			//loop through all these child nodes and check if they are an element nodeType
			for (var j = 1, jj = listContents.length; j<jj ; j++)
			{
				if (listContents[j].nodeType == 1)
				{
					//create a div to hold the content and give it a class listContent
					//which is styled by the css according to whether the contend is expanded 
					//or collapsed
					var listItemContent = document.createElement("div");
					listItemContent.className = "listContent";
					
					//loop through all the contents of the list items apart from <h3>
					//i.e. all the elements that will be expanded/contracted.
					//and add all these expandable/collapsible elements to the newly 
					//created div (animatedLists)
					
					for (var k = 0; k < listContents[j].childNodes.length; k++)
			        {
			        	if (listContents[j].childNodes[k].nodeName.toLowerCase() !=
			        			"h3")
			        	{
			        		listItemContent.appendChild(listContents[j].childNodes[k]);
			        		//reduce k as a new child has been appended to we need to move
			        		//back an element
			        		k--; 
			        	}
			        }
			        
			        
			        //add the new div (animatedLists) to the listContents element
			        listContents[j].appendChild(listItemContent);
			        //Store the listItemContents i.e. the div containh the collapsable
			        //content in a Custom Property _listContent
			        listContents[j]._listContent = listItemContent;
			        
			        //collapse the list contents
			        Animation.collapse(listContents[j]);
			        //get all the links within the list content
					var listContentLinks = listContents[j].getElementsByTagName("a");
					
					//The name of the team is the first link
					var teamNameLink = listContentLinks[0];
					
					//attach the click listener to this link
					$(teamNameLink).bind("click", Animation.clickListener);
					
					//bind the focus event listener to deal with keyboard tabbing
					for (var k = 1, kk = listContentLinks.length; k < kk; k++)
					{
						$(listContentLinks[k]).bind("focus", Animation.focusListener);
					}
				}
			}
			
			//*****FIND OUT WHAT THIS DOES
			
			if (location.hash.length > 1)
			{
				var activeFold = document.getElementById(location.hash.substring(1));
				if (activeFold && activeFold.parentNode == animatedLists[i])
				{
					Animation.expand(activeFold);
				}
			}
		}
	},
	
	/*Function to collapse a list item i.e. a team*/
	
	collapse: function (listItem)
	{
		//create a variable to hold the contents of the list item using a custom property (_listContent)
		var listContent = listItem._listContent;
		
		//set the height and increments custom properties for the list contents
		listContent._height = parseInt(listContent.style.height, 10);
		listContent._increment = listContent._height /(Animation.frameRate * Animation.duration);
		
		//Check if the list item is expanded
		// - if it is clear the animation timer and collapse it with Animation
		// - it it isn't - add the class collapsed to the listItem
		//Use $JQuery methods
		if ($(listItem).hasClass("expanded"))
		{
			clearTimeout(listItem._listContent._timer);
			Animation.collapseAnimate(listItem._listContent);
		}
		else
		{
			$(listItem).addClass("collapsed");
		}
	},
	
	/*Function to animate the collapsing of listContent*/
	
	collapseAnimate: function(content)
	{
		//reduce the new height by the set increment
		var newHeight = content._height - content._increment;
		
		//if the new height is less than 0 then the content is collapsed
		// - set the new height to 0
		// - remove the class expanded from the list element (the parent) and add the class collapsed
		if (newHeight < 0)
		{
			newHeight = 0;
			$(content.parentNode).removeClass("expanded");
			$(content.parentNode).addClass("collapsed");
		}
		// if the new height is not less than 0 then the content is still expanded
		// - decrement the height by the increment again so the height is gradually 
		//   reduced to less than 0, by assigning a function (nextFrame()) and setting
		//	 this function to a Timeout via the custom property _timer so that we can
		//	 clear the timeout if necessary
		else
		{
			var nextFrame = function()
			{
				Animation.collapseAnimate(content);
			};
			
			content._timer = setTimeout(nextFrame, 1000 / Animation.frameRate);
		}
		
		//set the _height custom property to the new height (0) and set the height of the 
		//listContent to the newHeight.
		content._height = newHeight;
		content.style.height = Math.round(newHeight) + "px";
	},
	
	/*Function to collapse all the list content*/
	
	collapseAll: function(listItem)
	{
		//Access all the content of the list item this contractable.
		//Call collapse on each item
		var listContents = listItem.childNodes;
		for (var i = 0, ii = listContents.length; i < ii; i++)
		{
			if (listContents[i].nodeType == 1) //if the node is an element node
			{
				Animation.collapse(listContents[i]);
			}
		}
	},
	
	expand: function(listItem)
	{
		// Access the list content via the _listContent custom property
		var listContent = listItem._listContent;
		
		//if the list item isn't expanded
		// - reset all the list items by collapsing them all
		// - set the height and _height custom property to 0
		// - remove the collapsed class and add the expanded class
		// - set the increment rate
		// - call the expandAnimate() company on the content
		if (!$(listItem).hasClass("expanded"))
		{
			Animation.collapseAll(listItem.parentNode);
			listContent.style.height = "0";
			listContent._height = 0;
			$(listItem).removeClass("collapsed");
			$(listItem).addClass("expanded");
			listContent._increment = listContent.scrollHeight/(Animation.frameRate * Animation.duration);
			Animation.expandAnimate(listContent);
		}
	},
	
	/*Function to animate the expansion of the list content*/
	
	expandAnimate: function(content)
	{
		//expand the new height by the _increment custom property
		var newHeight = content._height + content._increment;
		
		//if the new height is greater than the scrollHeight (the height of the 
		//scroll view of an element)
		//Set the new height to the scrollHeight
		if (newHeight > content.scrollHeight)
		{
			newHeight = content.scrollHeight;
		}
		//otherwise expand the list content with animation
		else
		{
			var nextFrame = function()
			{
				Animation.expandAnimate(content);
			};
			
			//set the timeout
			content._timer = setTimeout(nextFrame, 1000 / Animation.frameRate);
		}
		
		//set the content properties
		content._height = newHeight;
		content.style.height = Math.round(newHeight) + "px";
		content.scrollTop = 0;
	},
	
	/*Define the click event listener function*/
	
	clickListener: function(event)
	{
		//access the list content
		var listContent = this.parentNode.parentNode;
		
		//If the element has a class of collapsed, expand the content
		//otherwise collapse the content
		if ($(listContent).hasClass("collapsed"))
		{
			Animation.expand(listContent);
		}
		else
		{
			Animation.collapse(listContent);
		}
		
		//stop the default action i.e. following the link
		event.preventDefault();
	},
	
	/*Define the focus listener event to deal with users tapping to the element*/
	
	focusListener: function(event)
	{
		//Set the element to the element calling the function
		var element = this;
		
		//check that the element (i.e. the <ul>) exists
		while (element.parentNode)
		{
			//if the list is set to be an animated list, expand the element that has focusListener
			if ($(element.parentNode).hasClass("animated"))
			{
				Animation.expand(element);
				return;
			}
			element = element.parentNode;
		}
	}	

};

//call the init method
Animation.init();