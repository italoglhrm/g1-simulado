import { ShoppingCart } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { QuantityInput } from '../Form/QuantityInput'
import {
  CoffeeImg,
  Container,
  Control,
  Description,
  Order,
  Price,
  Tags,
  Title,
} from './styles'

type CoffeeCardProps = {
  coffee: {
    id: string
    title: string
    description: string
    tags: string[]
    price: number
    image: string
    quantity: number
  }
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
}

export function CoffeeCard({
  coffee,
  incrementQuantity,
  decrementQuantity,
}: CoffeeCardProps) {
  const theme = useTheme()

  function handleAddItem() {
    console.log('Adicionar item ao carrinho')
    // Aqui futuramente vai adicionar o café ao carrinho
  }

  return (
    <Container>
      <CoffeeImg src={coffee.image} alt={coffee.description} />

      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <Title>{coffee.title}</Title>

      <Description>{coffee.description}</Description>

      <Control>
        <Price>
          <span>R$</span>
          <span>{coffee.price.toFixed(2)}</span>
        </Price>

        <Order $itemAdded={false}>
          <QuantityInput
            quantity={coffee.quantity}
            incrementQuantity={() => incrementQuantity(coffee.id)}
            decrementQuantity={() => decrementQuantity(coffee.id)}
          />

          <button onClick={handleAddItem}>
            <ShoppingCart size={22} color={theme.colors['base-card']} />
          </button>
        </Order>
      </Control>
    </Container>
  )
}
