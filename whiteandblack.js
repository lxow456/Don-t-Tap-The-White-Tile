
function $(id) {
    var thing = document.getElementById(id);
    return thing;
}
function creatediv(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
}
function createCellArray() {
    var arr = ['cell', 'cell', 'cell', 'cell'];
    var num = Math.floor(Math.random() * 4);
    arr[num] = 'cell black';
    return arr;
}
function createrow() {
    var row = creatediv("row");
    var arr = createCellArray();
    for (let i = 0; i < arr.length; i++) {
        var cells = creatediv(arr[i]);
        row.appendChild(cells);
    }
    var con = $('con');
    if (con.childNodes == null) {  //
        con.appendChild(row);
    } else {
        con.insertBefore(row, con.firstChild);
    }

}

var con = $('con')
var flag = false;   // 用于标志游戏的状态 为false表示游戏尚未开始 为true表示游戏已经开始
var clock;
var speed = 3;
var span1 = $('span1');




function start() {

    if (!flag) {
        init();
        flag = true;
    } else {
        alert("您已经开始游戏");
    }
}

function init() {

    var main = $('main');
    for (let i = 0; i < 4; i++) {
        createrow();
    }
    main.onmousedown = function (ev) {
        ev = ev || event;
        judge(ev);
    }


    clock = window.setInterval('move()', 30);
}

function move() {

    var top = parseInt(window.getComputedStyle(con, null).top);
    if (top + speed < 0) {
        top += speed;
    } else {
        top = 0;
    }
    con.style.top = top + "px";
    // over();
    if (parseInt(con.style.top) == 0) {

        createrow();
        con.style.top = "-102px";
        delrow();
        if (con.lastChild.pass != 1) {

            fail();
        }
    }
}

function delrow() {
    if (con.childNodes.length == 6) {
        con.removeChild(con.lastChild);
    }
}

function judge(ev) {

    if (ev.target.className == "cell black") {
        ev.target.className = "cell";
        ev.target.parentNode.pass = 1;
        score();

    } else {
        fail();
    }
}

// function over(){
//     if(con.childNodes.length==5 && con.lastChild.pass==null){
//         fail();
//     }
// }

var num_2 = 0;

function score() {

    var num = parseInt(span1.innerHTML);
    num++;
    num_2 = num;
    span1.innerHTML = num;
    if (num % 10 == 0) {
        speedup();
    }
}

function speedup() {
    speed += 1;

}

function fail() {
    clearInterval(clock);


    alert("很遗憾，本局游戏结束！\n您的得分为：" + num_2);
    con.innerHTML = "";
    con.style.top = "-408px";
    flag = false;
    speed = 3;
    span1.innerHTML = 0;

}
