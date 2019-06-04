var xmlHttpRequest=new XMLHttpRequest();
var xmlHttpRequest2=new XMLHttpRequest();
var xmlHttpRequest3=new XMLHttpRequest();
var xmlHttpRequest4=new XMLHttpRequest();
var xmlHttpRequest5=new XMLHttpRequest();
var xmlHttpRequest6=new XMLHttpRequest();
var xmlHttpRequest7=new XMLHttpRequest();
var xmlHttpRequest8=new XMLHttpRequest();
var xmlHttpRequest9=new XMLHttpRequest();
var temp;
var get;
var get1;

function getID()
{
	get=document.getElementById('login');
	get1=document.getElementById('register');
}

function on_off()
{		
	getID();
	get.style.visibility = 'visible';		
	get1.style.visibility = 'hidden';		
}

function register_button()
{
	getID();
	get1.style.visibility = 'visible';
	get.style.visibility = 'hidden';
}



function checkUserName(user)
{
	if(xmlHttpRequest)
	{
		//use xmlHttpRequest object send request to one of page which on the server
		//the first reference means get/post
		//second reference define url, means send ajax request to the page
		//third reference, true is asynchronous manner		
		var url="../comp333assn1/php/loginsession.php?username="+$(user).value;
		temp=$(user);
		
		//open request
		xmlHttpRequest.open("get",url,true);
		//return function
		xmlHttpRequest.onreadystatechange=checkResult;
		
		//send request
		xmlHttpRequest.send(null);
	}
}

function checkUserPass(pass,user)
{
	var data=$(user).value+'/'+$(pass).value;		
	
	if(xmlHttpRequest)
	{
		//use xmlHttpRequest object send request to one of page which on the server
		//the first reference means get/post
		//second reference define url, means send ajax request to the page
		//third reference, true is asynchronous manner		
		var url="../comp333assn1/php/loginsession2.php?data="+data;
		temp=$(pass);
		
		//open request
		xmlHttpRequest.open("get",url,true);
		//return function
		xmlHttpRequest.onreadystatechange=checkResult;
		
		//send request
		xmlHttpRequest.send(null);
	}
}

var result_user=false;
var result_pass=false;
var online=[];

function checkResult()
{
	if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200)
	{							
		var result=xmlHttpRequest.responseText;
		
		if(temp.nextSibling.tagName=="SPAN")
		{
			temp.nextSibling.textContent=result;			
		}
		
		else
		{
			createNode(temp);
			temp.nextSibling.style.color="DarkGoldenRod";
			temp.nextSibling.textContent=result;
		}
		
		if(result=="correct username")
		{
			result_user=true;
		}
		
		else if(result=="incorrect username")
		{
			result_user=false;
		}
		
		else if(result=="correct password")
		{
			result_pass=true;
		}
		
		else if(result=="incorrect password")
		{
			result_pass=false;
		}
	}
}

var after_login=false;
var hightlight_user="";

function checkLogin()
{
	if(result_user==true && result_pass==true)
	{
		var username=document.getElementById('user');		
		var temp=true;
		
		for(var a=0; a<online.length;a++)
		{
			if(online[a]==username.value)
			{
				temp=false;
				break;
			}
		}
		
		if(temp==false)
		{
			window.alert("the user is on online, you cannot login");
		}
		
		else if(temp==true)
		{			
			var login=document.getElementById('login');
			var login_button=document.getElementById('login_button');
			var register_button=document.getElementById('register_button');
			var logout_button=document.getElementById('logout_button');
			var aa=document.getElementById('com');
			var board=document.getElementById('input_board');
		
			login.style.visibility='hidden';
			login_button.style.display='none';
			register_button.style.visibility='hidden';
			logout_button.style.display='block';
			aa.style.display='block';
			board.style.visibility='visible';
			
			after_login=true;
			
			if(xmlHttpRequest5)
			{
				hightlight_user=username.value;
							
				//use xmlHttpRequest object send request to one of page which on the server
				//the first reference means get/post
				//second reference define url, means send ajax request to the page
				//third reference, true is asynchronous manner		
					
				var url="../comp333assn1/php/updatestate.php?user="+username.value;
						
				//open request
				xmlHttpRequest5.open("get",url,true);
		
				//send request
				xmlHttpRequest5.send();
			}
		}
		
	}
	
	else
	{
		window.alert("username or password is incorrect");
	}
}

function $(input)
{
	var get=input.id;
	return document.getElementById(get);
}

function createNode(get)
{
	var span=document.createElement("span");
	span.style.color="red";
	get.parentNode.insertBefore(span, get.nextSibling);
}

function load_content()
{	
	if(after_login==true)
	{
		if(xmlHttpRequest3)
		{
			//use xmlHttpRequest object send request to one of page which on the server
			//the first reference means get/post
			//second reference define url, means send ajax request to the page
			//third reference, true is asynchronous manner	
			
			var url="../comp333assn1/php/loadcontent.php";		
		
			//open request
			xmlHttpRequest3.open("get",url,true);
				
				
			//return function
			xmlHttpRequest3.onreadystatechange=showContent;
		
			//send request
			xmlHttpRequest3.send();
		}
	}
	
	
}

function showContent()
{
	if(xmlHttpRequest3.readyState == 4)
	{				
		var data=JSON.parse(xmlHttpRequest3.responseText);
		var username=document.getElementById('user');
					
		console.log(data);
		
		var content_html="";
		
		for(var a=0;a<data.length;a++)
		{
			if(hightlight_user==data[a].username)
			{
				content_html+="<p class='style1'>";
				content_html+="<span class='style6'>"
				content_html+=data[a].username+": "
				content_html+="</span>"+data[a].content;
				content_html+="</p>";
			}
			
			else
			{
				content_html+="<p class='style1'>";
				content_html+=data[a].username+": "+data[a].content;
				content_html+="</p>";
			}
			
		}
		
		document.getElementById("com").innerHTML=content_html;
	}
}

setInterval("load_content()",1000);

var glo=null;

function show()
{	
	if(xmlHttpRequest2)
	{
		//use xmlHttpRequest object send request to one of page which on the server
		//the first reference means get/post
		//second reference define url, means send ajax request to the page
		//third reference, true is asynchronous manner	
			
		var url="../comp333assn1/php/showstatus.php";		
		
		//open request
		xmlHttpRequest2.open("get",url,true);
				
				
		//return function
		xmlHttpRequest2.onreadystatechange=showStatus;
		
		//send request
		xmlHttpRequest2.send();
	}
}

var alluser=[];

function showStatus()
{
	if(xmlHttpRequest2.readyState == 4)
	{
		
		var data=JSON.parse(xmlHttpRequest2.responseText);
		//console.log(data);
		
		var online_html="";
		var offline_html="";
		
		var count=0;
		
		for(var a=0;a<data.length;a++)
		{
			//window.alert(data[a].status+" "+data[a].username);
			
			alluser[a]=data[a].username;
			
			if(data[a].status == "true")
			{
				online[count]=data[a].username;
				count++;
				
				if(hightlight_user==data[a].username)
				{
					online_html+="<tr>";
					online_html+="<td class='style1'>"+ data[a].username +"</td>";
					online_html+="</tr>";
				}
				
				else
				{
					online_html+="<tr>";
					online_html+="<td>"+ data[a].username +"</td>";
					online_html+="</tr>";
				}
					
			}
			
			else
			{
				offline_html+="<tr>";
				offline_html+="<td>"+ data[a].username +"</td>";
				offline_html+="</tr>";
			}
		}
		
		document.getElementById("online_status").innerHTML = online_html;
		document.getElementById("offline_status").innerHTML = offline_html;		
	}
	
	
}

setInterval("show()",1000);


function submitContent()
{
	var username=document.getElementById('user').value;
	var input_content=document.getElementById('area').value;
	
	var data=username+"/"+input_content;
	
	if(xmlHttpRequest4)
		{
			//use xmlHttpRequest object send request to one of page which on the server
			//the first reference means get/post
			//second reference define url, means send ajax request to the page
			//third reference, true is asynchronous manner		
					
			var url="../comp333assn1/php/update.php?data="+data;
		
			//open request
			xmlHttpRequest4.open("get",url,true);
				
				
			//return function
			//xmlHttpRequest4.onreadystatechange=showContent;
		
			//send request
			xmlHttpRequest4.send();
		}
}

function logout()
{
	var username=document.getElementById('user').value;
	
	if(xmlHttpRequest6)
		{		
			//use xmlHttpRequest object send request to one of page which on the server
			//the first reference means get/post
			//second reference define url, means send ajax request to the page
			//third reference, true is asynchronous manner		
					
			var url="../comp333assn1/php/logout.php?user="+username;
		
			//open request
			xmlHttpRequest6.open("get",url,true);
		
			//send request
			xmlHttpRequest6.send();
			
			var login_button=document.getElementById('login_button');
			var logout_button=document.getElementById('logout_button');
			var register_button=document.getElementById('register_button');
			var area=document.getElementById('com');
			var area2=document.getElementById('com2');
			var board=document.getElementById('input_board');
			
			login_button.style.display='block';
			logout_button.style.display='none';
			area.style.display='none';
			area2.style.display='none';
			register_button.style.visibility='visible';
			board.style.visibility='hidden';
			
			var index=online.indexOf(username);
			
			if(index > -1)
			{
				online.splice(index,1);
			}
		}
}

function goRegister()
{
	
	///////////////////////////////////////////////////////////////////////////
	var user=document.getElementById('register_user');
	var pass=document.getElementById('register_pass');
	var first=document.getElementById('register_first');
	var last=document.getElementById('register_last');
	var email=document.getElementById('register_email');
	
	var uservalue=user.value;
	var passvalue=pass.value;
	var firstvalue=first.value;
	var lastvalue=last.value;
	var emailvalue=email.value;
	
	if(uservalue.length>0&&passvalue.length>0&&firstvalue.length>0&&lastvalue.length>0&&emailvalue.length>0) 
	{
		
		var data=uservalue+"/"+passvalue+"/"+firstvalue+"/"+lastvalue+"/"+emailvalue;
	
	
		if(xmlHttpRequest8)
		{
			//use xmlHttpRequest object send request to one of page which on the server
			//the first reference means get/post
			//second reference define url, means send ajax request to the page
			//third reference, true is asynchronous manner		
			var url="../comp333assn1/php/register.php?data="+data;
				
			//open request
			xmlHttpRequest8.open("get",url,true);
		
			xmlHttpRequest8.onreadystatechange=getanswer;
		
			//send request
			xmlHttpRequest8.send(null);
		}
	}
	
	else
	{
		window.alert("missing some data");
	}
	
}


function getanswer()
{
	if(xmlHttpRequest8.readyState == 4)
	{
		window.alert(xmlHttpRequest8.responseText);
	}
}

function particular()
{
	var input=document.getElementById('particular_user').value;
	var check=false;
	
	for(var a=0;a<alluser.length;a++)
	{
		if(alluser[a]==input)
		{
			check=true;
			break;
		}
	}
	
	if(check==true)
	{
		if(xmlHttpRequest9)
		{
			//use xmlHttpRequest object send request to one of page which on the server
			//the first reference means get/post
			//second reference define url, means send ajax request to the page
			//third reference, true is asynchronous manner		
			var url="../comp333assn1/php/getinfo.php?user="+input;
				
			//open request
			xmlHttpRequest9.open("get",url,true);
		
			xmlHttpRequest9.onreadystatechange=getinformation;
		
			//send request
			xmlHttpRequest9.send(null);
		}
	}
	
	else
	{
		window.alert("incorrect username");
	}
}

function getinformation()
{
	var area=document.getElementById('com');
	var area2=document.getElementById('com2');
	
	if(xmlHttpRequest9.readyState == 4)
	{
		var data=JSON.parse(xmlHttpRequest9.responseText);
		console.log(data);
		var content_html="";
	
		area.style.display="none";
		area2.style.display="block";
		
		for(var a=0;a<data.length;a++)
		{
			content_html+="<p class='style1'>";
			content_html+="<span class='style6'>"
			content_html+=data[a].username+": "
			content_html+="</span>"+data[a].content;
			content_html+="</p>";
		}
		
		area2.innerHTML=content_html;
	}
}

function back()
{
	var area=document.getElementById('com');
	var area2=document.getElementById('com2');
	
	area.style.display="block";
	area2.style.display="none";
}
