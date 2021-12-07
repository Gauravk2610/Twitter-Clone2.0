import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore"
import { getDownloadURL, ref, uploadString } from "@firebase/storage"
import { BarChartOutlined, EventOutlined, GifBoxOutlined, InsertPhotoOutlined, SentimentSatisfiedOutlined } from "@mui/icons-material"
import { CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import { useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { userState } from "../atoms/userAtom"
import { db, storage } from "../firebase"

function UploadPost() {
    const [selectedFile, setSelectedFile] = useState(null)    
    const [input, setInput] = useState(null)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useRecoilState(userState)
    const imagePickerRef = useRef(null)
    const extensionType = ['png', 'jpg', 'jpeg']

    const addImageToPost = (e) => {
        console.log(imagePickerRef)
        console.log(e.target.files[0])
        const reader = new FileReader();
        if (e.target.files[0]) {
            const file_extension = e.target.files[0].name.split(".").splice(1,).join("")
            const validExtension = (extensionType.includes(file_extension))
            if (validExtension) {
                reader.readAsDataURL(e.target.files[0])
            } else return alert("Enter a Valid Image")
        }
        console.log(reader.DONE, e.target.files[0])
        reader.onload = (readerEvent) => {
            console.log("In READER EVENT")
            setSelectedFile(readerEvent.target.result)
        }
        console.log(reader.result)
    }

    const postTweet = async() => {
        setLoading(true)
        const docRef = await addDoc(collection(db, 'posts'), {
            userName: user.userName,
            displayName: user.displayName,
            id: user.uid,
            photoURL: user.photoURL,
            caption: input,
            timestamp: serverTimestamp(),
            date: new Date().toDateString()
        })

        if (selectedFile) {
            const imageRef = ref(storage, `posts/${docRef.id}/image`)
    
            await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
                const downloadURL = await getDownloadURL(imageRef)
    
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL
                })
            })
        }


        setLoading(false)
        setInput("")
        setSelectedFile(null)
        imagePickerRef.current.value = null
    }

    return (
        <div className='text-white px-4 py-3 border-l border-r border-b border-white border-opacity-30'>
            <div className='flex items-start'>
                <img className='w-12 h-12  cursor-pointer rounded-full' src={user.photoURL}  alt="" />
                <div className='flex-1 flex-col mx-4'>
                    <input onChange={(e) => setInput(e.target.value)} value={input} className='ring-0 focus:ring-0 border-0 bg-transparent outline-none w-full text-xl' placeholder="What's happening?" type="text" />
                    <img className={`${!selectedFile && 'hidden'} my-4 rounded-2xl`} src={selectedFile} alt="" />
                </div>
            </div>
            <div className='flex items-center mt-3'>
                <div className='md:ml-12'></div>
                <div className='md:mx-4 space-x-3 text-blue-400 flex items-center'>
                    <div className='flex items-center' onClick={() => imagePickerRef.current.click()}>
                        <InsertPhotoOutlined className='icon cursor-pointer' />
                    </div>
                    <GifBoxOutlined className='icon cursor-pointer' />
                    <BarChartOutlined className='icon cursor-pointer bar' />
                    <SentimentSatisfiedOutlined className='icon cursor-pointer' />
                    <EventOutlined className='icon cursor-pointer' />
                    <input ref={imagePickerRef} type='file' hidden onChange={addImageToPost} />
                </div>
                <button type='button' disabled={!(input || selectedFile || loading)} onClick={postTweet} className='flex items-center space-x-2 ml-auto bg-blue-500 py-2 font-semibold px-5 rounded-full opacity-50'>
                    <span>Tweet</span><div>{loading && <Box sx={{ display: 'flex' }}><CircularProgress size={20} /></Box>}</div>
                </button>
            </div>
        </div>
    )
}

export default UploadPost
