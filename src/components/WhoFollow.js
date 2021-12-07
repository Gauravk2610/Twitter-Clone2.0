import Follow from "./Follow"

function WhoFollow() {
    return (
        <div className='my-4 bg-blue-200 bg-opacity-20 rounded-2xl'>
            <div className='px-6 text-xl font-bold py-2 text-white text-opacity-90'>Who to folllow</div>
            <Follow />
            <Follow />
            <div className='px-6 py-3 text-blue-400 cursor-pointer hover:bg-blue-200  hover:bg-opacity-5 transition-all duration-200'>Show More</div>
        </div>
    )
}

export default WhoFollow
