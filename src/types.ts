export type User={
    userName: string,
    password:string,
    scores:{
        verbalScore:number[],
        aptitudeScore:number[],
        programmingScore:number[]
    }
    isLoggedIn:boolean
}
export type UserArray= Array<User>





// ----------------------------------------
// appVerbal

export type Question = {
    id: number,
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string
};

export type Questions = Question[];

export type Answer = {
    q_id: number,
    ans: string
};

export type Answers = Answer[];

export type AnswerEntered = { id: number, optionChosen: string };

// export{Question,Questions,Answer,Answers,AnswerEntered}