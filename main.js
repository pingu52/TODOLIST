'use strict';


//생성자
class todoList {
    constructor(text, id) {
        this.textfield = [text];
        this.id = id;
    }
}

//날짜구하기 함수
function getDayOfWeek(ymd){ //ex) getDayOfWeek('2022-06-13')

    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[new Date(ymd).getDay()];
    
    return dayOfWeek;

}


//api


function getEvents( userId="12345" ,targetDate="2022-9-29"){
                
    const url = `http://133.186.211.156:8100/api/${userId}/calendars/day/${targetDate}`;
    const option = {
        method : "GET"
    };
    


    fetch(url,option)
        .then(function(response){
            return response.json()
        }).then(function(result){
            const todo = document.getElementById("litodo" + targetDate);
            for(let i=0; i<result.length; i++){
                
                const id = result[i].id;
                const userId = result[i].userId;
                const subject = result[i].subject;
                const eventDt = result[i].eventDt;
                console.log("id",id);
                console.log("userId:",userId);
                console.log("subject:",subject);
                console.log("eventDt:",eventDt);
                //console.log("ultodo",boxis);
                var box = document.getElementById("box"+eventDt.substring(7,9));
               
                
                var ultodo = document.createElement('ul');
                //ultodo.setAttribute("id",id);
                ultodo.setAttribute("class","ultodo");
                box.appendChild(ultodo);
                const litodo = document.createElement("li");
                
                litodo.appendChild(document.createTextNode(subject));
                litodo.setAttribute("id",id);
                ultodo.appendChild(litodo);
            }
            
        });
}


var userId = "pingu";


function saveEvent(date, text){

    const subject=document.getElementById("subject");
    const eventDt=document.getElementById("eventDt");

   

    /*
        promise는 생성과 동시에 실행됩니다.
    */
    const data = {
            "subject" : text, // value
            "eventDt" : date // key
            
    }

    
    const url = `http://133.186.211.156:8100/api/${userId}/calendars/events`;
    const option = {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(url, option)
        .then(function(response){
            return response.json;
        })
        .then(function(result){
            console.log(result.message);
            console.log(result.id);
            alert("등록완료!");
            location.reload();
        });
}


// 투두 리스트 등록 함수
function submitToDo(event) {
    
    const i = event.target.id.replace(/^\D+/g, '');
    const date = currentYear+"-"+currentMonth+"-"+i;
    const temp = new todoList(document.getElementById('inputtodo'+i).value, date);

    var text = document.getElementById('inputtodo'+i).value;

    saveEvent(date, text);
    alert(date);
/*
    if(localStorage.getItem(temp.id)){
        let TODOs = JSON.parse(localStorage.getItem(temp.id));
        TODOs.push(temp.textfield);
        localStorage.setItem(temp.id, JSON.stringify(TODOs));
        drawTable();
        return undefined;
    }
    */
    //localStorage.setItem(temp.id, JSON.stringify(temp.textfield));
    drawTable();
    return undefined;
}

//모두삭제 버튼 함수
function delList (event) {
    const i = event.target.id.replace(/^\D+/g, '');
    const date = currentYear+"-"+currentMonth+"-"+i;
    localStorage.removeItem(date);
    drawTable();
    return undefined;
}


//월별 삭제
function delmonth(){
    for(var i=1;i<=new Date(currentYear,currentMonth,0).getDate();i++){
        const date = currentYear+"-"+currentMonth+"-"+i;
    localStorage.removeItem(date);
    }
    drawTable();
    return undefined;
}



//단일 삭제
function delone (i,event) {
    const j = event.target.id.replace(/^\D+/g, '');
    const date = currentYear+"-"+currentMonth+"-"+i;
    //let TODOs = JSON.parse(localStorage.getItem(date));
    TODOs.splice(j, 1);
    //localStorage.setItem(date, JSON.stringify(TODOs));
    drawTable();
}


var title = document.querySelector(".title");








var main = document.querySelector(".mainbox");
var currentYear = 2022;
var currentMonth = 9;
drawTable();

//이전 달
function monthBefore() {
    currentMonth -= 1;
    if(!currentMonth) {
        currentMonth=12;
        currentYear--;
    }
    drawTable();
}

//다음 달
function monthAfter() {
    currentMonth += 1;
    if(currentMonth >= 12) {
        currentMonth = 1;
        currentYear++;
    }
    drawTable();
}


//년.월 보여주기 h1
function titlemonth(){
    title.innerHTML="["+currentYear+"-"+currentMonth+"]"+" My ToDoList";
}

//일 별 모두삭제
function removeAllChild() {
    while(main.lastElementChild) {
        main.removeChild(main.lastElementChild);
    }
}


//전체삭제
function removeAll() {
    localStorage.clear();
    drawTable();
}

//그려줌  // 메인 ? 
function drawTable() {
    if(main.lastElementChild) {
        removeAllChild();
    }
    for (var i = 1; i <= new Date(currentYear, currentMonth, 0).getDate(); i++) {

        // need to read
        createele(i);
        // get the list of TODOs
        getTodoList(i);
        getEvents();
        
    }
    titlemonth();
}


//전부 띄워줌
function getTodoList(i) {
    const today = currentYear+"-"+currentMonth+"-"+i;

    getEvents(userId,today);
    

    /*
    if(localStorage.getItem(today)){
        let TODOs = JSON.parse(localStorage.getItem(today));
        ////var spanner = document.createElement("span");
        ////spanner.id="spanner"+i;
        var ultodo = document.createElement("ul");
        ultodo.setAttribute("class","ultodo");
        for (let j=0; j < TODOs.length; j++) {
            let litodo = document.createElement("li");
            litodo.setAttribute("class", "todos");
            litodo.innerHTML=TODOs[j];
            litodo.id="litodo"+j;
            litodo.addEventListener('click', function(event) {
                delone(i,event);
            });
            ultodo.appendChild(litodo);
        }
        document.getElementById('box'+i).appendChild(ultodo);
        
    }*/
    return undefined;
}


//박스 만들기 
function createele(i){
    // 생성 및 속성 구성
    var divbox = document.createElement("div");
    divbox.setAttribute("class", "box");
    var pdate = document.createElement("p");
    pdate.setAttribute("class", "pdate");
    var formtodo = document.createElement("form");
    formtodo.setAttribute("class", "formtodo");
    var inputtodo = document.createElement("input");
    inputtodo.setAttribute("class","inputtodo");
    inputtodo.setAttribute("type","text");
    
    var inputtodobutton = document.createElement("button");
    inputtodobutton.setAttribute("type","button");
    var delall = document.createElement("button");
    delall.setAttribute("type","button");

    //id값 주기
    divbox.id="box"+i;
    pdate.id="pdate"+i;
    formtodo.id="formtodo"+i;
    inputtodo.id="inputtodo"+i;
    inputtodobutton.id='inputtodobutton'+i;
    delall.id='delall'+i;

    //부모 자식 관계 생성
    document.body.appendChild(main);
    main.appendChild(divbox);
    divbox.appendChild(pdate);
    divbox.appendChild(formtodo);
    formtodo.appendChild(inputtodo);
    formtodo.appendChild(inputtodobutton);
    divbox.appendChild(delall);

    //버튼 이름 표시
    inputtodobutton.innerHTML="등록";
    delall.innerHTML="모두삭제";

    // 요일 나타냄
    var YMD = currentYear+"-"+currentMonth+"-"+i;
    var DAY = getDayOfWeek(YMD);
    pdate.innerHTML=currentYear+"-"+currentMonth+"-"+i+" "+DAY;

    //색상 표시 
    if(getDayOfWeek(YMD).match('일')){
        pdate.style.color="red";
    }else if(getDayOfWeek(YMD).match('토')){
        pdate.style.color="blue";
    }

    //버튼함수
    inputtodobutton.addEventListener('click', function(event){
        submitToDo(event);
    });
    delall.addEventListener('click', function(event) {
        delList(event)
    });
}



