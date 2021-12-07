function News() {
    return (
        <div className='px-6 py-3 flex text-white hover:bg-blue-200  hover:bg-opacity-5 transition-all duration-200 cursor-pointer'>
            <div className='flex-1'>
                <div className='text-gray-400 text-xs'>COVID 19 . LIVE</div>
                <p className='font-semibold text-base'>
                    Omicron variant of COVID-19: total number reaches 21 as a family of nine members tests positive in Jaipur
                </p>
            </div>
            <div>
                <img className='w-16 object-cover h-16 rounded-2xl' src="https://th.bing.com/th/id/OIP.H1_uc_uWqArlYseCywo5wwHaEK?pid=ImgDet&rs=1" alt="" />
            </div>
        </div>
    )
}

export default News
