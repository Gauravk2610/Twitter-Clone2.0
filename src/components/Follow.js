function Follow() {
    return (
        <div className='px-6 py-3 flex items-center hover:bg-blue-200  hover:bg-opacity-5 transition-all duration-200 cursor-pointer'>
            <img className='w-12 h-12 rounded-full object-cover' src="https://th.bing.com/th/id/OIP.VnsyWQUOmZhwPGhIBXFetQHaE8?pid=ImgDet&rs=1" alt="" />
            <div className='mx-3 flex-1'>
                <div className='font-semibold text-white hover:underline'>Elon Musk</div>
                <div className='font-thin text-gray-400'>@elonmusk</div>
            </div>   
            <button className='font-bold px-3 py-1 bg-white rounded-full'>Follow</button>
        </div>
    )
}

export default Follow
