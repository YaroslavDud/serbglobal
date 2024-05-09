'use client'

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {createProduct, deleteProduct, fetchProducts, updateProduct} from "@/app/reducers";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

export default function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId));
    };

    const handleUpdate = (productId) => {
        dispatch(updateProduct({productId, title:'Updated title'}));
    };

    const handleCreate = () => {
        dispatch(createProduct({
            title: 'Test title',
            brand: 'Test brand',
            category: 'Test category',
            description: 'Test description',
            price: 0,
        }));
    };

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('title', {
            header: () => 'Title',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('brand', {
            header: () => 'Brand',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('category', {
            header: () => 'Category',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('description', {
            header: () => 'Description',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('price', {
            header: () => 'Price',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('actions', {
            header: () => 'Actions',
            cell: info => (
                <>
                    <button onClick={() => handleDelete(info.row.original.id)}>Delete</button>
                    <button onClick={() => handleUpdate(info.row.original.id)}>Update</button>
                </>
            ),
            footer: info => info.column.id,
        }),
    ]

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (loading || products.length === 0) return <p>Loading...</p>;

  return (
    <>
        <button onClick={handleCreate}>Create the product</button>
        <table>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows && table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
            <tfoot>
            </tfoot>
        </table>
    </>
  );
}
