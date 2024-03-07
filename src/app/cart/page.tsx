'use client'
import CartItem from "@/components/CartItem";
import useCart from "@/store/cart";
import data from '@/data.json'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { checkout } from "@/lib/order";
import Script from "next/script";
import { useRouter } from "next/navigation";
import verifyPayment from "@/lib/verifyPayment";
import useOrder from "@/store/orders";
export default function Cart() {
  const { cart, clearCart } = useCart(state => state);
  const { addOrder } = useOrder(state => state)
  const [total, setTotal] = useState(0)
  const [paymentVerified, setPaymentVerified] = useState(false)
  const router = useRouter()

  useEffect(() => {
    calcTotal()
  }
  , [cart])

  useEffect(() => {
    if (paymentVerified) {
      transferCart()
    }
  }, [paymentVerified])
  const getItem = (id: string) => {
    return data.find(item => item.id === id)
  }

  const isEmpty = () => {
    return cart.length === 0
  }

  const transferCart = () => {
    router.push('/orders')
    cart.map((item) => {
      const data = getItem(item.id)
      if (!data) return
      const { inStock } = data
      if (!inStock) return
      addOrder({
        id: item.id,
        status: 'ordered'
      })
    })
    clearCart()
  }

  const calcTotal = () => {
    setTotal(0)
    cart.map((item) => {
      const data = getItem(item.id)
      if (!data) return
      const { price, inStock } = data
      if (!inStock) return
      setTotal(prev => prev + price * item.quantity)
    })
  }

  const handleCheckout = async () => {
    const data = await checkout({ amount: total })
    console.log(data);
    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_ID,
      "amount": data?.order?.amount,
      "currency": "INR",
      "name": "TXD",
      "description": "TXD Order Payment",
      "image": "https://i.postimg.cc/cJx1nwnd/logo.jpg",
      "order_id": data?.order?.id,
      handler: (Response: any) => {
        const verified = verifyPayment(Response)
        if (typeof verified !== undefined) {
          setPaymentVerified(true)
        }
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    paymentObject.on("payment.failed", (res: any) => {
      console.log("paymment failed", res)
    });
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="flex flex-col p-4 items-center gap-4 pb-48 px-4">
        {
          isEmpty() ? (
            <h1 className="text-2xl mt-24">🛒Cart is Empty</h1>
          ) : (
            cart.map((item) => {
              const { id } = item
              const data = getItem(id)
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
        <Button title='checkout' onClick={handleCheckout}>Buy Now</Button>
      </div>
    </>
  )

}


