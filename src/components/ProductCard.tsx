'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import useCart from '@/store/cart'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


interface Props {
    src: string
    alt: string
    id: string
    title: string
    description: string
    price: number
    rating: number
}

const ProductCard = (props: Props) => {

    const {cart ,addItem, isInCart } = useCart(state=>state)
    const [isAdded, setIsAdded] = useState(false)
    const session = useSession().data
    const router = useRouter()

    useEffect(() => {
        if (isInCart(props.id)) {
            setIsAdded(true)
        }
    },[cart])
    const handleAddToCart = () => {
        if (!session) {
            router.push('/api/auth/signin') 
            return
         }
        addItem({
            id: props.id,
            quantity: 1,
        })
    }


    return (
        <div className="flex rounded-md max-w-md md:outline outline-1 border-b md:border-none outline-gray-200 group overflow-hidden">
            <div className="w-56 m-2 mr-0 lg:m-0">
            <Image src={props.src} alt={props.alt} width={200} height={200} className=" w-full h-full object-cover rounded-md md:rounded-none" />
            </div>
            <div className="ml-4 flex flex-col flex-wrap w-full gap-2 justify-between md:gap-4 p-2">
                <div>
                <h3 className="text-lg font-semibold pb-3">{props.title}</h3>
                <p className="text-sm text-gray-600">{props.description}</p>
                </div>
                <div className="flex justify-between items-center gap-4 min-h-[40px]">
                    <p className="text-xs md:text-sm text-gray-500">{props.rating}⭐</p>
                    <p className="text-sm md:text-2xl font-semibold text-center">₹{props.price}</p>
                    <Button onClick={handleAddToCart} className={` ${isAdded?"outline-none group-hover:bg-transparent cursor-default":"outline outline-gray-400 group-hover:bg-black group-hover:text-white"} outline-1  bg-white text-black ease-in-out duration-500 text-xs md:text-sm`} size={'sm'} variant="default">{isAdded?"✅ Added":"Add to cart"}</Button>
                </div>

            </div>
        </div>
    )
}

export default ProductCard