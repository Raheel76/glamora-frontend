import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center h-20 px-8 shadow-md bg-[#f9f9f9] ">
        <Link to='' className="w-[160px] h-14">
          <img src="/assets/header logo.png" alt="header logo" className='size-full' />
        </Link>
        <div className="flex">
        <Button className='px-6 py-4 text-[14px] font-medium border-none bg-[#c31f1fc3] !text-white hover:!bg-[#b93a31] rounded-full '>Log out</Button>
        </div>
      </div>
    </>
  )
}

export default Header
