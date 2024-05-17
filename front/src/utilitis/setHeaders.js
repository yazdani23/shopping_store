function setHeaders(type) {
    
    let token="";
    let emailUser="";

    if (localStorage.getItem("token")) {
        token=localStorage.getItem("token")
    }
    if (localStorage.getItem("userInfo")) {
        emailUser=JSON.parse(localStorage.getItem("userInfo")).email
    }
    const headers={
        "Content-Type": "application/json" ,
        "token":token,
        "email-user":emailUser
   }
    if (type==="file") {
        headers["Content-Type"]='multipart/form-data';
    }

    return headers
}
export default setHeaders