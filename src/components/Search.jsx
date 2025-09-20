import React from 'react'

const search = ({isShow, setCity}) => {

  let sclosePopupOnSubmit =(e)=>{

    e.preventDefault();
    isShow(false);

  }
  return (
    <>
    

        
      <div className="w-[70%] max-w-lg  bg-white rounded-md shadow-lg p-6">
        <div className='flex flex-row justify-between'>
          <h2 className="text-xl font-semibold mb-4">Search City</h2>
          <span  onClick={()=>isShow(false)}>&times;</span>

        </div>

        <form onSubmit={sclosePopupOnSubmit}>
      
      <input
        type="text"
        placeholder="Type city name..."
        
        className="w-full border-[0px_0px_2px_0px] border-gray-300  p-2 mb-4"
        onChange={(e) => setCity(e.target.value)}
      />

      </form>
      
    </div>

    
    </>
  )
}

export default search
