(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{171:function(t,e,a){t.exports=a(300)},176:function(t,e,a){},178:function(t,e,a){},300:function(t,e,a){"use strict";a.r(e);var s=a(0),r=a.n(s),n=a(34),i=a.n(n),o=(a(176),a(158)),c=a(138),h=a(139),u=a(157),l=a(159),m=a(301),d=a(313),f=a(311),v=a(310),p=(a(177),a(178),["X","O","_"]),b=function(t){Object(l.a)(a,t);var e=Object(u.a)(a);function a(t){var s;return Object(c.a)(this,a),(s=e.call(this,t)).state={boared:s.createBoared(3),turn:0,win:"",err:"",areasToWin:3,tempAreas:"",mode:!0,first:!0},s}return Object(h.a)(a,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.resize.bind(this)),this.resize()}},{key:"resize",value:function(){var t=Math.floor(window.innerWidth/120);this.state.areasToWin>t&&(this.setState({areasToWin:t>=3?t:3}),this.setState({tempAreas:""}),this.initGame(t>=3?t:3))}},{key:"initGame",value:function(t,e){this.setState({turn:0,win:"",err:"",first:!this.state.first}),this.state.mode&&!e&&this.state.first?this.botTurn(!0):this.setState({boared:this.createBoared(t||this.state.areasToWin)})}},{key:"botTurn",value:function(t){var e=t?1:this.state.turn+1;this.setState({turn:e+1});var a=t?this.createBoared(this.state.areasToWin):this.state.boared,s=[0,0];a.forEach((function(t,e){t.forEach((function(t,a){p[t]===p[p.length-1]&&(s=[e,a])}))})),a[s[0]][s[1]]=e%2,t?this.setState({boared:a}):this.checkWin(e%2)}},{key:"createBoared",value:function(t){for(var e=[],a=0;a<t;a++){for(var s=[],r=0;r<t;r++)s.push(2);e.push(s)}return e}},{key:"checkWin",value:function(t){for(var e=0,a=0,s=0;s<this.state.areasToWin;s++){e=0,a=0;for(var r=0;r<this.state.areasToWin;r++)this.state.boared[s][r]===t&&(e+=1),this.state.boared[r][s]===t&&(a+=1);if(e===this.state.areasToWin||a===this.state.areasToWin)return this.setState({win:p[t]}),!0;e=0,a=0;for(var n=0;n<this.state.areasToWin;n++)this.state.boared[n][n]===t&&(e+=1),this.state.boared[n][this.state.areasToWin-1-n]===t&&(a+=1);if(e===this.state.areasToWin||a===this.state.areasToWin)return this.setState({win:p[t]}),!0}return this.state.turn===this.state.areasToWin*this.state.areasToWin-1&&this.setState({win:"No one"}),!1}},{key:"renderBoared",value:function(){var t=this;return this.state.boared.map((function(e,a){return r.a.createElement("div",null,e.map((function(e,s){return r.a.createElement(m.a,{color:"teal",size:"massive",className:"place",onClick:function(){if(!t.state.win){var e=Object(o.a)({},t.state.boared);if(p[e[a][s]]===p[p.length-1]){e[a][s]=t.state.turn%2;var r=t.checkWin(t.state.turn%2);t.setState({err:""}),!r&&t.state.mode?t.botTurn():t.setState({turn:t.state.turn+1})}else t.setState({err:"You can choose only places that were not chosen"})}}},p[e])})))}))}},{key:"render",value:function(){var t=this;return r.a.createElement("div",{className:"my-tic-tac-toe"},r.a.createElement(d.a,{className:"my-header",size:"huge"},"Tic Tac Toe"),this.renderBoared(),r.a.createElement(f.a,{onSubmit:function(){Number(t.state.tempAreas)<Math.floor(window.innerWidth/120)+1&&Number(t.state.tempAreas)>2?(t.setState({areasToWin:Number(t.state.tempAreas)}),t.setState({tempAreas:""}),t.initGame(Number(t.state.tempAreas))):Math.floor(window.innerWidth/120)>3?t.setState({err:"You can only choose between 3 to "+Math.floor(window.innerWidth/120)}):t.setState({err:"In your phone the max size is 3"})}},r.a.createElement(f.a.Field,{className:"my-field"},r.a.createElement(m.a,{color:"twitter",type:"submit"},"Apply Changes"),r.a.createElement(v.a,{className:"my-input",value:this.state.tempAreas,placeholder:"Num of areas...",onChange:function(e){var a=e.target.value[e.target.value.length-1];(a>="0"&&a<="9"||void 0===a)&&t.setState({tempAreas:e.target.value})}}))),r.a.createElement(m.a,{className:"place",size:"large",color:"red",onClick:function(){t.setState({mode:!t.state.mode})}},this.state.mode?"Play vs friend":"Play vs computer"),this.state.win&&r.a.createElement(d.a,{size:"large"},this.state.win+" won the game"),this.state.err&&r.a.createElement(d.a,{size:"large"},this.state.err),this.state.win&&r.a.createElement(m.a,{size:"large",color:"red",onClick:function(){t.initGame()}},"Start again"))}}]),a}(s.Component);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root"))}},[[171,1,2]]]);
//# sourceMappingURL=main.ccc3d171.chunk.js.map