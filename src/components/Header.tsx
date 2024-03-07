'use client'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { BsCart3, BsBoxSeam } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"
import useCart from '@/store/cart';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const Header = () => {
  const session = useSession()
  const { cart } = useCart(state => state)

  if (session.data) {
    const { data: sessionData } = session
    const username = sessionData?.user?.name
    const imageUrl = sessionData?.user?.image
    return (
      <div className="flex justify-between w-full px-4 border-b items-center fixed backdrop-blur-lg bg-white bg-opacity-30">
        <Link href={'/'}><Image src="/logo.jpg" alt="logo" width={100} height={100} className='w-16 h-16 pr-2' /></Link>
        <p className='text-xs lg:text-base'><span className='text-red-500'>50%</span> OFF on your First Order </p>
        <div className='flex justify-center items-center gap-4 lg:gap-8'>
          <div className="relative">
            <Link href={'/cart'}><BsCart3 size={30} className='w-6 md:w-10' /></Link>
            <p className='absolute -top-0 right-0 w-2 text-xs md:w-4 text-center bg-white rounded-full p-0 leading-none cursor-pointer'>{cart.length}</p>
          </div>
          <Link href={'/orders'}><BsBoxSeam size={30} className='w-6 md:w-10' /></Link>
          <Popover >
            <PopoverTrigger>
              <Avatar>
                <AvatarImage className='w-6 md:w-8 rounded-full object-cover' alt='logo' src={imageUrl || ''} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className='flex items-center gap-4'>
                <p>{username}</p>
                <Button onClick={() => signOut()} variant={'outline'}>SignOut</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-between w-full px-4 border-b items-center fixed backdrop-blur-lg">
      <Link href={'/'}><Image src="/logo.jpg" alt="logo" width={100} height={100} className='w-16 h-16' /></Link>
      <div className='flex justify-center items-center gap-4'>
        <Link href={'/cart'}><BsCart3 size={30} /></Link>
        <Button onClick={() => signIn()} variant={'outline'}>signIn</Button>
      </div>
    </div>
  )
}

export default Header