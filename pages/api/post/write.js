import { createPost } from "../../../lib/posts";
import { format } from 'date-fns'

export default async function handler(req, res) {

    const { id, title, content} = req.body;

    try {
        await createPost({id, title, date: format(new Date(), `yyyy-mm-dd`), content})
        res.status(200).json({message: 'create Success'});
    } catch (error) {
        console.log('real Error');
        res.status(500).json({message: 'create error'});
    }
    
}