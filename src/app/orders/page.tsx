'use client'
import useOrder from '@/store/orders'
import React from 'react'
import data from '@/data.json'
import OrderItem from '@/components/OrderItem'

const Orders = () => {
    const {orders} = useOrder((state) => state)

    const getItem = (id: string) => {
        return data.find(item => item.id === id)
      }
    
      const isEmpty = () => {
        return orders.length === 0
      }

  return (
    <div className="flex flex-col p-4 items-center gap-4 pb-48 px-4">
        {
          isEmpty() ? (
            <h1 className="text-2xl">No orders</h1>
          ) : (
            orders.map((item) => {
              const { id } = item
              const data = getItem(id)
              if (!data) return null
              const { title, alt, src, price } = data;
              return <OrderItem key={id} id={id} title={title} price={price} img={src} alt={alt} />
            })
          )
        }
      </div>
  )
}

export default Orders