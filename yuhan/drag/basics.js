/* Decorate Your Christmas Tree!
 *
 * Chiristmas greetings from a playful web app!
 * Instruction:
 * 	- Drag elements from the hanging decorations and place them onto the tree; if not onto the tree, elements will simply disappear.
 *	- Move elements on the tree to adjust position; at this time, you can place them anywhere.
 *  - While moving elements on the tree, a semi-transparant red cross will show up: drag things onto the cross to delete them.
 *	- Click on the bulb to switch between day and night.
 * 
 */

// variables
var numLoaded=0;						// number of loaded images
var numImage=0;							// number of added images
var deco = [];							// array of hanging decorations (img)
var decoHolder = [];					// array of hanging decoration holders (div)
var line = [];							// array of hanging strings
var menu = [];							// array of pull-down menus (dl)
var menuHolder = [];					// array of pull-down menu holders (div)
var items = [];							// array of element holders (dt)
var element = [];						// array of elements (img)
var cloneCounter = 0;					// counter of dragged-down elements 
var originX, originY;					// record original position of a draggable element
var offsetX, offsetY;					// record the vector of mouse movement
var index=1;							// control the z-index of dragged-down elements
var lightState = false;					// switch between day and night
var glowState = 1;						// control the shining effect of tree 
var glowControl;						// record timer id of setInterval
var cardid;
//	preset dimensions						
var decoWidth = screen.width/27;		
var eleSpace = screen.height/40;
var deleteX = screen.width*4/5;         
var deleteY = screen.height/2.5;



/* Document Ready
 * calls a set of functions
 */
$(document).ready(function(){
	
	initialize();
	draw();
	interaction();
	lighting();
	
	// each time an image is loaded, re-call interaction() and lighting() 
	$("img").load( function(){
		console.log("image loaded");
		interaction();
		lighting();
	});
 });


/* Initialize Elements
 * - set properties of the hanging decorations and their pull-down menus
 * - create a static look of the website
 */
function initialize() {
	
	// set the position of "red cross" 
	$(".delete").css({"left": deleteX+"px", "top": deleteY+"px"});
	// hide the "red cross" at the beginning
	$("#cross").hide();
	
	
	// set properties of hanging decorations
	for (var i = 0; i< 8; i++)
	{   
	    var tempLeft, tempTop;
	    
		// set decorations and their div holders
		decoHolder[i] = $("<div></div>");
		decoHolder[i].attr("id", "decoHolder"+ i);
		deco[i] = $("<img></img>");
		deco[i].attr("src", "image/"+i+".png");
		deco[i].addClass("deco");
		deco[i].attr("id", "deco" + i);
		deco[i].css("cursor", "pointer");
		deco[i].css("max-width", decoWidth+"px");
		decoHolder[i].append( deco[i] );
		decoHolder[i].css( "position", "fixed") ;
		
		// create a curve look of the arrangement of decorations
		if(i<4)
		{
			tempLeft = (screen.width / 10 * (i+1) - decoWidth/2) + "px" ;	
		}
		else
		{
			tempLeft = (screen.width / 10 * (i+2)  - decoWidth/2 ) + "px";
		}
		tempTop = (screen.width/20 + screen.width/55 * Math.sin((i+1) * 3.5)) +"px";
		
		// set decoration holders' position
		decoHolder[i].css( "left", tempLeft);
		decoHolder[i].css ("top", tempTop);
		
		
		// set hanging strings
		line[i] = $("<img></img>");
		line[i].attr("src", "image/line.png");
		line[i].attr("id", "line" + i);
		line[i].css( {"position" : "fixed", "top" : "0px"} );
		line[i].css( "left", parseInt(tempLeft) + decoWidth/2 + "px");
		line[i].css( {"width" : "1px", "height" : tempTop });
		
		
		// set pull-down menus
		element[i] = [];
		items[i] = [];
		menuHolder[i] = $("<div></div>");
		menuHolder[i].addClass("menu");
		menuHolder[i].attr( "id", "menuHolder" + i);
		menuHolder[i].css("display","block");
		menu[i] = $("<dl></dl>");
		menu[i].attr("id", "menu" + i);
		menu[i].css( {"margin-top" : "0px", "margin-left" : "0px"});
		menuHolder[i].append( menu[i] );
		menuHolder[i].css("position", "fixed");
		menuHolder[i].css("left", tempLeft);
		menuHolder[i].css("top", tempTop);
		
		
		// set menu items
		for (var j = 0; j < 5; j++)
		{	
			element[i][j] = $("<img></img>");
			element[i][j].addClass("elem");
			element[i][j].attr("id", "elem"+ i + "" + j);
			element[i][j].attr("src", "image/"+i+""+j+".png");
			element[i][j].css("max-width", decoWidth+"px");
			element[i][j].css("margin-bottom", eleSpace + "px");
			element[i][j].css("cursor", "pointer");
			items[i][j] = $("<dt></dt>");
			items[i][j].append( element[i][j] );
			menu[i].append( items[i][j] );
		}
	}	
}


/* Draw Visible Elements
 * set the properties of hanging decorations and their pull-down menus
 */
function draw() {
	
	for (var i = 0; i<8; i++)
	{
		$("body").append( decoHolder[i] );
		$("body").append( line[i] );
		$("body").append( menuHolder[i] );
		menuHolder[i].hide();	
	}
}


/* Manage Decoration Menu Interaction
 * - register event listeners to elements of interest;
 * - define behaviors of interactive elements;
 * - set transitions and the next state
 */
function interaction() {
		
		// when clicked anywhere other than ".menu", ".deco" and ".elem" classes,
		// slide up the active pull-down menu 
	    var pullup = $("body");//.not(".menu, .deco, .elem");
		pullup.click( function(e){
			if( !($(e.target).is(".menu, .deco, .elem")) ) 
			{
				$(".menu").slideUp("slow");
			}
		});
		
		
		// when mouse hovers over any hanging decorations,
		// slide down the associated pull-down menu
		$(".deco").mouseenter(function(e){
			var id = e.target.id + "";
			var num = id.match(/\d/g);
			
			// force sliding up other pull-down menus
			// once starting a new one
			for (var i =0; i<8; i++)
			{
				if( (i+"") != num )
				$("#menuHolder" + i).slideUp("slow");
			}
			
			// slide down the menu in focus
			$("#menuHolder"+num ).slideDown("slow");	
			
		});
		
		
		// make hanging decorations draggable,
		// and the clone will be dragged instead of the original element 
		$(".deco").draggable({
			helper: "clone",
			opacity: 0.8,
			
			start: function(event, ui){ 
				// record original position of the element
				originX = event.target.x;
				originY = event.target.y;
				// record original position of the mouse
				offsetX = event.clientX;
				offsetY = event.clientY;
				// if in night mode, stop the tree shining effect
				if( lightState) 
				{
					console.log(glowControl);
					clearInterval(glowControl);
				}	
				// set tree look to "invite dropping"
				//$("#tree").attr("src", "image/card1.png");
			},
			
			stop: function(){
				// if in night mode, restart the tree shining effect
			    if(lightState)
				{
					glowControl = setInterval( function(){
					//treeShine();
   					}, 300);
				}
				// otherwise, change the tree to its normal look
				else
				{
					//$("#tree").attr("src", "image/card1.png");
				}
			
			}
		});
		
		
		// make menu items draggable,
		// and a clone will be dragged instead of the original one
		// works the same with ".deco" draggable as above
		$(".elem").draggable({
			helper: "clone",
			opacity: 0.8,
			
			start: function(event, ui){ 
				// record original position of the element
				originX = event.target.x;
				originY = event.target.y;
				// record original position of the mouse
				offsetX = event.clientX;
				offsetY = event.clientY;
				// if in night mode, stop the tree shining effect
				if( lightState) 
				{
					clearInterval(glowControl);
				}
				// set tree look to "invite dropping"
				//$("#tree").attr("src", "image/card1want.png");
				
			},
			
			stop: function(){
				// if in night mode, restart the tree shining effect
			    if(lightState)
				{
					glowControl = setInterval( function(){
						//treeShine();
   					}, 300);
				}
				// otherwise, change the tree to its normal look
				else
				{
					//$("#tree").attr("src", "image/card1.png");
				}
			
			}
		});
		
		
		// make the tree droppable 
		$("#tree").droppable({
			over: function() { 
				// if in night mode, stop the tree shining effect
				if( lightState) 
				{
					clearInterval(glowControl);
				}
				// set tree look to "valid dropping area"
				//$("#tree").attr("src", "image/card1hover.png"); 
				}, 
			
			out: function() { 
				// if in night mode, stop the tree shining effect
				if( lightState) 
				{
					clearInterval(glowControl);
				}
				// set tree look to "invite dropping"
				//$("#tree").attr("src", "image/card1want.png"); 
			},
			
			drop: function(event, ui) {
				// calculate the vector of mouse movement
				offsetX = event.clientX - offsetX;
				offsetY = event.clientY - offsetY;
				
				// if a cloned element is dropped
				if ( $(ui.draggable).hasClass("clone") )
				{
					console.log("clone dropped");
					// hide again the "red cross"
					$("#cross").attr("src", "image/cross.png"); 
					$("#cross").hide();
				}
				// if a first-dragged-down element is dropped
				else
				{
					console.log("first dropped");
					// reset properties of the clone
					$(ui.helper).clone().removeClass('ui-draggable ui-draggable-dragging elem deco').addClass('clone').attr("id","clone"+cloneCounter).appendTo("body");
					// reset the position of the clone
					$("#clone"+cloneCounter).offset({left: originX + offsetX, top: originY + offsetY }).css("opacity", "1"); 
					// add up to the clone counter
					cloneCounter++;
				
				}
				
			}
		});
				
		
		// make cloned (dragged-down) elements draggable
		$(".clone").css("cursor", "move").draggable({
			opacity: 1,
			
			start: function(event, ui){ 
				// show the "red cross" to enable delete
				$("#cross").show();
				// if in night mode, stop the tree shinning effect
				if( lightState) 
				{
					clearInterval(glowControl);
				}	
			},
			
			drag: function(event, ui){
				// rearrage the z-index of the element being dragged
				$(this).css("z-index", index+"");
				// make it on top
				index++;
			},
			
			stop: function(event, ui){
				// set the "red cross" to semi-transparent 
				$("#cross").attr("src", "image/cross.png");
				// hide the "red cross" 
				$("#cross").hide();
				// if in night mode, restart the tree shining effect
				if(lightState)
				{
					glowControl = setInterval( function(){
						//treeShine();
   					}, 300);
				}
				// otherwise, change the look of the tree to normal 
				else
				{
					//$("#tree").attr("src", "image/card1.png");
				}
			}
		});
		
		
		// make the "red cross" droppable
		$("#cross").droppable({
			// when hovered over, change the opacity to 1
			over: function() { $("#cross").attr("src", "image/crosshover.png"); }, 
			
			// when out of valid area, make it semi-transparent
			out: function() { $("#cross").attr("src", "image/cross.png"); },
			
			drop: function(event, ui) {
				// delete the element dragged onto the "red cross"
				ui.draggable.remove();
				// update clone counter
				cloneCounter--;
				// change the "red cross" to semi-transparent
				$("#cross").attr("src", "image/cross.png"); 
				// hide the "red cross"
				$("#cross").hide();
				// if in night mode, restart the tree shinning effect
				if(lightState)
				{
					glowControl = setInterval( function(){
						//treeShine();
   					}, 300);
				}
				// otherwise, change the tree look back to normal
				else
				{
					//$("#tree").attr("src", "image/card1.png");
				}
			}
		});
		

}


/* Control Tree Lighting
 * - click the bulb to switch between day and night
 */
function lighting() {
	
	// register click event to the bulb
	$("#bulb").unbind('click').click(function(){
		console.log(lightState);
		// if clicked in day mode
		if( !lightState)
		{
			// darken the environment and turn on the tree lights
			$("#bulb").attr("src", "image/bulbon.png");
			$("#back").attr("src", "image/darkbackground.png");
			
			// start tree shining effect
			glowControl = setInterval( function(){
				//treeShine();
				console.log(glowState);
   			}, 300);
			
			// initially set the tree look 
			//$("#tree").attr("src", "image/treeglow1.png");
			
			// update the light state
		    lightState = true;
		}
		// if clicked in night mode
		else
		{
			// light up the environment and turn off the tree lights
			$("#bulb").attr("src", "image/bulboff.png");
			$("#back").attr("src", "image/redbackground.png");
			
			// stop the tree shining effect
			clearInterval(glowControl);
			//$("#tree").attr("src", "image/tree.png");
			
			// update the light state
		    lightState = false;
		}
	});	
}


/* Create Tree Shinning Effect
 * - loop through a set of tree images 
 */
// function treeShine()
// {
// 	var tree = $("#tree");
	
// 	// loop from 1 to 8
// 	if ( glowState === 9)
// 	{
// 		glowState = 1;
// 	}
// 	tree.attr("src", "image/treeglow"+glowState+".png");
// 	glowState++;
// }