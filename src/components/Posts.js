import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import Post from "./Post"

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => setPosts(snapshot.docs))
    , [db])

    return (
        <div>
            {
                posts.map(post => (
                    <Post 
                        key={post.id}
                        id={post.id}
                        userName={post.data().userName}
                        displayName={post.data().displayName}
                        photoURL={post.data().photoURL}
                        image={post.data().image}
                        caption={post.data().caption}
                        timestamp={post.data().timestamp}
                        date={post.data().date}
                    />
                ))
            }
        </div>
    )
}

export default Posts
