import ProductCard from '@/components/ProductCard'
import data from '../data.json'



export default function App(){
  return (
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-fit max-w-7xl mx-auto">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          src={product.src}
          alt={product.alt}
          title={product.title}
          description={product.description}
          price={product.price}
          rating={product.rating}
        />
      ))}
      </div>
  )
}