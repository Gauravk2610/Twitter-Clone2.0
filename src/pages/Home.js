import Feed from "../components/Feed"
import Menu from "../components/Menu"
import Trend from "../components/Trend"
import { BookmarkBorder, HomeRounded, ListAltOutlined, MailOutline, ModeEdit, MoreHorizOutlined, NotificationsNone, PermIdentityOutlined, Tag } from '@mui/icons-material';
import { SearchIcon } from "@heroicons/react/outline";

function Home() {
    return (
        <div className='grid grid-cols-1 max-w-xl sm:grid-cols-8 sm:max-w-xl md:grid-cols-8 md:max-w-2xl lg:grid-cols-7 lg:max-w-5xl mx-auto xl:max-w-7xl xl:grid-cols-10 '>
            <div className='flex sm:hidden text-white fixed bottom-0 bg-black z-50 w-full border-white border-opacity-30 border-l border-r border-t h-12 items-center justify-evenly'>
                <HomeRounded className='btn' />
                <SearchIcon className='w-8' />
                <NotificationsNone className='btn' />
                <MailOutline className='btn' />
            </div>
            <div className='hidden sm:inline-grid sm:col-span-1 md:inline-grid md:col-span-1  xl:inline-grid xl:col-span-2 h-screen overflow-y-scroll scrollbar-hide sticky top-0'>
                <Menu />
            </div>
            <div className='col-span-7 lg:col-span-4 xl:col-span-5'>
                <Feed />
            </div>
            <div className='hidden lg:inline-grid lg:col-span-2 xl:col-span-3'>
                <Trend />
            </div>
        </div>
    )
}

export default Home
