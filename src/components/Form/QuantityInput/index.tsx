import { Minus, Plus } from '@phosphor-icons/react'
import { Container } from './style'

type Props = {
  quantity: number
  incrementQuantity: () => void
  decrementQuantity: () => void
}

export function QuantityInput({
  quantity,
  incrementQuantity,
  decrementQuantity,
}: Props) {
  return (
    <Container>
      <button 
        onClick={decrementQuantity}
        // adiciona propriedade disabled para bloquear quantidade quando chega em 0
        disabled={quantity === 1}
        style={{
          opacity: quantity === 1 ? 0.3 : 1,
          cursor: quantity === 1 ? "not-allowed" : "pointer",
        }}>
        <Minus size={14} />
      </button>
      <span>{quantity}</span>
      <button onClick={incrementQuantity}
      // adiciona propriedade disabled para bloquear quantidade quando chega em 5
      disabled={quantity === 5}
      style={{
        opacity: quantity === 5 ? 0.3 : 1,
        cursor: quantity === 5 ? "not-allowed" : "pointer",
      }}>
        <Plus size={14} />
      </button>
    </Container>
  )
}
