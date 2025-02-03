import React from 'react'

const Pagination = (props) => {
    let pageNum = []
    const {getProducts,limit,pageHandler,currentPage} = props
    for(let i=1;i<=Math.ceil(getProducts.length/limit);i++){
        pageNum.push(i)
    }

    const onClickbtn = (pgNum)=>{
      
        pageHandler(pgNum)
    }

    
  return (
    <div className='pagination'>
        {pageNum.map(each=>{

          return <button onClick={()=>(onClickbtn(each))} className={`pagination-btn ${each===currentPage&&"color"}`}>{each}</button>
          })}
    </div>
  )
}

export default Pagination