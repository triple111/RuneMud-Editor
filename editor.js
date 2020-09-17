class Room {
	constructor(tileID) {
		this.roomName = "Blank";
		this.color = "ppp000";
		this.north = true;
		this.east = true;
		this.south = true;
		this.west = true;
		this.tile = document.createElement("div"); //create parent div
		this.tile.className = "tile-wrapper";
		this.tile.id = tileID; //assign a number to the tile for identification
		this.tile.addEventListener("click", function () { clickedOnTile(this.id) }); //click calls selectTile with this tile's ID
		this.tileSpanLeft = document.createElement("span"); //create spans for each letter for colorization
		this.tileSpanLeft.innerHTML = ".";
		this.tileSpanLeft.id = tileID + "left";
		this.tileSpanCenter = document.createElement("span");
		this.tileSpanCenter.innerHTML = ".";
		this.tileSpanCenter.id = tileID + "center";
		this.tileSpanRight = document.createElement("span");
		this.tileSpanRight.innerHTML = ".";
		this.tileSpanRight.id = tileID + "right";
		this.tile.appendChild(this.tileSpanLeft); //add spans to parent div
		this.tile.appendChild(this.tileSpanCenter);
		this.tile.appendChild(this.tileSpanRight);
		loadTileColor(this);
		document.getElementById("mapcanvas").appendChild(this.tile); //add div to mapcanvas
	}
}

//Program Start
const MAPCANVAS = document.getElementById("mapcanvas");
const BRUSH_SPAN1 = document.getElementById("brushSpan0");
const BRUSH_SPAN2 = document.getElementById("brushSpan1");
const BRUSH_SPAN3 = document.getElementById("brushSpan2");
const INPUT_TILESTYLE = document.getElementById("inputTilestyle");
const fs = require('fs');
const dom = require('xmldom');
const keycode = require('keycode');

var editMode = 0; //1=selection, 2=paint, 3=border
var selectedSpan = 0;
var hoveredTileId = 0;
var brushFG = ["p", "p", "p"]; //stores brush span fg colors
var brushBG = ["0", "0", "0"]; //stores brush span bg colors
var rooms = []; //array of rooms
var xMax = 100;
var yMax = 100;

var id = 0
for (var y = 0; y < yMax; y++) { //create grid of wrappers/spans, xMax by yMax in dimension
	for (var x = 0; x < xMax; x++) {
		rooms.push(new Room(id));
		id++;
	}
	var tileBreak = document.createElement("br"); tileBreak.style.clear = "both"; //create linebreak for div rows
	MAPCANVAS.appendChild(tileBreak);
}

//---------------------------------FUNCTIONS-------------------------------------------------------

document.onmouseover = function (e) { //get ID of hovered tile
	tryId = e.target.parentNode.id;
	if (rooms[tryId] != null) { //make sure that cursor is over a tile not a UI element
		hoveredTileId = e.target.parentNode.id;
	}
}

document.addEventListener('keydown', function (e) {
	if (editMode === 2) { //if we are in border mode
		if (keycode(e) === "w") {
			makeBorder("north", hoveredTileId);
		}
		if (keycode(e) === "d") {
			makeBorder("east", hoveredTileId);
		}
		if (keycode(e) === "s") {
			makeBorder("south", hoveredTileId);
		}
		if (keycode(e) === "a") {
			makeBorder("west", hoveredTileId);
		}
	}
})

function changeEditMode(newMode) {
	editMode = newMode;

	if (editMode === 0) {
		resetAllBorders();
	}

	if (editMode === 1) {
		resetAllBorders();
	}

	if (editMode === 2) { //border mode
		for (var i = 0; i < rooms.length; i++) {
			drawBorder(i); //set initial border appearance based off NESW booleans
		}
	}
}

function clickedOnTile(id) {
	if (editMode === 1) {
		paintTile(id); //paint the brush onto the tile
	}

	if (editMode === 2) {
	}
}

function updateFormatter() {
	BRUSH_SPAN1.innerHTML = INPUT_TILESTYLE.value.charAt(0);
	BRUSH_SPAN2.innerHTML = INPUT_TILESTYLE.value.charAt(1);
	BRUSH_SPAN3.innerHTML = INPUT_TILESTYLE.value.charAt(2);
}

function loadTileColor(tile) {
	tile.tileSpanLeft.style.color = colorcodeToRGB(tile.color.charAt(0)); //set tileSpan to the Brush
	tile.tileSpanCenter.style.color = colorcodeToRGB(tile.color.charAt(1));
	tile.tileSpanRight.style.color = colorcodeToRGB(tile.color.charAt(2));
	tile.tileSpanLeft.style.backgroundColor = colorcodeToRGB(tile.color.charAt(3)); //set tileSpan to the Brush
	tile.tileSpanCenter.style.backgroundColor = colorcodeToRGB(tile.color.charAt(4));
	tile.tileSpanRight.style.backgroundColor = colorcodeToRGB(tile.color.charAt(5));
}

function paintTile(id) {
	var tile = rooms[id]; //load tile for painting

	tile.tileSpanLeft.innerHTML = BRUSH_SPAN1.innerHTML; //set tileSpan to the Brush
	tile.tileSpanCenter.innerHTML = BRUSH_SPAN2.innerHTML;
	tile.tileSpanRight.innerHTML = BRUSH_SPAN3.innerHTML;

	tile.color = brushFG[0] + brushFG[1] + brushFG[2] + brushBG[0] + brushBG[1] + brushBG[2];
	loadTileColor(tile);
}

function makeBorder(direction, id) {
	if (direction === "north") {
		rooms[id].north = !rooms[id].north; //flip true/false of room borders
	}
	if (direction === "east") {
		rooms[id].east = !rooms[id].east;
	}
	if (direction === "south") {
		rooms[id].south = !rooms[id].south;
	}
	if (direction === "west") {
		rooms[id].west = !rooms[id].west;
	}

	drawBorder(id);
}

function drawBorder(id) {
	if (rooms[id].north === false) {
		rooms[id].tile.style.borderTop = "1px solid red";
	}
	if (rooms[id].east === false) {
		rooms[id].tile.style.borderRight = "1px solid red";
	}
	if (rooms[id].south === false) {
		rooms[id].tile.style.borderBottom = "1px solid red";
	}
	if (rooms[id].west === false) {
		rooms[id].tile.style.borderLeft = "1px solid red";
	}
	if (rooms[id].north === true) {
		rooms[id].tile.style.borderTop = "1px solid black";
	}
	if (rooms[id].east === true) {
		rooms[id].tile.style.borderRight = "1px solid black";
	}
	if (rooms[id].south === true) {
		rooms[id].tile.style.borderBottom = "1px solid black";
	}
	if (rooms[id].west === true) {
		rooms[id].tile.style.borderLeft = "1px solid black";
	}
}

function resetAllBorders() {
	for (var i = 0; i < rooms.length; i++) {
		rooms[i].tile.style.border = "1px solid black";
		//rooms[i].tile.removeAttribute("style");
	}
}

function colorSpanFG(color) {
	var spanToColor = document.getElementById("brushSpan" + selectedSpan); //select brush span to color
	spanToColor.style.color = colorcodeToRGB(color); //change foreground color 
	brushFG[selectedSpan] = color; //save color to variable
}

function colorSpanBG(color) {
	var spanToColor = document.getElementById("brushSpan" + selectedSpan);  //select brush span to color
	spanToColor.style.backgroundColor = colorcodeToRGB(color); //change foreground color 
	brushBG[selectedSpan] = color; //save color to variable
}

function colorcodeToRGB(color) {
	if (color === "0") { return "rgb(0,0,0)"; }
	if (color === "1") { return "rgb(128,0,0)"; }
	if (color === "2") { return "rgb(0,128,0)"; }
	if (color === "3") { return "rgb(128,128,0)"; }
	if (color === "4") { return "rgb(0,0,128)"; }
	if (color === "5") { return "rgb(128,0,128)"; }
	if (color === "6") { return "rgb(0,128,128)"; }
	if (color === "7") { return "rgb(192,192,192)"; }
	if (color === "a") { return "rgb(128,128,128)"; }
	if (color === "b") { return "rgb(255,0,0)"; }
	if (color === "c") { return "rgb(0,255,0)"; }
	if (color === "d") { return "rgb(255,255,0)"; }
	if (color === "e") { return "rgb(0,0,255)"; }
	if (color === "f") { return "rgb(255,0,255)"; }
	if (color === "g") { return "rgb(0,255,255)"; }
	if (color === "h") { return "rgb(255,255,255)"; }
	if (color === "i") { return "rgb(0,0,0)"; }
	if (color === "j") { return "rgb(128,0,0)"; }
	if (color === "k") { return "rgb(0,128,0)"; }
	if (color === "l") { return "rgb(128,128,0)"; }
	if (color === "m") { return "rgb(0,0,128)"; }
	if (color === "n") { return "rgb(128,0,128)"; }
	if (color === "o") { return "rgb(0,128,128)"; }
	if (color === "p") { return "rgb(192,192,192)"; }
}

function loadMap() {

	//loads map xml data synchronously
	try {
		var xml = fs.readFileSync('roomdb.xml', 'utf8');
	}
	catch (e) {
		console.log('Error:', e.stack);
	}

	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xml, "text/xml"); //parse xml string
	var nodes = xmlDoc.getElementsByTagName("Room"); //get list of room nodes

	if (nodes.length === rooms.length) {
		for (var i = 0; i < nodes.length; i++) { //iterate over list of room nodes and load room properties
			rooms[i].roomName = nodes[i].getElementsByTagName("name")[0].innerHTML; //load room name
			var tileString = nodes[i].getElementsByTagName("tile")[0].innerHTML; //load tile characters
			rooms[i].tileSpanLeft.innerHTML = tileString.charAt(0); //set tilespans to tile characters
			rooms[i].tileSpanCenter.innerHTML = tileString.charAt(1);
			rooms[i].tileSpanRight.innerHTML = tileString.charAt(2);
			rooms[i].color = nodes[i].getElementsByTagName("color")[0].innerHTML; //load room colorcodes
			var borderString = nodes[i].getElementsByTagName("borders")[0].innerHTML;
			rooms[i].north = Boolean(Number(borderString.charAt(0)));
			rooms[i].east = Boolean(Number(borderString.charAt(1)));
			rooms[i].south = Boolean(Number(borderString.charAt(2)));
			rooms[i].west = Boolean(Number(borderString.charAt(3)));
			loadTileColor(rooms[i]); //updates tile color
		}
		alert("Map Loaded Successfully");
	}
	else {
		alert("Map Size Mismatch");
	}
}

function saveMap() {
	var xw = new XMLWriter();
	xw.formatting = 'indented'; //add indentation and newlines
	xw.indentChar = ' '; // indent with spaces
	xw.indentation = 2; //add 2 spaces per level
	//start document
	xw.writeStartDocument();
	xw.writeStartElement('RoomDB');

	for (var i = 0; i < rooms.length; i++) {
		xw.writeStartElement('Room');
		xw.writeElementString('id', rooms[i].tile.id);
		xw.writeElementString('name', rooms[i].roomName);
		var tileString = rooms[i].tileSpanLeft.innerHTML + rooms[i].tileSpanCenter.innerHTML + rooms[i].tileSpanRight.innerHTML; //make tile string from the tileSpans (XXX etc)
		xw.writeElementString('tile', tileString);
		xw.writeElementString('color', rooms[i].color);
		var borderString = Number(rooms[i].north).toString() + Number(rooms[i].east).toString() + Number(rooms[i].south).toString() + Number(rooms[i].west).toString();
		xw.writeElementString('borders', borderString);
		xw.writeEndElement();

	}
	//end document
	xw.writeEndElement();
	xw.writeEndDocument();

	//display document
	var asString = "";
	if (typeof XMLSerializer !== 'undefined') {
		asString = new XMLSerializer().serializeToString(xw.getDocument());
	} else {
		asString = xw.getDocument().xml;
	}
	fs.writeFile("roomdb.xml", asString, function (err) {
		if (err) {
			return console.log(err);
		}
	})
	alert("Map Saved Successfully");
}
