import { ProductType } from "@/types/productType"
import { useEffect, useState } from "react"
import { getDataSearchValue } from "../../../../backend/db/dbSearch"
import { IconDelete, IconEdit, IconMoney, IconSearch } from "../../../../public/icons/icons"
import ReactPaginate from 'react-paginate';
import { dbOnlyOneProduct } from "../../../../backend/db/dbOnlyOneProduct";
import { useUpdateProductReducer } from "@/store/reducers/editProductReducers/useUpdateProductReducer";
import { useRouter } from "next/router";
import { onLoadingDeleteProduct } from "@/functions/loadingPage/onLoadingDelete";
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import Input from "./Input";
import { useInfoReportReducer } from "@/store/reducers/infoReportReducer/useInfoReportReducer";

export default function DisplayValuesInfoReport() {
  const [ search, setSearch ] = useState('')

  const [products, setProducts] = useState<{ amount: number, price: number, name: string }[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(0);


  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = products.slice(startIndex, endIndex);

  const { productInfoReport } = useInfoReportReducer()

  useEffect(() => {
    setProducts(productInfoReport)
    setTotal(productInfoReport.reduce((acc, product) => {
      return acc + product.amount * product.price;
    }, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="">
      <table className="my-6 mx-4 h-4/5">
        <thead className="text-left">
          <tr className="bg-gray-400 ">
            <th className="p-2">Produto</th>
            <th className="p-2">Qnt</th>
            <th className="p-2">Preço</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((product, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-600'} py-4`}>
              <td className="px-2 py-1">{product.name}</td>
              <td className="px-2 py-1">{product.amount}</td>
              <td className="px-2 py-1">{product.price}</td>
            </tr>
          ))}
          <tr className="text-right bg-gray-700"><td className="px-4 py-1" colSpan={6}><strong>Valor total:</strong> {total}</td></tr>
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