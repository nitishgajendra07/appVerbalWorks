export function getUserArray() {
    console.log("starting getUserArray");
    function isUser(obj) {
        return ((typeof obj === "object") && ("userName" in obj) && (typeof obj.userName === "string") && ("password" in obj) && (typeof obj.password === "string") && ("scores" in obj));
    }
    let data = localStorage.getItem("userData");
    console.log(data);
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
