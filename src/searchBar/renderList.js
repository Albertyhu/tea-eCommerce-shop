import styled from 'styled-components'; 

const RenderItem = props => {
    return (
        <ListItem>{ props.name}</ListItem>
        )
}

const RenderSearchResults = props => {
    const { searchResult } = props; 
    
    return (
        <ListComponent>
            {
                searchResult.map(val => <RenderItem {...val} />)
            }
        </ListComponent>

        )
}

export default RenderSearchResults;

const ListComponent = styled.div`

    
`

const ListItem = styled.div`
    
`