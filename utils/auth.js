import cookie from "js-cookie";
import Router from "next/router";

export function handleLogin(token) {
  cookie.set("token", token);
  Router.push("/account");
}


export function redirectUser(ctx, location) {
  //here we are redirecting in the server, if we have access to ctx then we are in the server not the client
  if(ctx.req){
    //redirecting with node
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
  } else {
    //otherwise we are redirecting in the client
    Router.push(location)
  }
}

export function handleLogout(){
  cookie.remove("token")
  
  //universally logout
  window.localStorage.setItem("logout", Date.now()) //follow-up logic is in _app.js componentdidmount 
  
  Router.push("/login")
}