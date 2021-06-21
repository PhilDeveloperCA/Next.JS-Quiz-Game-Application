import React, {useState, useRef} from 'react';

type Question = {
    question : string,
    points : Points[],
}
type Points =  {
    category : string,
    points : any
}

//intialize categories later -> 

export default function AddQuestion(){
    const question_title = useRef<string>('');
    const question_points = useRef<Points[]>();

    return (
        <div>
            <label> Question Name: </label>
            <input onChange={(e)=> question_title.current = e.target.value}/>
            <label> Question Points : </label>
            
        </div>
    );
}   

export async function getServerSideProps(context){
    const {id} = context.query;
    const res = await fetch(`http://localhost:3000/api/course/${id}`);
    const course = await res.json();
    return {
        props: {
            course,
        }
    }
}