import {User,UserArray} from "./types.js"
function getUserArray(): UserArray {

    console.log("starting getUserArray");

    function isUser(obj: any): obj is User {
        return ((typeof obj === "object") && ("userName" in obj) && (typeof obj.userName === "string") && ("password" in obj) && (typeof obj.password === "string") && ("scores" in obj) && ("isLoggedIn" in obj))
    }

    let data: string | null = localStorage.getItem("userData");
    console.log("userData",data);

    if (typeof data === "string") {
        console.log("data is of type string");
        let dataParsed: any
        try {
            console.log("inside try");
            dataParsed = JSON.parse(data);
            console.log(dataParsed);
        } catch {
            console.log("inside catch");
            localStorage.removeItem("userData");
            localStorage.setItem("userData", `[]`);
            console.log("returning from getUserArray()");
            return [] as UserArray;
        }
        if (Array.isArray(dataParsed)) {
            console.log("dP is an array");
        }

        if (Array.isArray(dataParsed) && dataParsed.every((item) => { return isUser(item) })) {
            console.log("dataparsed is of type UserArray");
            console.log("returning from getUserArray()");
            return dataParsed as UserArray;
        }
    }
    localStorage.removeItem("userData");
    localStorage.setItem("userData", `[]`);
    console.log("returning from getUserArray()");
    return [] as UserArray;
}



