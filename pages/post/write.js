import { useRef, useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Write() {
    const idRef = useRef(undefined);
    const titleRef =  useRef(undefined);
    const contentRef =  useRef(undefined);

    const [showLink, setShowLink] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = idRef.current.value;
        const title = titleRef.current.value;
        const content = contentRef.current.value;

        if( id && title && content ){
            fetch(
                `/api/post/write`,
                {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({id, title, content})
                }
            )
            .then(response => {
                console.log(response);
                if(response.ok){
                    setShowLink(true);
                    return response.json();
                }
                
                throw new Error('Fetch Error');
            })
            .then(data => alert(data.message))
            .catch(error => alert(`request Error : ${error}`))
        }
    };

    return (
        <Layout>
            <h1>Write a Post</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='id' placeholder='id' ref={idRef} required />
                <br />
                <input type='text' name='title' placeholder='title' ref={titleRef} required />
                <br/>
                <textarea type='text' name='content' placeholder='content' ref={contentRef} required />
                <br />
                <input type='submit' value='submit'/>
            </form>
            {
                showLink && 
                <Link href={`/posts/${idRef.current.value}`}>
                    Created Post
                </Link>
            }
        </Layout>
    )
}