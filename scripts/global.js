function addLoadEvent (func){
   var oldonload=window.onload;

   if (typeof window.onload != 'function') {
   	  window.onload = func;
   }else{
   	  window.onload = function(){
   	  	oldonload();
   	  	func();
   	  }
   }
}

function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
	    parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
 function addClass(element,value){
 	if(!element.className){
 		element.className=value;
 	}else{
 		newClassName=element.className;
 		newElement += " ";
 		newElement += value;
 		element.className = newClassName;
 	}
 }
 function highlightPage(){
 	if(!document.getElementsByTagName) return false;
 	if(!document.getElementsById) return false;
    var headers=document.getElementsByTagName("header");
    if(headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if(navs.length == 0) return false;
    var links=navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i=0; i<links.length; i++){
    	linkurl=links[i].getAttribute("href");
    	if(window.location.href.indexOf(linkurl) != -1){
    		links[i].className="here";
    		var linktext=links[i].lastChild.nodeValue.toLowerCase();
    		document.body.setAttribute("id",linktext)

    	}
    }
 }
 addLoadEvent(highlightPage);

 function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;;
	if(!document.getElementById(elementID)) return false;
	var elem=document.getElementById(elementID);
	if(elem.movement){
       clearTimeout(elem.movement);
	}
    if(!elem.style.left){
    	elem.style.left="0px";
    }
    if(!elem.style.top){
    	elem.style.top="0px";
    }

	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	var dist=0;
	if(xpos == final_x && ypos == final_y){
		return true;
	}
	if(xpos < final_x){
		dist=Math.ceil((final_x - xpos)/10);
		xpos=xpos+dist ;
	}
	if(xpos > final_x){
		dist=Math.ceil((xpos - final_x)/10);
		xpos=xpos-dist ;
	}
	if(ypos < final_y){
		dist=Math.ceil((final_y - ypos)/10);
		ypos=ypos+dist ;
	}
	if(ypos > final_y){
		dist=Math.ceil((ypos - final_y)/10);
		ypos=ypos-dist ;
	}
	elem.style.left=xpos + "px";
	elem.style.top=ypos + "px";
	var repeat=" moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+") ";
	elem.movement=setTimeout(repeat,interval)
}

function prepareSlideshow () {
	// body...
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("intro")) return false;
	

	var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var frame=document.createElement("img");
    frame.setAttribute("src","images/cnblue/frame.jpg");
    frame.setAttribute("alt","a photo");  
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    var preview=document.createElement("img");
    preview.setAttribute("src","images/cnblue/h.jpg");
    preview.setAttribute("alt","a photo");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
	//preview.style.position = "absolute";
	//preview.style.left = "0px";
	//preview.style.top = "0px";

	//var list=document.getElementById("linklist");
	var links=document.getElementsByTagName("a");
	var destination;
	for( var i=0;i<links.length;i++){
		links[i].onmouseover = function(){
		    destination=this.getAttribute("href");
		    if(destination.indexOf("index.html") != -1){
		    	 moveElement("preview",0,0,5);
		    }
		   if(destination.indexOf("about.html") != -1){
		    	 moveElement("preview",-150,0,5);
		    }
		    if(destination.indexOf("photos.html") != -1){
		    	 moveElement("preview",-300,0,5);
		    }
		    if(destination.indexOf("live.html") != -1){
		    	 moveElement("preview",-450,0,5);
		    }
		    if(destination.indexOf("contact.html") != -1){
		    	 moveElement("preview",-600,0,5);
		    }
	}
	}
}
addLoadEvent(prepareSlideshow);
function showSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id") != id){
            sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}
	}
}
 function prepareInternalnav () {
 	// body...
 	if(!document.getElementById) return false;
 	if(!document.getElementsByTagName) return false;
 	var articles=document.getElementsByTagName("article");
 	if(articles.length == 0) return false;
 	var navs=articles[0].getElementsByTagName("nav");
 	if(navs.length == 0) return false;
 	var nav=navs[0];
 	var links=nav.getElementsByTagName("a");
 	for(i=0; i<links.length;i++){
 		var sectionId=links[i].getAttribute("href").split("#")[1];
 		if(!document.getElementById(sectionId)) continue;
 		document.getElementById(sectionId).style.display="none";
 		links[i].destination=sectionId;
 		links[i].onclick=function () {
 			showSection(this.destination);
 			return false;
 			// body...
 		}
 	}
 }
 addLoadEvent(prepareInternalnav);

 function showPic(whichpic){
	//alert('进入函数！');
	if(!document.getElementById("placeholder")) {
        //alert('no');
		return false;}
  var source=whichpic.getAttribute("href");
  var placeholder=document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  
  if(!document.getElementById("description")) return false;
  if (whichpic.getAttribute("title")) {
  	var text=whichpic.getAttribute("title");
  }else{
  	text=" ";
  }
 var description=document.getElementById("description");
 if (description.firstChild.nodeType==3) {
 	description.firstChild.nodeValue=text;
 }
   return false;
}

function preparePlaceholder(){
    	//alert('aaa');
	if (!document.createElement) {
		return false;
	}
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.jpg");
	placeholder.setAttribute("alt","my love!");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery=document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
	
}
function prepareGallery(){
	//alert('bbb');
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
	    links[i].onclick=function(){
	    	return  showPic(this);
	    	//false;
	    }
	    links[i].onkeypress=links[i].onclick;
	}
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
//window.onload=function(){
  //  preparePlaceholder();
  ///  prepareGallery();
//}

function stripe(){
    if(!document.getElementsByTagName){
      return true;
    }//else{alert("true");}
    var tables=document.getElementsByTagName("table");
    var odd,rows;
    for (var i=0; i<tables.length; i++){
      odd=false;
     // alert(odd);
      rows=tables[i].getElementsByTagName("tr");
       for (var j=0; j<rows.length; j++){
      if(odd==true){
      //  rows[j].style.backgroundColor = "#ffc";
       addClass(rows[j],"odd");
        odd=false;
      }else{
        odd=true;
       // alert(odd);
      }
    }
  }
}
  
  function highlightRwos(){
    if (!document.getElementsByTagName) return false;
    var rows=document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length ; i++) {
         rows[i].oldClassName=rows[i].className;
         rows[i].onmouseover=function(){
          //this.style.fontWeight="bold";
           addClass(this,"highlight");
        }
        rows[i].onmouseout=function(){
         //this.style.fontWeight="normal";
         this.className=this.oldClassName;
        }
      }
    }

    function displayAbbreviations(){
       if(!document.getElementsByTagName || !document.createElement || !document.createTextNode ) return false;
       var abbreviations=document.getElementsByTagName("abbr");
       if(abbreviations.length<1) return false;
       var defs=new Array();
       for(var i=0;i<abbreviations.length;i++){
       	var current_abbr=abbreviations[i];
       	if(current_abbr.childNodes.length<1) continue;
       	var definition=current_abbr.getAttribute("title");
       	var key=current_abbr.lastChild.nodeValue;
       	defs[key]=definition;
       }
       var dlist=document.createElement("dl");
       for(key in defs) {
       	var definition=defs[key];
       	var dtitle=document.createElement("dt");
       	var dtitle_text=document.createTextNode(key);
       	dtitle.appendChild(dtitle_text);
       	var ddesc=document.createElement("dd");
       	var ddesc_text=document.createTextNode(definition);
       	ddesc.appendChild(ddesc_text);
       	dlist.appendChild(dtitle);
       	dlist.appendChild(ddesc);
       }
       if(dlist.childNodes.length < 1) return false;
       var header=document.createElement("h3");
       var header_text=document.createTextNode("Abbreviations");
       header.appendChild(header_text);
       var articles=document.getElementsByTagName("article");
       if(articles.length == 0) return false;
       var container=articles[0];
       container.appendChild(header);
       container.appendChild(dlist);
    }
  addLoadEvent(stripe);
  addLoadEvent(highlightRwos);
  addLoadEvent(displayAbbreviations);

    function focusLables(){
     // alert("okk");
    	if (!document.getElementsByTagName) return false;
    	var labels=document.getElementsByTagName("label");
    	for (var i = 0; i < labels.length; i++) {
    	  if(!labels[i].getAttribute("for")) continue;
    	  labels[i].onclick=function (){
    	  	var id=this.getAttribute("for");
    	  	if(!document.getElementById("id")) return false;
    	  	var element=document.getElementById(id);
    	  	element.focus();
    	  }	
    	}
    }
    addLoadEvent(focusLables);
   // window.onload=function (){
   //   focusLables();
   // }
 function resetFields (whichform) {
 	// body...
 	if(Modernizr.input.placeholder) return;
 	for (var i = 0; i < whichform.elements.length; i++) {
 		var element=whichform.elements[i];
 		if(element.type == "submit") continue;
 		var check=element.placeholder || element.getAttribute('placeholder');
 		if(!check) continue;
 		element.onfocus=function (){
 			var text=this.placeholder || this.getAttribute('placeholder');
 			if(this.value == text){
 				this.className='';
 				this.value=" ";
 			}
 		}
 		element.onblur=function(){
 			if(this.value == ""){
 				this.className='placeholder';
 				this.value=this.placeholder || this.getAttribute('placeholder');
 			}
 		}
 		element.onblur();
 	}
 }
 function prepareForms(){
  // alert("ok");
 	for (var i = 0; i < document.forms.length; i++) {
 		var thisform=document.forms[i];
 		resetFields(thisform);
 		thisform.onsubmit=function(){
 		//	return validateForm(this);
 		if(!validateForm(this)) return false;
 		var article=document.getElementsByTagName('article')[0];
 		if(submitFormWithAjax(this,article)) return false;
 		return true;
    
 		}
 	}
 }
 addLoadEvent(prepareForms);
//window.onload=function(){
 // prepareForms();
//}
 function isFilled(field){
    if(field.value.replace(' ','').length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute('placeholder');
    return (field.value != placeholder);
 }
 function isEmail(field){
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
 }
 function validateForm(whichform){
    for (var i = 0; i < whichform.elements.length; i++) {
    	var element=whichform.elements[i];
    	if(element.required == 'required'){
    		if(!isFilled(element)){
    			alert("Please fill in the "+element.name+" field.");
    			return false;
    		}
    	}
    	if(element.type == 'email'){
            if(!isEmail(element)){
            	alert("The "+element.name+" field must be a valid email address");
            	return false;
            }
    	}
    }
    return true;
 }


 function getHTTPObject(){
 	if(typeof XMLHttpRequest == "underfined"){
 		XMLHttpRequest=function(){
 			try{return new ActiveXObject("Msxl2.XMLHTTP.6.0");}
 			  catch(e){}
 			try{return new ActiveXObject("Msxl2.XMLHTTP.3.0");}
 			  catch(e){}
 			try{return new ActiveXObject("Msxl2.XMLHTTP");}
 			  catch(e){}
 			  return false;
 		}
 	}
 		return new XMLHttpRequest();
 }
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content=document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading....");
	element.appendChild(content);
}
function submitFormWithAjax(whichform,thetarget){
	var request=getHTTPObject();
	if(!request) {return false;}
	displayAjaxLoading(thetarget);
	var dataParts=[];
	var element;
	for(i=0; i<whichform.elements.length; i++){
		element=whichform.elements[i];
        dataParts[i]=element.name+ '=' +encodeURIComponent(element.value);
	}
	var data=dataParts.join('&');
	request.open('POST',whichform.getAttribute("action"),true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState == 4){
			if(request.status == 200 || request.status == 0){
				var matches=request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if(matches.length > 0){
					thetarget.innerHTML = matches[1];
				}else{
					thetarget.innerHTML='<p> Opos,there was an error .sorry.</p>';
				}
			}else{
				thetarget.innerHTML='<p>' + request.statusText + '</p>';
			}
		}
	};
	request.send(data);
	return true;
}