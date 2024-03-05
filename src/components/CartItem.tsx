import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import useCart from '@/store/cart'

interface Props {
    id: string
    inStock: boolean
    price: number
    title: string
    img: string
    alt?: string
}
const CartItem = (props: Props) => {
    const { id, price, title, img, alt, inStock } = props
    const { getQuantity, setQuantity, removeItem } = useCart(state => state);

    const quantity = getQuantity(id)

    const increaseQuantity = () => {
        setQuantity(id, quantity + 1)
    }

    const decreaseQuantity = () => {
        if (quantity === 1) {
            removeItem(id)
            return
        }
        setQuantity(id, quantity - 1)
    }

    return (
        <div className="flex items-center w-full justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
                <Image src={img} alt={alt || title} width={100} height={100} className='rounded-md w-12 h-12' />
                <h1 className='text-md md:text-base  overflow-hidden text-ellipsis whitespace-nowrap'>{title}</h1>
            </div>
             
            {
                !inStock ? <h1 className="text-red-500">Out of Stock</h1> : (
                    <div className="flex items-center gap-2">
                        <h1 className=' pr-1 lg:pr-6' >{price*quantity}</h1>
                        <Button onClick={increaseQuantity} variant={'outline'} title='decrease' className='rounded-full text-2xl p-4 h-8 w-8'>+</Button>
                        <h1>{quantity}</h1>
                        <Button onClick={decreaseQuantity} variant={'outline'} title='increase' className='rounded-full text-2xl p-4 h-8 w-8'>-</Button>
                    </div>
                )
            }

        </div>
    )
}

export default CartItem