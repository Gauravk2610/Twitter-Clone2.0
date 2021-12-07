import { signOut } from '@firebase/auth';
import { BookmarkBorder, HomeRounded, ListAltOutlined, MailOutline, ModeEdit, MoreHorizOutlined, NotificationsNone, PermIdentityOutlined, Tag } from '@mui/icons-material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components'
import { loadingState } from '../atoms/loadingAtom';
import { userState } from '../atoms/userAtom';
import { auth } from '../firebase';

const MenuButtonList = [
    {
        icon: <HomeRounded  />,
        name: 'Home'
    },
    {
        icon: <Tag  />,
        name: 'Explore'
    },
    {
        icon: <NotificationsNone  />,
        name: 'Notifications'
    },
    {
        icon: <MailOutline  />,
        name: 'Messages'
    },
    {
        icon: <BookmarkBorder  />,
        name: 'Bookmarks'
    },
    {
        icon: <ListAltOutlined  />,
        name: 'Lists'
    },
    {
        icon: <PermIdentityOutlined  />,
        name: 'Profile'
    },
    {
        icon: <MoreHorizOutlined  />,
        name: 'More'
    },
]

function Menu() {
    const user = useRecoilValue(userState)
    const setLoading = useSetRecoilState(loadingState) 
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    return (
        <div className='text-gray-200 flex flex-col  sm:items-center xl:items-start border-r border-white border-opacity-30'>
            <div className='m-1'>
                <IconButton color="primary">
                    <TwitterIcon className='' style={{fontSize: 34, color: 'white'}} />
                </IconButton>
            </div>
            <div className='flex flex-col flex-1 text-white items-center xl:items-start'>
                {MenuButtonList.map((data, index) => (
                    <MenuButton key={index}>
                        {data.icon}
                        <div className='hidden xl:flex mx-4 text-xl font-semibold'>{data.name}</div>
                    </MenuButton>
                ))}
                <button className='sm:w-10 sm:h-10 md:w-14 md:h-14 xl:w-3/4 xl:h-14 bg-blue-500 w-3/4 h-14 font-semibold rounded-full mt-4'><span className='sm:hidden xl:inline-flex text-xl'>Tweet</span><span className='md:inline-flex xl:hidden'><ModeEdit /></span></button>
            </div>
            <div className='flex w-max xl:items-center text-white my-4 px-3 py-3 cursor-pointer  hover:bg-white hover:bg-opacity-10 rounded-full'
                onClick={async() => {
                    setLoading(true)
                    await sleep(1000)
                    signOut(auth)
                    
                }}
            >
                <img className='w-10 h-10  rounded-full' src={user.photoURL} alt="" />
                <div className='hidden xl:flex flex-1 flex-col mx-3'>
                    <div className='font-semibold text-sm'>{user.displayName}</div>
                    <div className='text-gray-500 text-sm'>@{user.userName}</div>
                </div>
                <MoreHorizOutlined className='three-dot' />
            </div>
        </div>
    )
}

export default Menu

const MenuButton = styled.div`
    margin: 4px 0;
    padding: 8px 12px;
    width: fit-content;
    border-radius: 40px;
    cursor: pointer;
    color: rgb(217, 217, 217);
    display: flex;
    align-items: center;
    transition: background-color 0.2s ease-out;

    :hover{
        background-color: rgb(255, 255, 255, 0.12);
    }
    
    .MuiSvgIcon-root {
        font-size: 32px;
    }
`