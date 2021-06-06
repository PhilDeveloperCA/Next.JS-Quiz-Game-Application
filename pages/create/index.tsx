import React, {useState, useRef} from 'react';
// @ts-ignore
import styles from '../../styles/Home.module.css';

type Rank = {
    name : string,
    lower_bound:number,
}

type Category = {
    name : string,
    ranks : Rank[]
}

type Quiz = {
    name : string,
    categories : Category[]
}

export default function CreateQuiz(){
    //const [name, setQuizName] = useState(null);
    //useRefs
    const quizName = useRef<string>('');
    const categoryName = useRef<string>('');
    const rankName = useRef<string>('');


    const [submissionError, setSubmissionError] = useState(null);
    const [nameError, setNameError] = useState<string|null>(null);
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<null|number>(null);

    const [categoryError, setCategoryError] = useState<string|null>(null);
    const [rankNameError, setRankNameError] = useState<string|null>(null);

    const deleteCategory = (index:number) => {
        if(selectedCategory === index){
            setSelectedCategory(null);
        }
        setCategories([...categories.slice(0,index), ...categories.slice(index+1)]);
    }

    const submitHandler = () => {
        if(quizName.current === ''){
            setNameError('Enter a Valid Name');
        }

    }

    const addCategory = (e:any) => {
        e.preventDefault();
        if(categoryName.current === ''){
            setCategoryError('Enter a Valid Category Name');
        }
        setCategories([...categories, {name:categoryName.current, ranks:[]}]);
        categoryName.current = '';
    }

    const categoriesList = categories.map((category:Category,index:number) => {
        return (
            <div>
                <h1> {category.name} </h1>
                <button onClick={(e) => setSelectedCategory(index)}> Select : </button>
            </div>
        );
    })

    const categoriesForm = categories.map((category:Category) => {
        return (
        <div key={category.name}>
            <h1> {`${category.name}`} </h1>
            <form>
                <label> Rank Name: </label>
                <input onChange={(e) => rankName.current = e.target.value}/>
                <button> Submit Name: </button>
            </form>
        </div>
        );
    });

    const submitRank = (e:any) => {
        e.preventDefault();
        if(selectedCategory === null) return;
        var CategoryChanging = categories[selectedCategory];
        CategoryChanging = {...CategoryChanging, ranks:[...CategoryChanging.ranks, {name:rankName.current, lower_bound: 0}]}
        setCategories([...categories.slice(0,selectedCategory),CategoryChanging,...categories.slice(selectedCategory+1)]);
        console.log(categories);
    }

    const BlurRankReorder= (rankIndex: number, e:any) => {
        var percent = e.target.value || null
        if(selectedCategory === null) return;
        if(percent === null || percent === '') {percent = '0'}
        percent = parseInt(percent);
        var editedCategory = {...categories[selectedCategory]};
        var editRanks = [...editedCategory.ranks];
        editRanks[rankIndex] = {name : editRanks[rankIndex].name, lower_bound : percent};
        editRanks.sort((a,b) => a.lower_bound - b.lower_bound);
        editedCategory.ranks = editRanks;
        setCategories([...categories.slice(0,selectedCategory), editedCategory, ...categories.slice(selectedCategory+1)]);
     }

     const setLowerBound = (rankIndex: number, e:any) => {
        var percent = e.target.value || null
        if(selectedCategory === null) return;
        if(percent === null || percent === '') {percent = '0'}
        percent = parseInt(percent);
        var editedCategory = {...categories[selectedCategory]};
        var editRanks = [...editedCategory.ranks];
        editRanks[rankIndex] = {name : editRanks[rankIndex].name, lower_bound : percent};
        editedCategory.ranks = editRanks;
        setCategories([...categories.slice(0,selectedCategory), editedCategory, ...categories.slice(selectedCategory+1)]);
     }


    const rankForm = selectedCategory === null? null:(
        <div>
            <h1> {categories[selectedCategory].name} </h1>
            <form>
                <label> Rank Name: </label>
                <input onChange={(e) => rankName.current = e.target.value}/>
                <button onClick={submitRank}> Submit Name: </button>
            </form>
            <table>
                <thead>
                    <td> Name </td>
                    <td> Lower Bound </td>
                </thead>
                <tbody>
                    {categories[selectedCategory].ranks.map((rank,index) => <tr key={rank.name}> 
                    <td>{rank.name} </td>
                    <td> <input value={rank.lower_bound} onBlur = {(e) => BlurRankReorder(index,e)} onChange={(e) => setLowerBound(index, e)}/></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
    
    return (
        <main className={styles.main}>
            <form>
                <label> Quiz Name: </label>
                <input onChange={(e) => quizName.current = e.target.value}/>
                <label> Add Category : </label>
                <input onChange={(e) => categoryName.current = e.target.value}/>
                <button onClick={addCategory}> Add : </button>
            </form>
            {categoriesList}
            {rankForm}
        </main>
    );

}