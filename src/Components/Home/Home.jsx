import React from 'react'

const Home = () => {
  return (
    <>
    <section className='grid h-96 overflow-y-auto  overflow-x-auto gap-9 max-w-5xl mt-7 mx-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
{/* pending*/}
        <div>
    <h1 className='font-semibold text-yellow-500 mb-4 '>Pending</h1>

    <div>

    <div className="card  bg-base-100 shadow-xl px-6 py-6">
      
  <div >
    
    <h2 className="card-title flex justify-between items-center"><span>Card title!</span> <button className='btn'>ads</button></h2>
    <p className='mt-4'>If a dog chews shoes whose shoes does he choose?</p>
    <div className='flex mt-5 justify-between items-center'>
      <div>dsaf</div>
      <div>dsaf</div>
    </div>
  </div>
</div>



    </div>
        </div>
{/* In Progress */}
        <div>
        <h1 className='font-semibold text-yellow-700 mb-4'>In Progress</h1>
        <div className="card  bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card title!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

        </div>
{/*  Completed */}
        <div>
        <h1 className='font-semibold text-green-500 mb-4'> Completed </h1>
        <div className="card  bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card title!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

        </div>
    </section>
      
    </>
  )
}

export default Home
