(function(){"use strict";var e={8869:function(e,s,t){var o=t(9242),n=t(3396);const r={class:"app"};function a(e,s,t,o,a,i){const u=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)("div",r,[(0,n.Wm)(u)])}var i={name:"App"},u=t(89);const d=(0,u.Z)(i,[["render",a]]);var p=d,c=t(65),l=t(5939);const g={state:()=>({isAuth:!1,token:localStorage.getItem("token"),isLoading:!1,login:"",avatar:"",owner:"",repositories:[],totalRepositories:0,count:0,hasNextPage:!1,endCursor:"",hasPreviousPage:!1,startCursor:""}),getters:{},mutations:{setIsAuth(e,s){e.isAuth=s},setToken(e,s){e.token=s},setRepositories(e,s){e.repositories=s},setIsLoading(e,s){e.isLoading=s},setLogin(e,s){e.login=s},setAvatar(e,s){e.avatar=s},setTotalRepositories(e,s){e.totalRepositories=s},setCount(e,s){e.count=s},setHasNextPage(e,s){e.hasNextPage=s},setEndCursor(e,s){e.endCursor=s},setHasPreviousPage(e,s){e.hasPreviousPage=s},setStartCursor(e,s){e.startCursor=s}},actions:{async fetchRepos({commit:e,state:s}){e("setIsLoading",!0);try{const t=await l.Z.post("https://api.github.com/graphql",{query:'{\n  repositoryOwner(login: "octocat") {\n    repositories(first: 100, orderBy: {field: NAME, direction: ASC}) {\n      totalCount\n      pageInfo {\n        hasNextPage\n        endCursor\n        hasPreviousPage\n        startCursor\n      }\n      nodes {\n        name\nowner {\n            login\n          }      }\n    }\n    avatarUrl\n    login\n  }\n}'},{headers:{"Content-Type":"application/json",Authorization:"token "+s.token}});e("setLogin",t.data.data.repositoryOwner.login),e("setAvatar",t.data.data.repositoryOwner.avatarUrl),e("setRepositories",t.data.data.repositoryOwner.repositories.nodes),e("setTotalRepositories",t.data.data.repositoryOwner.repositories.totalCount),e("setCount",t.data.data.repositoryOwner.repositories.nodes.length),e("setHasNextPage",t.data.data.repositoryOwner.repositories.pageInfo.hasNextPage),e("setEndCursor",t.data.data.repositoryOwner.repositories.pageInfo.endCursor),e("setHasPreviousPage",t.data.data.repositoryOwner.repositories.pageInfo.hasPreviousPage),e("setStartCursor",t.data.data.repositoryOwner.repositories.pageInfo.startCursor)}catch(t){e("setIsAuth",!1),alert(t.response.data.message)}finally{e("setIsLoading",!1)}},async loadNextRepos({commit:e,state:s}){e("setIsLoading",!0);try{const t=await l.Z.post("https://api.github.com/graphql",{query:`{\n  repositoryOwner(login: "octocat") {\n    login\n    avatarUrl\n    repositories(\n      first: 100\n      orderBy: {field: NAME, direction: ASC}\n      after: "${s.endCursor}"\n    ) {\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      nodes {\n        name\n        owner {\n          login\n        }\n      }\n    }\n  }\n}`},{headers:{"Content-Type":"application/json",Authorization:"token "+s.token}});e("setLogin",t.data.data.repositoryOwner.login),e("setAvatar",t.data.data.repositoryOwner.avatarUrl),e("setRepositories",t.data.data.repositoryOwner.repositories.nodes),e("setTotalRepositories",t.data.data.repositoryOwner.repositories.totalCount),e("setCount",t.data.data.repositoryOwner.repositories.nodes.length),e("setHasNextPage",t.data.data.repositoryOwner.repositories.pageInfo.hasNextPage),e("setEndCursor",t.data.data.repositoryOwner.repositories.pageInfo.endCursor),e("setHasPreviousPage",t.data.data.repositoryOwner.repositories.pageInfo.hasPreviousPage),e("setStartCursor",t.data.data.repositoryOwner.repositories.pageInfo.startCursor)}catch(t){alert(t.response.data.message)}finally{e("setIsLoading",!1)}},async loadPrevRepos({commit:e,state:s}){e("setIsLoading",!0);try{const t=await l.Z.post("https://api.github.com/graphql",{query:`{\n  repositoryOwner(login: "octocat") {\n    login\n    avatarUrl\n    repositories(\n      first: 100\n      orderBy: {field: NAME, direction: ASC}\n      before: "${s.startCursor}"\n    ) {\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      nodes {\n        name\n        owner {\n          login\n        }\n      }\n    }\n  }\n}`},{headers:{"Content-Type":"application/json",Authorization:"token "+s.token}});e("setLogin",t.data.data.repositoryOwner.login),e("setRepositories",t.data.data.repositoryOwner.repositories.nodes),e("setTotalRepositories",t.data.data.repositoryOwner.repositories.totalCount),e("setCount",t.data.data.repositoryOwner.repositories.nodes.length),e("setHasNextPage",t.data.data.repositoryOwner.repositories.pageInfo.hasNextPage),e("setEndCursor",t.data.data.repositoryOwner.repositories.pageInfo.endCursor),e("setHasPreviousPage",t.data.data.repositoryOwner.repositories.pageInfo.hasPreviousPage),e("setStartCursor",t.data.data.repositoryOwner.repositories.pageInfo.startCursor)}catch(t){alert(t.response.data.message)}finally{e("setIsLoading",!1)}}},namespaced:!0},h={state:()=>({isLoading:!1,currentRepo:{},currentIssues:{},countIssues:0,hasNextPage:!1,endCursor:"",hasPreviousPage:!1,startCursor:""}),getters:{},mutations:{setIsLoading(e,s){e.isLoading=s},setCurrentRepo(e,s){e.currentRepo=s},setCurrentIssues(e,s){e.currentIssues=s},setCountIssues(e,s){e.countIssues=s},setHasNextPage(e,s){e.hasNextPage=s},setEndCursor(e,s){e.endCursor=s},setHasPreviousPage(e,s){e.hasPreviousPage=s},setStartCursor(e,s){e.startCursor=s}},actions:{async fetchIssues({commit:e,state:s},t){e("setIsLoading",!0);try{const o=await l.Z.post("https://api.github.com/graphql",{query:`query MyQuery {\n  repository(name: "${t}", owner: "${s.currentRepo.owner.login}") {\n    issues(first: 20, orderBy: {field: CREATED_AT, direction: ASC}) {\n      totalCount\n      nodes {\n        bodyText\n        state\n        title\n        comments(first: 100, orderBy: {field: UPDATED_AT, direction: ASC}) {\n          nodes {\n            bodyText \n            createdAt\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n}`},{headers:{"Content-Type":"application/json",Authorization:"token "+this.state.repositories.token}});e("setCurrentIssues",o.data.data.repository.issues),e("setCountIssues",o.data.data.repository.issues.nodes.length),e("setHasNextPage",o.data.data.repository.issues.pageInfo.hasNextPage),e("setEndCursor",o.data.data.repository.issues.pageInfo.endCursor),e("setHasPreviousPage",o.data.data.repository.issues.pageInfo.hasPreviousPage),e("setStartCursor",o.data.data.repository.issues.pageInfo.startCursor)}catch(o){alert(o.response.data.message)}finally{e("setIsLoading",!1)}},async fetchPrevIssues({commit:e,state:s}){e("setIsLoading",!0);try{const t=await l.Z.post("https://api.github.com/graphql",{query:`{\n  repository(name: "${s.currentRepo.name}", owner: "${s.currentRepo.owner.login}") {\n    issues(\n      first: 20\n      orderBy: {field: CREATED_AT, direction: ASC}\n      before: "${s.startCursor}"\n    ) {\n      totalCount\n      nodes {\n        bodyText\n        state\n        title\n        comments(first: 100, orderBy: {field: UPDATED_AT, direction: ASC}) {\n          nodes {\n            bodyText\n            createdAt\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n}`},{headers:{"Content-Type":"application/json",Authorization:"token "+this.state.repositories.token}});e("setCurrentIssues",t.data.data.repository.issues),e("setCountIssues",t.data.data.repository.issues.nodes.length),e("setHasNextPage",t.data.data.repository.issues.pageInfo.hasNextPage),e("setEndCursor",t.data.data.repository.issues.pageInfo.endCursor),e("setHasPreviousPage",t.data.data.repository.issues.pageInfo.hasPreviousPage),e("setStartCursor",t.data.data.repository.issues.pageInfo.startCursor)}catch(t){alert(t.response.data.message)}finally{e("setIsLoading",!1)}},async fetchNextIssues({commit:e,state:s}){e("setIsLoading",!0);try{const t=await l.Z.post("https://api.github.com/graphql",{query:`{\n  repository(name: "${s.currentRepo.name}", owner: "${s.currentRepo.owner.login}") {\n    issues(\n      first: 20\n      orderBy: {field: CREATED_AT, direction: ASC}\n      after: "${s.endCursor}"\n    ) {\n      totalCount\n      nodes {\n        bodyText\n        state\n        title\n        comments(first: 100, orderBy: {field: UPDATED_AT, direction: ASC}) {\n          nodes {\n            bodyText\n            createdAt\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n}`},{headers:{"Content-Type":"application/json",Authorization:"token "+this.state.repositories.token}});console.log(t),e("setCurrentIssues",t.data.data.repository.issues),e("setCountIssues",t.data.data.repository.issues.nodes.length),e("setHasNextPage",t.data.data.repository.issues.pageInfo.hasNextPage),e("setEndCursor",t.data.data.repository.issues.pageInfo.endCursor),e("setHasPreviousPage",t.data.data.repository.issues.pageInfo.hasPreviousPage),e("setStartCursor",t.data.data.repository.issues.pageInfo.startCursor)}catch(t){alert(t.response.data.message)}finally{e("setIsLoading",!1)}}},namespaced:!0};var m=(0,c.MT)({modules:{repositories:g,issues:h}}),y=t(7139);const v=e=>((0,n.dD)("data-v-8de34140"),e=e(),(0,n.Cn)(),e),f={class:"main"},C=v((()=>(0,n._)("h1",null,"SEARCHING REPOSITORIES",-1))),I={class:"login"},P=v((()=>(0,n._)("h2",null,"Your token",-1))),w=["value"],x={key:0,class:"loader"},_={key:1,class:"dropdown"},A=["src"],k={class:"header"},O=v((()=>(0,n._)("div",{class:"triangle-left"},null,-1))),N=v((()=>(0,n._)("span",{class:"icon_text"},"Load previous repositories",-1))),R=[O,N],b=v((()=>(0,n._)("div",{class:"triangle-right"},null,-1))),T=v((()=>(0,n._)("span",{class:"icon_text"},"Load next repositories",-1))),L=[b,T],S=v((()=>(0,n._)("h3",null,"You can change your token if something went wrong",-1)));function E(e,s,t,r,a,i){const u=(0,n.up)("SimpleTypeahead");return(0,n.wg)(),(0,n.iD)("div",f,[C,(0,n.wy)((0,n._)("div",I,[P,(0,n._)("input",{class:"input",value:e.token,onInput:s[0]||(s[0]=(...e)=>i.updateInput&&i.updateInput(...e)),type:"text",placeholder:"Enter your Github token to get access"},null,40,w),(0,n._)("button",{class:"btn",onClick:s[1]||(s[1]=e=>i.initialize(!0))},"OK")],512),[[o.F8,!e.isAuth]]),e.isLoading?((0,n.wg)(),(0,n.iD)("span",x)):(0,n.kq)("",!0),!e.isLoading&&e.isAuth?((0,n.wg)(),(0,n.iD)("div",_,[(0,n._)("h2",null,(0,y.zw)(this.login),1),(0,n._)("img",{class:"avatar",src:this.avatar,alt:"avatar"},null,8,A),(0,n._)("div",k,[(0,n.wy)((0,n._)("div",{onClick:s[2]||(s[2]=(...s)=>e.loadPrevRepos&&e.loadPrevRepos(...s)),class:"icons"},R,512),[[o.F8,this.hasPreviousPage]]),(0,n._)("h2",null,"Repositories: "+(0,y.zw)(this.count)+" of "+(0,y.zw)(this.totalRepositories),1),(0,n.wy)((0,n._)("div",{onClick:s[3]||(s[3]=(...e)=>this.loadNextRepos&&this.loadNextRepos(...e)),class:"icons"},L,512),[[o.F8,this.hasNextPage]])]),(0,n.Wm)(u,{id:"typeahead_id",placeholder:"Search...",items:this.repositories.map((e=>e.name)),minInputLength:0,onSelectItem:i.selectItemEventHandler},null,8,["items","onSelectItem"]),S,(0,n._)("button",{onClick:s[4]||(s[4]=(...e)=>i.changeToken&&i.changeToken(...e)),class:"btn2"},"Change token")])):(0,n.kq)("",!0)])}t(7658);var D=t(9825),z=(t(455),{name:"MainPage",methods:{...(0,c.OI)({setIsAuth:"repositories/setIsAuth",setToken:"repositories/setToken",setCurrentRepo:"issues/setCurrentRepo"}),...(0,c.nv)({fetchRepos:"repositories/fetchRepos",loadNextRepos:"repositories/loadNextRepos",loadPrevRepos:"repositories/loadPrevRepos"}),selectItemEventHandler(e){const s=this.repositories.find((s=>s.name===e));this.setCurrentRepo(s),this.$router.push(`/repository/${e}`)},updateInput(e){this.setToken(e.target.value),localStorage.setItem("token",e.target.value)},initialize(e){this.setIsAuth(e),this.fetchRepos()},changeToken(){this.setIsAuth(!1)}},components:{SimpleTypeahead:D.Z},computed:{...(0,c.rn)({isAuth:e=>e.repositories.isAuth,token:e=>e.repositories.token,isLoading:e=>e.repositories.isLoading,login:e=>e.repositories.login,avatar:e=>e.repositories.avatar,repositories:e=>e.repositories.repositories,totalRepositories:e=>e.repositories.totalRepositories,count:e=>e.repositories.count,hasNextPage:e=>e.repositories.hasNextPage,hasPreviousPage:e=>e.repositories.hasPreviousPage})},mounted(){}});const H=(0,u.Z)(z,[["render",E],["__scopeId","data-v-8de34140"]]);var q=H;const j=e=>((0,n.dD)("data-v-4b532c49"),e=e(),(0,n.Cn)(),e),$={class:"wrapper"},Z={class:"header"},B={key:0,class:"loader"},F={key:1,class:"issuesList"},M={class:"issuesPagination"},U=j((()=>(0,n._)("div",{class:"triangle-left"},null,-1))),Y=j((()=>(0,n._)("span",{class:"icon_text"},"Load previous repositories",-1))),K=[U,Y],W=j((()=>(0,n._)("div",{class:"triangle-right"},null,-1))),G=j((()=>(0,n._)("span",{class:"icon_text"},"Load next repositories",-1))),V=[W,G];function Q(e,s,t,r,a,i){const u=(0,n.up)("IssueItem");return(0,n.wg)(),(0,n.iD)("div",$,[(0,n._)("div",Z,[(0,n._)("button",{class:"btn",onClick:s[0]||(s[0]=s=>e.$router.push("/"))},"Back to Main"),(0,n._)("h1",null,"Repository:"+(0,y.zw)(e.$route.params.title),1)]),this.isLoading?((0,n.wg)(),(0,n.iD)("span",B)):((0,n.wg)(),(0,n.iD)("div",F,[(0,n._)("div",M,[(0,n.wy)((0,n._)("div",{onClick:s[1]||(s[1]=(...e)=>this.fetchPrevIssues&&this.fetchPrevIssues(...e)),class:"icons"},K,512),[[o.F8,this.hasPreviousPage]]),(0,n._)("h2",null,"Issues: "+(0,y.zw)(this.countIssues)+" of "+(0,y.zw)(this.currentIssues.totalCount),1),(0,n.wy)((0,n._)("div",{onClick:s[2]||(s[2]=(...e)=>this.fetchNextIssues&&this.fetchNextIssues(...e)),class:"icons"},V,512),[[o.F8,this.hasNextPage]])]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(this.currentIssues.nodes,((e,s)=>((0,n.wg)(),(0,n.j4)(u,{index:s,issue:e,key:s},null,8,["index","issue"])))),128))]))])}const J=e=>((0,n.dD)("data-v-5055dc6c"),e=e(),(0,n.Cn)(),e),X={class:"description"},ee={class:"comments"},se=J((()=>(0,n._)("h3",null,"No comments in this issue",-1))),te=[se];function oe(e,s,t,r,a,i){const u=(0,n.up)("CommentItem");return(0,n.wg)(),(0,n.iD)("div",{class:"issue",onClick:s[0]||(s[0]=(...e)=>i.showComments&&i.showComments(...e))},[(0,n._)("h2",null,"Issue №"+(0,y.zw)(t.index+1),1),(0,n._)("h3",null,"Title:"+(0,y.zw)(t.issue.title),1),(0,n._)("span",X,"Description:"+(0,y.zw)(t.issue.bodyText),1),(0,n._)("span",null,"Status: "+(0,y.zw)(t.issue.state),1),(0,n.wy)((0,n._)("h2",null,"Comments",512),[[o.F8,a.isActive]]),(0,n.wy)((0,n._)("div",ee,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(this.issue.comments.nodes,((e,s)=>((0,n.wg)(),(0,n.iD)("div",{key:s,class:"item"},[(0,n.wy)((0,n.Wm)(u,{index:s,comment:e},null,8,["index","comment"]),[[o.F8,a.isActive]])])))),128))],512),[[o.F8,this.issue.comments.nodes.length]]),(0,n.wy)((0,n._)("div",null,te,512),[[o.F8,a.isActive&&!this.issue.comments.nodes.length]])])}const ne={class:"wrapper"},re={class:"comment"},ae={class:"description"};function ie(e,s,t,o,r,a){return(0,n.wg)(),(0,n.iD)("div",ne,[(0,n._)("div",re,[(0,n._)("h3",null,"Comment №"+(0,y.zw)(t.index+1),1),(0,n._)("span",ae,"Description: "+(0,y.zw)(t.comment.bodyText),1),(0,n._)("span",null,"Created: "+(0,y.zw)(t.comment.createdAt.replace(/[A-Z]/g," ")),1)])])}var ue={name:"CommentItem",props:{comment:{type:Object,required:!0},index:{type:Number,required:!0}},methods:{...(0,c.OI)({setCommentsAreVisible:"setCommentsAreVisible"})}};const de=(0,u.Z)(ue,[["render",ie],["__scopeId","data-v-9587c8c2"]]);var pe=de,ce={name:"IssueItem",data(){return{isActive:!1}},components:{CommentItem:pe},props:{issue:{type:Object,required:!0},index:{type:Number,required:!0}},methods:{showComments(){this.isActive=!this.isActive}},computed:{}};const le=(0,u.Z)(ce,[["render",oe],["__scopeId","data-v-5055dc6c"]]);var ge=le,he={name:"RepositoryPage",components:{IssueItem:ge},methods:{...(0,c.nv)({fetchIssues:"issues/fetchIssues",fetchPrevIssues:"issues/fetchPrevIssues",fetchNextIssues:"issues/fetchNextIssues"})},computed:{...(0,c.rn)({isLoading:e=>e.issues.isLoading,currentIssues:e=>e.issues.currentIssues,countIssues:e=>e.issues.countIssues,hasNextPage:e=>e.issues.hasNextPage,hasPreviousPage:e=>e.issues.hasPreviousPage})},mounted(){this.fetchIssues(this.$route.params.title)}};const me=(0,u.Z)(he,[["render",Q],["__scopeId","data-v-4b532c49"]]);var ye=me,ve=t(2483);const fe=[{path:"/",component:q},{path:"/repository/:title",component:ye}],Ce=(0,ve.p7)({routes:fe,history:(0,ve.PO)("/")});var Ie=Ce;(0,o.ri)(p).use(m).use(Ie).mount("#app")}},s={};function t(o){var n=s[o];if(void 0!==n)return n.exports;var r=s[o]={exports:{}};return e[o](r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(s,o,n,r){if(!o){var a=1/0;for(p=0;p<e.length;p++){o=e[p][0],n=e[p][1],r=e[p][2];for(var i=!0,u=0;u<o.length;u++)(!1&r||a>=r)&&Object.keys(t.O).every((function(e){return t.O[e](o[u])}))?o.splice(u--,1):(i=!1,r<a&&(a=r));if(i){e.splice(p--,1);var d=n();void 0!==d&&(s=d)}}return s}r=r||0;for(var p=e.length;p>0&&e[p-1][2]>r;p--)e[p]=e[p-1];e[p]=[o,n,r]}}(),function(){t.n=function(e){var s=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(s,{a:s}),s}}(),function(){t.d=function(e,s){for(var o in s)t.o(s,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:s[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)}}(),function(){var e={143:0};t.O.j=function(s){return 0===e[s]};var s=function(s,o){var n,r,a=o[0],i=o[1],u=o[2],d=0;if(a.some((function(s){return 0!==e[s]}))){for(n in i)t.o(i,n)&&(t.m[n]=i[n]);if(u)var p=u(t)}for(s&&s(o);d<a.length;d++)r=a[d],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(p)},o=self["webpackChunkvue_app"]=self["webpackChunkvue_app"]||[];o.forEach(s.bind(null,0)),o.push=s.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(8869)}));o=t.O(o)})();
//# sourceMappingURL=app.410cfc6f.js.map