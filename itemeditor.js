class Item {
    constructor(itemID) {
        this.item = document.createElement("div"); //create parent div
        this.item.className = "item-wrapper";
        this.item.id = itemID; //assign a number to the item for identification
        this.item.addEventListener("click", function () { clickedOnitem(this.id) }); //click calls selectitem with this item's ID

        this.name;
        this.color;
        this.shortname;
        this.shortcolor;

        this.itemID = document.createElement("div");
        this.nameDiv = document.createElement("div");
        this.shortnameDiv = document.createElement("div");
        this.weight = document.createElement("div");
        this.highalch = document.createElement("div");
        this.lowalch = document.createElement("div");
        this.stackable = document.createElement("div");
        this.tradeable = document.createElement("div");
        this.equipable = document.createElement("div");
        this.slot = document.createElement("div");
        this.attackspeed = document.createElement("div");
        this.stabattackbonus = document.createElement("div");
        this.slashattackbonus = document.createElement("div");
        this.crushattackbonus = document.createElement("div");
        this.magicattackbonus = document.createElement("div");
        this.rangedattackbonus = document.createElement("div");
        this.stabdefensebonus = document.createElement("div");
        this.slashdefensebonus = document.createElement("div");
        this.crushdefensebonus = document.createElement("div");
        this.magicdefensebonus = document.createElement("div");
        this.rangeddefensebonus = document.createElement("div");
        this.strengthbonus = document.createElement("div");
        this.prayerbonus = document.createElement("div");


        this.itemID.innerHTML = itemID;
        this.name = "Blank";
        this.color = "";
        this.shortname = "Blank";
        this.shortcolor = "";
        this.weight.innerHTML = "0";
        this.highalch.innerHTML = "0";
        this.lowalch.innerHTML = "0";
        this.stackable.innerHTML = false;
        this.tradeable.innerHTML = true;
        this.equipable.innerHTML = true;
        this.slot.innerHTML = "Blank";
        this.attackspeed.innerHTML = 0;
        this.stabattackbonus.innerHTML = 0;
        this.slashattackbonus.innerHTML = 0;
        this.crushattackbonus.innerHTML = 0;
        this.magicattackbonus.innerHTML = 0;
        this.rangedattackbonus.innerHTML = 0;
        this.stabdefensebonus.innerHTML = 0;
        this.slashdefensebonus.innerHTML = 0;
        this.crushdefensebonus.innerHTML = 0;
        this.magicdefensebonus.innerHTML = 0;
        this.rangeddefensebonus.innerHTML = 0;
        this.strengthbonus.innerHTML = 0;
        this.prayerbonus.innerHTML = 0;

        document.getElementById("itemcanvas").appendChild(this.item); //add div to mapcanvas

        this.item.appendChild(this.itemID);
        this.item.appendChild(this.nameDiv);
        this.item.appendChild(this.shortnameDiv);
        this.item.appendChild(this.weight);
        this.item.appendChild(this.highalch);
        this.item.appendChild(this.lowalch);
        this.item.appendChild(this.stackable);
        this.item.appendChild(this.tradeable);
        this.item.appendChild(this.equipable);
        this.item.appendChild(this.slot);
        this.item.appendChild(this.attackspeed);
        this.item.appendChild(this.stabattackbonus);
        this.item.appendChild(this.slashattackbonus);
        this.item.appendChild(this.crushattackbonus);
        this.item.appendChild(this.magicattackbonus);
        this.item.appendChild(this.rangedattackbonus);
        this.item.appendChild(this.stabdefensebonus);
        this.item.appendChild(this.slashdefensebonus);
        this.item.appendChild(this.crushdefensebonus);
        this.item.appendChild(this.magicdefensebonus);
        this.item.appendChild(this.rangeddefensebonus);
        this.item.appendChild(this.strengthbonus);
        this.item.appendChild(this.prayerbonus);
    }
}


//Program Start
const fs = require('fs');
const dom = require('xmldom');
const keycode = require('keycode');
const { TouchBarSlider } = require('electron');

const ITEMCANVAS = document.getElementById("itemcanvas");
const INFO_ID = document.getElementById("info-itemid");
const INPUT_NAME = document.getElementById("input-name");
const INPUT_COLOR = document.getElementById("input-color");
const INPUT_SHORTNAME = document.getElementById("input-shortname");
const INPUT_SHORTCOLOR = document.getElementById("input-shortcolor");
const INPUT_WEIGHT = document.getElementById("input-weight");
const INPUT_HIGHALC = document.getElementById("input-highalc");
const INPUT_LOWALC = document.getElementById("input-lowalc");
const INPUT_STACKABLE = document.getElementById("input-stackable");
const INPUT_TRADEABLE = document.getElementById("input-tradeable");
const INPUT_EQUIPABLE = document.getElementById("input-equipable");

/*
const INPUT_=document.getElementById("");
const INPUT_=document.getElementById("");
const INPUT_=document.getElementById("");
const INPUT_=document.getElementById("");
const INPUT_=document.getElementById("");
const INPUT_=document.getElementById("");
const INPUT_=document.getElementById("");
const INPUT_=document.getElementById("");
const INPUT_=document.getElementById("");
const INPUT_=document.getElementById("");
*/

var selectedItem;
var items = []; //array of items
var maxItem = 5;
var enterPressed = false;

var id;
/*
for (id = 0; id < maxItem; id++) { //create grid of wrappers/spans, xMax by yMax in dimension
    items.push(new Item(id));
    // var tileBreak = document.createElement("br"); tileBreak.style.clear = "both"; //create linebreak for div rows
    // ITEMCANVAS.appendChild(tileBreak);
}
*/
//-------------------------------------EVENT LISTENERS-------------------------------------------------------

document.addEventListener('keydown', function (e) {
    if (keycode(e) === "enter") {
        enterPressed = true;
        console.log(enterPressed);
    }
})
//-------------------------------------FUNCTIONS-------------------------------------------------------
function clickedOnitem(id) {
    selectedItem = id;
    INPUT_NAME.value = items[selectedItem].name;
    INPUT_COLOR.value = items[selectedItem].color;
    INPUT_SHORTNAME.value = items[selectedItem].shortname;
    INPUT_SHORTCOLOR.value = items[selectedItem].shortcolor;
    INPUT_WEIGHT.value = items[selectedItem].weight;
    INPUT_HIGHALC.value = items[selectedItem].highalch
    INPUT_LOWALC.value = items[selectedItem].lowalch;
    INPUT_STACKABLE.checked = items[selectedItem].stackable;
    INPUT_TRADEABLE.value = items[selectedItem].tradeable;
    INPUT_EQUIPABLE.value = items[selectedItem].equipable;

}

function createName() {
    items[selectedItem].name = INPUT_NAME.value; //set item name to input name
    items[selectedItem].nameDiv.innerHTML = ''; //clear nameDiv list

    for (var i = 0; i < items[selectedItem].name.length; i++) { //create span for each letter of the item name
        var letter = document.createElement("span");
        letter.innerHTML = items[selectedItem].name.charAt(i);
        items[selectedItem].nameDiv.appendChild(letter);
        colorSpan(letter, items[selectedItem].color, i);
    }

}

function createShortname() {
    items[selectedItem].shortname = INPUT_SHORTNAME.value;
    items[selectedItem].shortnameDiv.innerHTML = '';

    for (var i = 0; i < items[selectedItem].shortname.length; i++) {
        var letter = document.createElement("span");
        letter.innerHTML = items[selectedItem].shortname.charAt(i);
        items[selectedItem].shortnameDiv.appendChild(letter);
        colorShortSpan(letter, items[selectedItem].shortcolor, i);
    }
}

function addEquipment() {
    items.push(new Item(items.length));
    
    //for (var i = 0; i < items[selectedItem].shortname.length; i++) {
      
    //}
}

function colorSpan(span, colorstring, colorIndex) {
    var fg;
    var bg;
    try { //get colorcode in format "fg,bg,fg,bg..." etc. no commas
        fg = colorstring.charAt(colorIndex * 2);
        bg = colorstring.charAt(colorIndex * 2 + 1);
    }
    catch {
        fg = "p";
        bg = "0";
        console.log("nocolor");
    }
    span.style.color = colorcodeToRGB(fg);
    span.style.backgroundColor = colorcodeToRGB(bg);
}

function colorShortSpan(span, colorstring, colorIndex) {
    var fg;
    var bg;
    try { //get colorcode in format "fg,bg,fg,bg..." etc. no commas
        fg = colorstring.charAt(colorIndex * 2);
        bg = colorstring.charAt(colorIndex * 2 + 1);
    }
    catch {
        fg = "p";
        bg = "0";
        console.log("nocolor");
    }
    span.style.color = colorcodeToRGB(fg);
    span.style.backgroundColor = colorcodeToRGB(bg);
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

function loadItemDB() {

    //loads map xml data synchronously
    try {
        var xml = fs.readFileSync('itemdb.xml', 'utf8');
    }
    catch (e) {
        console.log('Error:', e.stack);
    }

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml, "text/xml"); //parse xml string
    var nodes = xmlDoc.getElementsByTagName("Equipment"); //get list of room nodes

    //try {
    for (var i = 0; i < nodes.length; i++) { //iterate over list of room nodes and load room properties
        items.push(new Item(i));
        items[i].itemID = nodes[i].getElementsByTagName("id")[0].innerHTML
        items[i].name = nodes[i].getElementsByTagName("name")[0].innerHTML;
        items[i].color = nodes[i].getElementsByTagName("color")[0].innerHTML;
        items[i].shortname = nodes[i].getElementsByTagName("shortname")[0].innerHTML;
        items[i].shortcolor = nodes[i].getElementsByTagName("shortcolor")[0].innerHTML;
        items[i].weight.innerHTML = nodes[i].getElementsByTagName("weight")[0].innerHTML;
        items[i].highalch.innerHTML = nodes[i].getElementsByTagName("highalchemy")[0].innerHTML;
        items[i].lowalch.innerHTML = nodes[i].getElementsByTagName("lowalchemy")[0].innerHTML;
        items[i].stackable.innerHTML = nodes[i].getElementsByTagName("stackable")[0].innerHTML;
        items[i].tradeable.innerHTML = nodes[i].getElementsByTagName("tradeable")[0].innerHTML;
        items[i].equipable.innerHTML = nodes[i].getElementsByTagName("equipable")[0].innerHTML;
        items[i].slot.innerHTML = nodes[i].getElementsByTagName("slot")[0].innerHTML;
        items[i].attackspeed.innerHTML = nodes[i].getElementsByTagName("speed")[0].innerHTML;
        items[i].stabattackbonus.innerHTML = nodes[i].getElementsByTagName("stabattackbonus")[0].innerHTML;
        items[i].slashattackbonus.innerHTML = nodes[i].getElementsByTagName("slashattackbonus")[0].innerHTML;
        items[i].crushattackbonus.innerHTML = nodes[i].getElementsByTagName("crushattackbonus")[0].innerHTML;
        items[i].magicattackbonus.innerHTML = nodes[i].getElementsByTagName("magicattackbonus")[0].innerHTML;
        items[i].rangedattackbonus.innerHTML = nodes[i].getElementsByTagName("rangedattackbonus")[0].innerHTML;
        items[i].stabdefensebonus.innerHTML = nodes[i].getElementsByTagName("stabdefensebonus")[0].innerHTML;
        items[i].slashdefensebonus.innerHTML = nodes[i].getElementsByTagName("slashdefensebonus")[0].innerHTML;
        items[i].crushdefensebonus.innerHTML = nodes[i].getElementsByTagName("crushdefensebonus")[0].innerHTML;
        items[i].magicdefensebonus.innerHTML = nodes[i].getElementsByTagName("magicdefensebonus")[0].innerHTML;
        items[i].rangeddefensebonus.innerHTML = nodes[i].getElementsByTagName("rangeddefensebonus")[0].innerHTML;
        items[i].strengthbonus.innerHTML = nodes[i].getElementsByTagName("strengthbonus")[0].innerHTML;
        items[i].prayerbonus.innerHTML = nodes[i].getElementsByTagName("prayerbonus")[0].innerHTML;

        for (var n = 0; n < items[i].name.length; n++) { //create span for each letter of the item name
            var letter = document.createElement("span");
            letter.innerHTML = items[i].name.charAt(n);
            items[i].nameDiv.appendChild(letter);
            colorSpan(letter, items[i].color, n);
        }

        for (var n = 0; n < items[i].shortname.length; n++) {
            var letter = document.createElement("span");
            letter.innerHTML = items[i].shortname.charAt(n);
            items[i].shortnameDiv.appendChild(letter);
            colorShortSpan(letter, items[i].shortcolor, n);
        }

    }
    alert("ItemDB Loaded Successfully");
}

//catch {
//    alert("Map Load Error");
// }
//}

function saveItemDB() {
    var xw = new XMLWriter();
    xw.formatting = 'indented'; //add indentation and newlines
    xw.indentChar = ' '; // indent with spaces
    xw.indentation = 2; //add 2 spaces per level
    //start document
    xw.writeStartDocument();
    xw.writeStartElement('ItemDB');

    //write Equipment
    xw.writeStartElement('EquipmentDB');
    for (var i = 0; i < items.length; i++) {
        xw.writeStartElement('Equipment');
        xw.writeElementString('id', items[i].item.id);
        xw.writeElementString('name', items[i].name);
        xw.writeElementString('color', items[i].color);
        xw.writeElementString('shortname', items[i].shortname);
        xw.writeElementString('shortcolor', items[i].shortcolor);
        xw.writeElementString('weight', items[i].weight.innerHTML);
        xw.writeElementString('highalchemy', items[i].highalch.innerHTML);
        xw.writeElementString('lowalchemy', items[i].lowalch.innerHTML);
        xw.writeElementString('stackable', items[i].stackable.innerHTML);
        xw.writeElementString('tradeable', items[i].tradeable.innerHTML);
        xw.writeElementString('equipable', items[i].equipable.innerHTML);
        xw.writeElementString('slot', items[i].slot.innerHTML);
        xw.writeElementString('speed', items[i].attackspeed.innerHTML);
        xw.writeElementString('stabattackbonus', items[i].stabattackbonus.innerHTML);
        xw.writeElementString('slashattackbonus', items[i].slashattackbonus.innerHTML);
        xw.writeElementString('crushattackbonus', items[i].crushattackbonus.innerHTML);
        xw.writeElementString('magicattackbonus', items[i].magicattackbonus.innerHTML);
        xw.writeElementString('rangedattackbonus', items[i].rangedattackbonus.innerHTML);
        xw.writeElementString('stabdefensebonus', items[i].stabdefensebonus.innerHTML);
        xw.writeElementString('slashdefensebonus', items[i].slashdefensebonus.innerHTML);
        xw.writeElementString('crushdefensebonus', items[i].crushdefensebonus.innerHTML);
        xw.writeElementString('magicdefensebonus', items[i].magicdefensebonus.innerHTML);
        xw.writeElementString('rangeddefensebonus', items[i].rangeddefensebonus.innerHTML);
        xw.writeElementString('strengthbonus', items[i].strengthbonus.innerHTML);
        xw.writeElementString('prayerbonus', items[i].prayerbonus.innerHTML);
        xw.writeEndElement();
    }
    xw.writeEndElement();

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
    fs.writeFile("itemdb.xml", asString, function (err) {
        if (err) {
            return console.log(err);
        }
    })
    alert("ItemDB Saved Successfully");
}