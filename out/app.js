function getUserArray() {
    console.log("starting getUserArray");
    function isUser(obj) {
        return ((typeof obj === "object") && ("userName" in obj) && (typeof obj.userName === "string") && ("password" in obj) && (typeof obj.password === "string") && ("scores" in obj) && ("isLoggedIn" in obj));
    }
    let data = localStorage.getItem("userData");
    console.log("userData", data);
    if (typeof data === "string") {
        console.log("data is of type string");
        let dataParsed;
        try {
            console.log("inside try");
            dataParsed = JSON.parse(data);
            console.log(dataParsed);
        }
        catch (_a) {
            console.log("inside catch");
            localStorage.removeItem("userData");
            localStorage.setItem("userData", `[]`);
            console.log("returning from getUserArray()");
            return [];
        }
        if (Array.isArray(dataParsed)) {
            console.log("dP is an array");
        }
        if (Array.isArray(dataParsed) && dataParsed.every((item) => { return isUser(item); })) {
            console.log("dataparsed is of type UserArray");
            console.log("returning from getUserArray()");
            return dataParsed;
        }
    }
    localStorage.removeItem("userData");
    localStorage.setItem("userData", `[]`);
    console.log("returning from getUserArray()");
    return [];
}
function checkIsLoggedInForAll() {
    let dataParsed = getUserArray();
    for (let i = 0; i < dataParsed.length; i++) {
        dataParsed[i].isLoggedIn = false;
    }
    localStorage.setItem("userData", JSON.stringify(dataParsed));
    console.log("after resetting l=isLoggedIn", dataParsed);
}
checkIsLoggedInForAll();
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener("click", (e) => {
            console.log("clicked login");
            e.preventDefault();
            let loginSuccess = false;
            const userNameElement = document.getElementById("loginUsername");
            const passwordElement = document.getElementById("loginPassword");
            let inputUsername;
            let inputPassword;
            // if("value" in userNameElement){
            inputUsername = userNameElement.value;
            // if("value" in passwordElement){
            inputPassword = passwordElement.value;
            console.log(userNameElement.value, passwordElement.value);
            console.log(inputUsername, inputPassword);
            let dataParsed = getUserArray();
            console.log("in onclick", dataParsed, dataParsed.length);
            for (let i = 0; i < dataParsed.length; i++) {
                if (inputUsername == dataParsed[i].userName && inputPassword == dataParsed[i].password) {
                    loginSuccess = true;
                    console.log("loginSuccess", loginSuccess);
                    dataParsed[i].isLoggedIn = true;
                    console.log("lofin", dataParsed);
                    localStorage.setItem("userData", JSON.stringify(dataParsed));
                }
            }
            if (loginSuccess === true) {
                window.location.href = "entry.html";
                // alert("login succrss")
            }
            else {
                alert("Invalid username or password");
            }
        });
    }
});
export {};
