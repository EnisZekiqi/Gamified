import axios from 'axios';
import reactquiz from '../quizzes/react.json'
import jsquiz from '../quizzes/javascript.json'
import cssquiz from '../quizzes/css.json'
export async function getCategories() {
    const res = await axios('https://opentdb.com/api.php?amount=10')
    return res.data.results;
}

export async function getCategoryList() {
    const res = await axios('https://opentdb.com/api_category.php')
    return res.data.trivia_categories;
}

export async function newestCategory() {
    const [reactData, jsData, cssData] = await Promise.all([
        Promise.resolve(reactquiz),
        Promise.resolve(jsquiz),
        Promise.resolve(cssquiz)
    ]);
    return {
        'React': reactData,
        'JavaScript': jsData,
        'CSS': cssData
    };
}