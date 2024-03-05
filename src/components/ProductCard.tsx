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
        <div className="flex p-2 rounded-md max-w-md outline outline-1 outline-gray-200 group">
            <div className="w-56">
            <Image src={props.src} alt={props.alt} width={200} height={200} className=" w-full h-full object-cover rounded-lg" />
            </div>
            <div className="ml-4 flex flex-col flex-wrap w-full gap-2 justify-between md:gap-4">
                <h3 className="text-lg font-semibold">{props.title}</h3>
                <p className="text-sm">{props.description}</p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 min-h-[40px]">
                    <p className="text-sm">{props.rating}⭐</p>
                    <p className="text-2xl font-semibold text-center">₹{props.price}</p>
                    <Button onClick={handleAddToCart} className='hidden group-hover:block ease-in-out duration-500' size={'sm'} variant="default">{isAdded?"Added":"Add to cart"}</Button>
                </div>

            </div>
        </div>
    )
}

export default ProductCard