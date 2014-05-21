var TeamWidget =
{
	init: function()
	{
		//access the team widget.
		var teamWidget = document.getElementById("teamKits");
		//get the anchors i.e. the team links
		var anchors = teamWidget.getElementsByTagName("a");

		//loop through the anchors adding clickListener function to the click event
		for (var i = 0; i < anchors.length; i++)
		{
			$(anchors[i]).bind("click", TeamWidget.clickListener);
		}
	},
	
	clickListener: function(event)
	{
		//Create an HTTP request object across all browsers
		//use a try block to catch any errors thrown by Internet Explorer
		try
		{
			var requester = new XMLHttpRequest();
		}
		catch (error)
		{
			try
			{
				var requester = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (error)
			{
				var requester = null;
			}
		}

		if (requester != null)
		{
			
			//capture the link making the request and set a timeout handler to abort
			//the request if it is taking too long
			var teamLink = this;
			
			var timeoutHandler = function()
			{
				requester.abort();
			
				TeamWidget.writeError("The server timed out while making your request.");
			};
			teamLink._timer = setTimeout(timeoutHandler, 10000);
			
			
			//get the team referenced in the link
			var team = this.firstChild.nodeValue;
			
			
			//create the request - it will be sent to the php page that handles the request.
			//the request will be a GET request using a query string.
			requester.open("GET", "ajax_kits.php?team=" + encodeURIComponent(team), true);
			
			//check the response state.
			requester.onreadystatechange = function()
			{
				if (requester.readyState == 4)
				{
					clearTimeout(teamLink._timer);
					
					if (requester.status == 200 || requester.status == 304)
					{
						TeamWidget.writeUpdate(requester.responseXML);
					}
					else
					{
						TeamWidget.writeError("The server was unable to be contacted.");
					}
				}
			};
			
			//send the request
			requester.send(null);
			
			//prevent the link being followed.
			event.preventDefault();
		}
	},
	
	//deal with the response from the Ajax request.
	//build up the HTML to show the info returned.
	writeUpdate: function(responseXML)
	{
		var nameNode = responseXML.getElementsByTagName("name")[0];
		var nameTextNode = nameNode.firstChild;
		var name = nameTextNode.nodeValue;

		var groundNode = responseXML.getElementsByTagName("ground")[0];
		var groundTextNode = groundNode.firstChild;
		var ground = groundTextNode.nodeValue;

		var yearFormedNode = responseXML.getElementsByTagName("yearFormed")[0];
		var yearFormedTextNode = yearFormedNode.firstChild;
		var yearFormed = yearFormedTextNode.nodeValue;
	
	
		var teamKits = document.getElementById("teamKits");
		while (teamKits.hasChildNodes())
		{
			teamKits.removeChild(teamKits.firstChild);
		}
		
		/**********UP TO HERE**********************/
		
		var h2 = document.createElement("h2");
		h2.appendChild(document.createTextNode(name + " Details"));
		teamKits.appendChild(h2);
		
		var div = document.createElement("div");
		div.setAttribute("id", "ground");
		div.appendChild(document.createTextNode("Ground: " + ground));
		teamKits.appendChild(div);
		
		var paragraph = document.createElement("p");
		paragraph.setAttribute("id", "yearFormed");
		paragraph.appendChild(document.createTextNode("Year Formed: " + yearFormed));
		div.appendChild(paragraph);
		
		var backLink = document.createElement("a");
		backLink.setAttribute("href", "teamsWidget.html");
		backLink.appendChild (document.createTextNode("back"));
		div.appendChild(backLink);
	},
	
	//handle any errors 
	writeError: function(errorMsg)
	{
		alert(errorMsg);
	}
};

TeamWidget.init();