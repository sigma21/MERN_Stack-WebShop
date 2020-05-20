import _ from 'lodash'
import React from 'react'
import { Header, Image, Table} from 'semantic-ui-react'
import EditProduct from './EditProduct';
import ArchiveProduct from '../Product/ArchiveProduct'

const InventoryList = ({ products, user }) => {

    const tableData = products.map(p => (
        { name: p.name, price: p.price, quantity: p.quantity, mediaUrl: p.mediaUrl, sku: p.sku, description: p.description }
    ))

    const [column, setColumn] = React.useState(null)
    const [data, setData] = React.useState(tableData)
    const [direction, setDirection] = React.useState(null)

    function handleSort(clickedColumn) {
        if (column !== clickedColumn) {
            setColumn(clickedColumn)
            setData(_.sortBy(data, [clickedColumn]))
            setDirection('ascending')
            return
        }
        setData(data.reverse())
        setDirection(direction === 'ascending' ? 'descending' : 'ascending')
    }

    return (
        <>
            <Table sortable celled striped collapsing unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell sorted={column === 'name' ? direction : null}
                            onClick={() => handleSort('name')}>Product</Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'price' ? direction : null}
                            onClick={() => handleSort('price')}>Price</Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'quantity' ? direction : null}
                            onClick={() => handleSort('quantity')}>Stock</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Archive</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(data, ({ price, sku, name, quantity, mediaUrl, description }) => (
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h3' image>
                                    <Image src={mediaUrl} rounded size='tiny' />
                                    <Header.Content>
                                        {name}
                                        <Header.Subheader>{sku}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{price}</Table.Cell>
                            <Table.Cell>{quantity}</Table.Cell>
                            <Table.Cell>
                                <EditProduct
                                    name={name}
                                    price={price}
                                    sku={sku}
                                    quantity={quantity}
                                    mediaUrl={mediaUrl}
                                    description={description} />
                            </Table.Cell>
                            <Table.Cell><ArchiveProduct user={user} sku={sku} /></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <br />
        </>

    )

}

export default InventoryList;