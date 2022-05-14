

const RenderTeaItems = props => {
    const { image, name, description, price, amount, stock } = props; 
    const subTotal = price * stock; 
    return (
        <div id = "cartItemContainer">
            <div id = "cartImageContainer"><img src={image} className = "cartItemImage"/></div>
            <div className = "cartItemText">
                <h2>Item: {name}</h2>
                <p><b>Amount per bag: </b> { amount} oz.</p>
                <p><b>Number of bags to be purchased: </b> { stock}</p>
                <p><b>Price: </b> ${price}</p>
                <p><b>Subtotal: </b>${subTotal.toFixed(2)}</p>
            </div>
        </div>
        )

}

export default RenderTeaItems; 