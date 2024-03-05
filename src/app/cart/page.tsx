'use client'
import Header from "@/components/Header";
import CartItem from "@/components/CartItem";
import useCart from "@/store/cart";
import data from '@/data.json'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
export default function Cart() {
  const { cart } = useCart(state => state);
  const [total , setTotal] = useState(0)

  useEffect(()=>{
    calcTotal()
  },[cart])
  const getData = (id: string) => {
    return data.find(item => item.id === id)
  }

  const isEmpty = () => {
    return cart.length === 0
  }

  const calcTotal = () => {
    setTotal(0)
    cart.map((item)=>{
      const data = getData(item.id)
      if (!data) return
      const {price,inStock} = data
      if(!inStock) return
      setTotal(prev => prev + price * item.quantity)
    })
  }

  return (
    <>
      <div className="flex flex-col p-4 items-center gap-4 pb-48 px-4">
        {
          isEmpty() ? (
            <h1 className="text-2xl">🛒Cart is Empty</h1>
          ) : (
            cart.map((item) => {
              const { id } = item
              const data = getData(id)
              if (!data) return null
              const { title, alt, src, inStock, price } = data;
              return <CartItem key={id} id={id} inStock={inStock} title={title} price={price} img={src} alt={alt} />
            })
          )
        }
      </div>
      <div className="flex bg-gray-100 fixed bottom-0 w-full p-8 justify-between lg:justify-around items-center">
        <div className="flex lg:text-xl items-center">
          <h1>Total Amount:</h1>
          <h1 className="text-yellow-600 text-xl lg:text-3xl pl-2">₹{total}</h1>
        </div>
        <Button title='checkout'>Checkout</Button>
      </div>
    </>
  )

}