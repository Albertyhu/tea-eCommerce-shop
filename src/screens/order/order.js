import PageTemplate from '../../PageTemplate.js'; 

const OrderPage = props => {
    const {
        openHamburger,
        openPanel,
        accountPanel,
        addProductMessage,
        message
    } = props; 

    return (<PageTemplate MainContent={MainContent}
        openHamburger={openHamburger}
        openPanel={openPanel}
        accountPanel={accountPanel}
        addProductMessage={addProductMessage}
        message={message}
        heightType={"inherit"}
    />)
}

export default OrderPage;

const MainContent = props => {
    return(<div></div>)
}