
import {
    TextPanel,
    TextBlock,
    ProductTitle,
    PriceBlock,
    SalesPrice,
    ItemDimTitle,
    DetailTable,
    TH,
} from './profileStyledComp.js'; 

const RenderTextPanel = props => {
    const { name,
        description,
        price,
        amount,
        weight,
        width,
        length,
        height, 
    } = props; 

    return (
        <TextPanel>
            <ProductTitle>{name}</ProductTitle>
            <PriceBlock><b>Price:</b><SalesPrice> ${price.toFixed(2)}</SalesPrice></PriceBlock>
            <DetailTable>
                <tr><th>Weight:</th> <td>{weight}</td></tr>
                <tr><TH><ItemDimTitle>Item Dimenions</ItemDimTitle><br /><ItemDimTitle> LxWxH </ItemDimTitle></TH><td>{length} x {width} x {height} in.</td></tr>
            </DetailTable>
            <h3>About this product</h3>
            <TextBlock>{description}</TextBlock>
        </TextPanel>
        )

}

export default RenderTextPanel; 