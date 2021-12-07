import { SearchIcon } from "@heroicons/react/outline"
import Happening from "./Happening"
import WhoFollow from "./WhoFollow"

function Trend() {
    return (
        <div className='px-4 sticky top-0 border-white border-opacity-30 border-l'>
                <div className='sticky top-0 bg-black py-2 z-50'>
                    <div className='relative flex bg-blue-200 bg-opacity-20 rounded-full'>
                        <div className='absolute inset-y-0 pl-5 flex items-center pointer-events-none'>
                            <SearchIcon className='w-5 h-5 text-gray-400' />
                        </div>
                        <input className='bg-transparent text-white pl-12 focus:blue-500-black border-0 rounded-full focus:border-blue-500 w-full' type="text" placeholder='Search Twitter' />
                    </div>
                </div>
                {/*  -top-10*/}
                <div className='sticky top-16'>
                    {/* <div className=''> */}
                        <Happening />
                        <WhoFollow />
                    {/* </div> */}
                </div>
        </div>
    )
}

export default Trend
