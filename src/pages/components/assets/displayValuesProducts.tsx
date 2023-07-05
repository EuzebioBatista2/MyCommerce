import { FinalProductType, ProductType } from "@/types/productType"
import { useEffect, useState } from "react"
import { getDataSearch } from "../../../../backend/db/dbSearch"
import { IconDelete, IconEdit } from "../../../../public/icons/icons"
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

export default function DisplayValueProducts() {
  const [products, setProducts] = useState<{ name: string, data: ProductType }[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = products.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      await getDataSearch().then((data) => { 
        setProducts(data) 
      });
      await getDataSearch().then((data) => { 
        setTotal(data.reduce((acc, product) => {
          return acc + product.data.amount * product.data.price;
        }, 0));
      })
    };
    fetchData();
  }, [])

  return (
    <div className="">
      <table className="my-6 mx-4 h-4/5">
        <thead className="text-left">
          <tr className="bg-gray-400 ">
            <th className="p-2">Produto</th>
            <th className="p-2">Quantidade</th>
            <th className="p-2">Preço</th>
            <th className="p-2">Edit</th>
            <th className="p-2">Del</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((product, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-600'} py-4`}>
              <td className="px-2 py-1">{product.data.name}</td>
              <td className="px-2 py-1">{product.data.amount}</td>
              <td className="px-2 py-1">{product.data.price}</td>
              <td className="px-2 py-1"><button>{IconEdit}</button></td>
              <td className="px-2 py-1"><button>{IconDelete}</button></td>
            </tr>
          ))}
          <tr className="text-right bg-gray-700"><td className="px-4 py-1" colSpan={5}><strong>Valor total:</strong> {total}</td></tr>
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Ante'}
        nextLabel={'Prox'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'bg-red-500 px-2 py-1'}
        className="flex w-full items-center justify-center gap-6 h-1/5"
        
      />

    </div>
  )
}