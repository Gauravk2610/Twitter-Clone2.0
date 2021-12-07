import { StarRateOutlined } from "@mui/icons-material"
import Posts from "./Posts"
import UploadPost from "./UploadPost"

function Feed() {
    return (
        <div>
            <div className='sticky top-0 z-50 bg-black border-l border-r border-b cursor-pointer flex items-center border-white border-opacity-30 text-white px-4 py-3 text-xl font-semibold'>
                Home
                <span className='ml-auto'><StarRateOutlined /></span>
            </div>
            <UploadPost />
            <Posts />
        </div>
    )
}

export default Feed
