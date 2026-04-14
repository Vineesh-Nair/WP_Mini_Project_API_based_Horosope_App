function showTab(tab){
document.getElementById("home").classList.add("hidden");
document.getElementById("chat").classList.add("hidden");
document.getElementById("compat").classList.add("hidden");

document.getElementById(tab).classList.remove("hidden");
}

function getZodiac(d,m){
if((m==3&&d>=21)||(m==4&&d<=19)) return "Aries";
if((m==4&&d>=20)||(m==5&&d<=20)) return "Taurus";
if((m==5&&d>=21)||(m==6&&d<=20)) return "Gemini";
if((m==6&&d>=21)||(m==7&&d<=22)) return "Cancer";
if((m==7&&d>=23)||(m==8&&d<=22)) return "Leo";
if((m==8&&d>=23)||(m==9&&d<=22)) return "Virgo";
if((m==9&&d>=23)||(m==10&&d<=22)) return "Libra";
if((m==10&&d>=23)||(m==11&&d<=21)) return "Scorpio";
if((m==11&&d>=22)||(m==12&&d<=21)) return "Sagittarius";
if((m==12&&d>=22)||(m==1&&d<=19)) return "Capricorn";
if((m==1&&d>=20)||(m==2&&d<=18)) return "Aquarius";
return "Pisces";
}

async function getHoroscope(){

let name=document.getElementById("name").value;
let dob=document.getElementById("dob").value;
let type=document.getElementById("type").value;

let date=new Date(dob);
let sign=getZodiac(date.getDate(),date.getMonth()+1);

let res=await fetch("http://localhost:5000/horoscope",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,sign,type})
});

let data=await res.json();

document.getElementById("result").innerHTML=
`Hello ${name}<br>Zodiac: ${sign}<br>${data.text}`;
}

async function askAI(){

let q=document.getElementById("question").value;

let res=await fetch("http://localhost:5000/chat",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({q})
});

let data=await res.json();

document.getElementById("chatResult").innerText=data.text;
}

function checkCompat(){

let s1=document.getElementById("sign1").value;
let s2=document.getElementById("sign2").value;

let score=Math.floor(Math.random()*100);

document.getElementById("compResult").innerText=
`${s1} ❤️ ${s2} = ${score}% compatibility`;
}