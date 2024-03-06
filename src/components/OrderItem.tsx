import Image from 'next/image'
import React from 'react'

interface Props {
    id: string
    price: number
    title: string
    img: string
    alt?: string
}

const OrderItem = (props: Props) => {
    const { price, title, img, alt } = props

    return (
        <div className="flex items-center w-full justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
                <Image src={img} alt={alt || title} width={100} height={100} className='rounded-md w-12 h-12' />
                <h1 className='text-md md:text-base  overflow-hidden text-ellipsis whitespace-nowrap'>{title}</h1>
            </div>
            <div className="flex items-center gap-2">
                <h1 className=' pr-1 lg:pr-6' >{price}</h1>
                <h1 className='text-green-500'>ordered</h1>
            </div>
        </div>
    )
}

export default OrderItem