
const calculateCartTotal = (carts) => {
    const total = carts.reduce((acc,el) => {
        acc += el.book.price * el.quantity
        return acc;
    },0)

    const cartTotal = ((total * 100) / 100).toFixed(2)

    const stripeTotal =  Number((total * 100).toFixed(2))

    return {cartTotal,stripeTotal}
}

export default calculateCartTotal;