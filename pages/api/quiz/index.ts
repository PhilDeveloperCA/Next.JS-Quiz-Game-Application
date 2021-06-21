import connectDB from '../../../db/connect';
import Quiz from '../../../db/Quiz';

type Category = {
    name:string,
    ranks: Rank[],
}

type Rank = {
    name:string,
    lower_bound:number
}

type Quiz = {
    title: string,
    categories : Category[],
}

const handler = (req,res) => {
    const {title,categories} = req.body;
    if(req.method === 'POST'){
        const new_quiz = new Quiz({
            title:title,
            categories:categories,
        })
        const quiz_created = await new_quiz.save();
    }
    if(req.method === 'GET'){

    }
}

export default connectDB(handler);