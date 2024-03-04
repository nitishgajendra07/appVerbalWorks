import {User,UserArray} from "./types.js"
function getUserArray():UserArray{

    console.log("starting getUserArray");

function isUser(obj:any):obj is User{
    return (  (typeof obj ==="object") && ("userName" in obj)  && (typeof obj.userName==="string")  && ("password" in obj) && (typeof obj.password==="string")  && ("scores" in obj)  )
}

let data:string|null=localStorage.getItem("userData");   
console.log(data);

if(typeof data==="string"){
    console.log("data is of type string");
    let dataParsed:any
    try{
        console.log("inside try");
        dataParsed=JSON.parse(data);
        console.log(dataParsed);
    }catch{
        console.log("inside catch");
        localStorage.removeItem("userData");
        localStorage.setItem("userData",`[]`);
        console.log("returning from getUserArray()");
        return [] as UserArray;
    }
    if(Array.isArray(dataParsed)){
        console.log("dP is an array");
    }
    
    if(Array.isArray(dataParsed)  &&  dataParsed.every( (item)=>{return isUser(item)} )  ){
        console.log("dataparsed is of type UserArray");
        console.log("returning from getUserArray()");
        return dataParsed as UserArray;
    }
}
localStorage.removeItem("userData");
localStorage.setItem("userData",`[]`);
console.log("returning from getUserArray()");
return [] as UserArray;
}




const registerButton=document.getElementById("registerButton");



if(registerButton){



        registerButton.addEventListener("click",(e:MouseEvent)=>{
            e.preventDefault();
            const userNameElement=document.getElementById("registerUsername") as HTMLInputElement;
            const passwordElement=document.getElementById("registerPassword") as HTMLInputElement;
            const confirmPasswordElement=document.getElementById("confirmPassword") as HTMLInputElement;
            console.log(userNameElement);
            console.log(passwordElement);
            console.log(confirmPasswordElement);
            let inputUsername:string;
            let inputPassword:string
            let confirmPassword:string
        
            inputUsername=userNameElement.value;
            inputPassword=passwordElement.value;
            confirmPassword=confirmPasswordElement.value
            console.log(userNameElement.value);
            console.log(passwordElement.value);
            console.log(confirmPasswordElement.value);
            console.log(inputUsername);
            console.log(inputPassword);
            console.log(confirmPassword);
            let dataParsed=getUserArray();
            console.log(dataParsed);
            console.log(inputUsername);
            console.log(inputPassword);
            if(dataParsed.find((user)=>{return user.userName===inputUsername})){
                alert("username exists!")
                return;
            }
            if(inputPassword!==confirmPassword){
                alert("Please Re-enter the same password")
                return;
        
            }
            let newUserObj:User={
                userName:inputUsername,
                password: inputPassword,
                isLoggedIn:false,
                scores:{
                    verbalScore:[],
                    aptitudeScore:[],
                    programmingScore:[]
                }
            }

    
            dataParsed.push(newUserObj);
            console.log(dataParsed);
            localStorage.setItem("userData",JSON.stringify(dataParsed));
            alert("Registered successfully")
        })

    




}

