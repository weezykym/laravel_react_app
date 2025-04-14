import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

export default function Home() {

    const {name} = useContext(AppContext);
    const [posts, setposts] = useState([]);

    async function getPosts() {
        const res = await fetch('/api/posts');
        const data = await res.json();

        if (res.ok) {
            setposts(data);
        }        
    }

    useEffect(() => {
        getPosts();
    }, [])


    return(
    <>
        <h1 className="title">Latest posts {name}</h1>

        {posts.length > 0 ? (posts.map((post) => (
                <div key={post.id} className="mt-4 P-4 border rounded-md border-dashed border-slate-400">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h2 className="font-bold text-2xl">{post.title}</h2>
                            <small className="text-xs text-slate-600">Created by {post.user.name} on {" "}
                                {new Date(post.created_at).toLocaleTimeString()}
                            </small>

                        </div>
                        <Link to={`/posts/${post.id}`} className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1 mx-3 my-3">Read more</Link>
                    </div>
                    <p>{post.body}</p>
                </div>
            )
        )) : <p> There are no posts</p>}
    </>
    );
}