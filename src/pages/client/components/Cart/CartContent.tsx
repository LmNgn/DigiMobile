import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const CartContent = () => {
    const cartProduct=[
        {
            productId:1,
            name:"Iphone 1",
            color: "Black",
            quantity: "1",
            price:"999",
            image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thegioididong.com%2Fdtdd%2Fiphone-16-pro-max&psig=AOvVaw3nggk2wXeSxh7zAn2bF73U&ust=1742303808360000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICLl9iYkYwDFQAAAAAdAAAAABAE"
        },
        {
            productId:2,
            name:"Iphone 2",
            color: "Pink",
            quantity: "2",
            price:"1.800",
            image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thegioididong.com%2Fdtdd%2Fiphone-16-pro-max&psig=AOvVaw3nggk2wXeSxh7zAn2bF73U&ust=1742303808360000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICLl9iYkYwDFQAAAAAdAAAAABAE"
        },
        {
            productId:3,
            name:"Iphone 3",
            color: "Blue",
            quantity: "3",
            price:"2.700",
            image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thegioididong.com%2Fdtdd%2Fiphone-16-pro-max&psig=AOvVaw3nggk2wXeSxh7zAn2bF73U&ust=1742303808360000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICLl9iYkYwDFQAAAAAdAAAAABAE"
        }
    ]
  return (
    <div>
        {cartProduct.map((product,index)=>(
            <div key={index} className='flex items-start justify-between py-4 border-b'> 
                <div className='flex items-start'>
                    <img src={product.image} className='w-20 h-24 object-cover mr-4 rounded' />
                    <div>
                    <h3>{product.name}</h3>
                    <p className='text-sm text-gray-500'>Color: {product.color}</p>
                    <div className='flex items-center mt-2'>
                        <button className='border rounded px-2 py-1 text-xl font-medium'>-</button>
                        <span className='mx-4'>{product.quantity}</span>
                        <button className='border rounded px-2 py-1 text-xl font-medium'>+</button>
                    </div>
                </div>
                </div>
                <div>
                    <p className='font-medium'>$ {product.price.toLocaleString()}</p>
                    <button>
                        <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600'/>
                    </button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default CartContent