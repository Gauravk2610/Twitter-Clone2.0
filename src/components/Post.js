import { IosShare, MoreHoriz } from "@mui/icons-material"
import { ChatIcon, ReplyIcon, HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "@firebase/firestore"
import { db } from "../firebase"
import { useRecoilValue } from "recoil"
import { userState } from "../atoms/userAtom"

function Post({ id, userName, displayName, photoURL, image, caption, timestamp, date }) {
    const user = useRecoilValue(userState)
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'), snapshot => 
        setLikes(snapshot.docs)    
    ), [db, id])

    useEffect(() => 
        setHasLiked(likes.findIndex((like) => like.id === user?.uid) !== -1)
    , [likes])
    
    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', user.uid))
        } else{
            await setDoc(doc(db, 'posts', id, 'likes', user.uid), {
                userName: user.userName
            })
        }
    }

    return (
        <div className='flex text-white border py-3 pl-4 border-white border-opacity-30'>
            <img className='w-10 h-10 sm:w-12 sm:h-12  cursor-pointer rounded-full' src={photoURL}  alt="" />
            <div className='mx-4 flex-col flex-1'>
                <div className='flex'>
                    <p className='font-semibold flex-1'>{displayName} <span className='text-gray-400 font-thin'>@{userName} . {date}</span></p>
                    <MoreHoriz className='post__more_icon' />
                </div>
                <p>{caption}</p>
                <img className='my-4 rounded-2xl' src={image} alt="" />
                <div className='flex w-11/12 justify-between'>
                    <div className='flex sm:space-x-3 text-gray-400 hover:text-blue-500 transition-all duration-200 cursor-pointer'>
                        <ChatIcon className='w-5 ' />
                        <p className='text-sm'>19.5K</p>
                    </div>
                    <div className='flex sm:space-x-3 text-gray-400 hover:text-green-500 transition-all duration-200 cursor-pointer'>
                        <ReplyIcon className='w-5 ' />
                        <p className='text-sm'>19.5K</p>
                    </div>
                    <div onClick={likePost} className={`flex sm:space-x-3 text-gray-400 ${hasLiked && 'text-red-400'} hover:text-red-400 transition-all duration-200 cursor-pointer`}>
                        { hasLiked ? <HeartIconSolid className='w-5' /> : <HeartIcon className='w-5 ' /> }
                        <p className='text-sm'>{likes.length}</p>
                    </div>
                    <div className='flex sm:space-x-3 text-gray-400 hover:text-blue-500 transition-all duration-200 cursor-pointer'>
                        <IosShare className='post__share_icon' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
