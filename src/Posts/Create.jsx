import { useState } from "react";

export default function Create() {
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    });

    async function handleCreate(e) {
        e.preventDefault;

        console.log(formData);
    }

    return (
        <>
            <h1 className="title">Create a new post</h1>
            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" placeholder="Post title"
                     value={formData.title}
                     onChange={(e) => setFormData({...formData, title: e.target.value}) } />
                </div>

                <div>
                    <textarea rows="6" placeholder="Post azZAZqa        qa  qa  qaqq2"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value}) }></textarea>
                </div>

                <button className="primary-btn" type="submit">Submit</button>
            </form>
        </>
    );
}