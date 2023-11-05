(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,function(t,e,n){t.exports=n.p+"static/media/scribble.4b5b265a.ogg"},function(t,e,n){t.exports=n.p+"static/media/game-over.42c485ad.ogg"},,,,function(t,e,n){t.exports=n.p+"static/media/paper-flip.548762d2.ogg"},,,function(t,e,n){t.exports=n(13)},,function(t,e,n){"use strict";n.r(e);var r=n(1),a=n(5),i=n(6),s=n(7),c=n(10),o=n(9),l=n(2),u=n(0);function f(){return Object(u.a)("header",{class:"pa2 f4 bg-dark-blue near-white w-100 flex tc justify-center items-center"},[Object(u.a)("h1",{class:"avenir"},"Tic Tac Toe")])}function b(){return Object(u.a)("footer",{class:"pa3 avenir flex items-center justify-center w-100 bg-dark-blue tc"},[Object(u.a)("p",{class:"b flex flex-column items-center justify-center tc f4 near-white"},["\xa9 2023",Object(u.a)("a",{class:"near-white grow flex items-center justify-center tc mt1 no-underline",title:"Go to the Source",target:"_blank",type:"text/html",rel:"noopener noreferrer nofollow external author",href:"https://github.com/eldarlrd/tic-tac-toe"},[Object(u.a)("i",{class:"fa-brands fa-github mr1"}),"eldarlrd"])])])}var h=n(3),d=n.n(h),m=n(4),p=n.n(m),v=n(8),y=n.n(v);n(12);function w(t,e){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"===typeof t)return g(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g(t,e)}(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){c=!0,i=t},f:function(){try{s||null==n.return||n.return()}finally{if(c)throw i}}}}function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function O(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var n,r=Object(l.a)(t);if(e){var a=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(o.a)(this,n)}}var j=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],k=function(t){Object(c.a)(n,t);var e=O(n);function n(){var t;return Object(i.a)(this,n),(t=e.call(this)).state={actor:"",winner:"",mode:"PvE",gridBoxes:[],gameOver:!1,tiles:document.getElementsByClassName("board")},t}return Object(s.a)(n,[{key:"componentWillMount",value:function(){this.gridLoop()}},{key:"checkConditions",value:function(){this.checkVictory(this.state.tiles),this.checkDraw(this.state.tiles)}},{key:"checkVictory",value:function(t){var e=this,n=j.filter(function(n){return n.every(function(n){return t[n-1].innerText===e.state.actor})});if(1===n.length){new Audio(p.a).play();var r,a=w(n[0]);try{for(a.s();!(r=a.n()).done;){var i=r.value;t[i-1].classList.add("bg-light-green")}}catch(s){a.e(s)}finally{a.f()}this.setState({winner:this.state.actor,gameOver:!0})}}},{key:"checkDraw",value:function(t){Object(a.a)(t).every(function(t){return t.innerText.includes("X")||t.innerText.includes("O")})&&(new Audio(p.a).play(),this.setState({winner:""===this.state.winner?"None":this.state.winner,gameOver:!0}))}},{key:"switchMode",value:function(t){t!==this.state.mode&&(this.restart(),this.setState({mode:t}))}},{key:"restart",value:function(){new Audio(y.a).play(),this.setState({actor:"",winner:"",gridBoxes:[],gameOver:!1}),this.gridLoop()}},{key:"addActor",value:function(t){if(this.state.gameOver)this.restart();else{if(""!==t.innerText)return;"PvP"===this.state.mode?(new Audio(d.a).play(),this.switchActor(),t.innerText=this.state.actor,t.classList.add("X"===t.innerText?"dark-red":"blue"),this.checkConditions()):(new Audio(d.a).play(),this.switchActor(),t.innerText="X",t.classList.add("dark-red"),this.checkConditions(),""===this.state.winner&&this.computerMove())}}},{key:"computerMove",value:function(){this.switchActor();var t=Object(a.a)(this.state.tiles).filter(function(t){return""===t.innerText});t[0].innerText="O",t[0].classList.add("blue"),this.checkConditions()}},{key:"switchActor",value:function(){this.setState({actor:"X"===this.state.actor?"O":"X"})}},{key:"gridLoop",value:function(){for(var t=this,e=[],n=1;n<=9;n++)e.push(Object(u.a)("div",{key:n,id:n,onClick:function(e){return t.addActor(e.target)},style:{height:"calc(100% / 3)","font-family":"Patrick Hand, cursive","font-size":"5em"},class:"b board ba bw1 b--dark-blue pointer fl w-third flex items-center justify-center"},""));this.setState({gridBoxes:e})}},{key:"render",value:function(){var t=this;return Object(u.a)("div",{class:"min-vh-100 flex flex-column items-center justify-between bg-near-white"},[Object(u.a)(f),Object(u.a)("main",{class:"w-100 pb5 pt4 h-100 flex flex-column items-center justify-center"},[Object(u.a)("section",{class:"flex flex-column items-center justify-center mt4 mb4 f3 avenir dark-blue b"},[Object(u.a)("div",{class:"mb3"},[Object(u.a)("button",{onClick:function(){return t.switchMode("PvE")},title:"Player vs. Environment",style:{width:"7.5rem"},class:"".concat("PvE"===this.state.mode?"active-button":""," mr2 mb2 avenir bw0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pa2 ba bw1 b--dark-blue")},[Object(u.a)("i",{class:"fa-solid fa-robot h1 w1 mr3"})," PvE"]),Object(u.a)("button",{onClick:function(){return t.switchMode("PvP")},title:"Player vs. Player",style:{width:"7.5rem"},class:"".concat("PvP"===this.state.mode?"active-button":""," ml2 mb2 avenir bw0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pa2 ba bw1 b--dark-blue")},[Object(u.a)("i",{class:"fa-solid fa-user h1 w1 mr2"})," PvP"])]),""===this.state.winner?Object(u.a)("div",{style:{height:"28px","line-height":"28px"}},[Object(u.a)("span",["Player ",Object(u.a)("span",{style:{"font-family":"Patrick Hand, cursive"},class:"X"===this.state.actor?"b blue":"b dark-red"},"X"===this.state.actor?"O":"X")," to move"])]):"None"===this.state.winner?Object(u.a)("div",{style:{height:"28px","line-height":"28px"}},"It's a draw!"):Object(u.a)("div",["PvE"===this.state.mode&&"O"===this.state.winner?"Computer ":"Player ",Object(u.a)("span",{style:{"font-family":"Patrick Hand, cursive",height:"28px"},class:"X"===this.state.winner?"b dark-red":"b blue"},this.state.winner)," wins!"])]),Object(u.a)("section#gameBoard",{style:{width:"21em",height:"21em"},class:"mt2 mb3 cf"},[this.state.gridBoxes]),Object(u.a)("button",{onClick:function(){return t.restart()},class:"avenir bw0 bg-animate pointer bg-transparent dark-blue b mt4 f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue"},[Object(u.a)("i",{class:"fa-solid fa-repeat mr2"}),"Restart"])]),Object(u.a)(b)])}}]),n}(r.a);console.log("Tiktaq'to approved."),Object(r.g)(Object(r.c)(2,k),document.getElementById("app"))}],[[11,1,2]]]);
//# sourceMappingURL=main.6c2a59f5.chunk.js.map