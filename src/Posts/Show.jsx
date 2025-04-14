import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../Context/AppContext";

export default function Show() {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const {user, token} = useContext(AppContext);

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);

        const data = await res.json();

        if (res.ok) {
            setPost(data.post)
        }

    }

    async function handleDelete(e) {
        e.preventDefault();

        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${token}`       
            }
            });
    
            const data = await res.json();

            if (res.ok) {
                navigate('/');
            }
            console.log(res);
    
            console.log(data);

        }        
    }

    useEffect(() => {
        getPost(), []
    })

    return(
        <>
            <h1 className="title">Latest posts {name}</h1>
    
            {post ? 
                    <div key={post.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
                        <div className="mb-2 flex items-start justify-between">
                            <div>
                                <h2 className="font-bold text-2xl">{post.title}</h2>
                                <small className="text-xs text-slate-600">Created by {post.user.name} on {" "}
                                    {new Date(post.created_at).toLocaleTimeString()}
                                </small>
                            </div>
                        </div>
                        <p>{post.body}</p>
                        {user && user.id === post.user_id &&
                        <div className="flex items-center justify-end gap-4">
                            <Link to={`/posts/update/${post.id}`} className="bg-green-500 text-white text-sm rounded-lg px-3 py-1">Update</Link>
                            <form className="">
                                <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1" onSubmit={handleDelete}>Delete</button>
                            </form>
                        </div>
                        }
                    </div>
                 : <p> Post not found!</p>}
        </>
        );
}