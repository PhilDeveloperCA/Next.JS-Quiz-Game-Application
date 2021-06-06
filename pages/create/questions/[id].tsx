import React, {useState, useRef} from 'react';
// @ts-ignore
import styles from '../../../styles/Home.module.css';

type Question = {
    question : string,
    points : Points[],
}
type Points =  {
    category : string,
    points : any
}

//intialize categories later -> 

export default function AddQuestion({categories}){
    const question_title = useRef<string>('');
    const question_points = useRef<Points[]>();
    
    const [questions, setQuestions] = useState<Question[]>([]);

    const questionForm = (
         questions.map(question => {
             return(
                 <div>
                     <h1>{question.question}</h1>
                     {categories.map((category) => {
                            return(
                                <div> 
                                    <label> {category} : </label>
                                    <input type="number" onChange={(e) => {}}/>
                                </div>
                            );
                        })}
                 </div>
             );
         })
    );

    function addQuestion(e:any){
        e.preventDefault();
        setQuestions([...questions, {question : question_title.current, points: question_points.current}]);
    }

    return (
        <main className={styles.main}>
            <label> Question Name: </label>
            <input onChange={(e)=> question_title.current = e.target.value}/>
            <button onClick={addQuestion}> Add Question </button>
            <label> Question Points : </label>
            {questionForm}
        </main>
    );
}   

//export async function getServerSideProps(context){
export const getServerSideProps = async (context) => {
    const {id} = context.query;
    var categories;
    const res = fetch(`http://localhost:3000/api/course/${id}`)
    .then(async (res) => {
        console.log('why');
        //categories = await res.json();
        //ategories = {"categories":["bob", "fred", "ted"]}
        categories = ["bob", "fred", "ted"];
    })
    .catch(err => {
        categories = ["bob", "fred", "ted"];
    })
    categories = ["bob", "fred", "ted"];
    return {
        props: {
            categories,
        }
    }
}