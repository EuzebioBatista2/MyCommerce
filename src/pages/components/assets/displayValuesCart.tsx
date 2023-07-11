import { ProductType } from "@/types/productType"
import { useEffect, useState } from "react"
import { IconDelete, IconSearch } from "../../../../public/icons/icons"
import ReactPaginate from 'react-paginate';
import { dbGetCartSearch } from "../../../../backend/db/dbGetCart";
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import { useRouter } from "next/router";
import LinkButton from "./LinkButton";
import Input from "./Input";
import { dbRemoveAndUpdateProductCart } from "../../../../backend/db/dbRemoveAndUpdateProductCart";

export default function DisplayValuesCart() {
  const [ search, setSearch ] = useState('')

  const [products, setProducts] = useState<{ name: string, data: ProductType, uid: string }[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(0);

  const { setLoading } = useLoadingReducer()
  const router = useRouter()

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
      await dbGetCartSearch(search).then((data) => {
        setProducts(data)
      });
      await dbGetCartSearch(search).then((data) => {
        setTotal(data.reduce((acc, product) => {
          return acc + product.data.amount * product.data.price;
        }, 0));
      })
    };
    fetchData();
  }, [search])

  return (
    <div className="w-full">
      <div className="flex items-center justify-center h-16 bg-gray-700 relative">
        <Input type="text" text="Pesquisar" id="search" value={search}
          onChange={(event) => { setSearch(event.target.value) }} inputError={true}
        />
        <i className="absolute right-2 top-6">{IconSearch}</i>
      </div>
      <table className="my-6 w-full">
        <thead className="text-left">
          <tr className="bg-gray-400 ">
            <th className="p-2">Produto</th>
            <th className="p-2">Qnt</th>
            <th className="p-2">Preço</th>
            <th className="p-2">Del</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((product, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-600'} py-4`}>
              <td className="px-2 py-1">{product.data.name}</td>
              <td className="px-2 py-1">{product.data.amount}</td>
              <td className="px-2 py-1">{product.data.price}</td>
              <td className="px-2 py-1 text-center"><button onClick={() => dbRemoveAndUpdateProductCart(setLoading, product.data, product.uid).then(() => {
                dbGetCartSearch('').then((data) => {
                  setProducts(data)
                });
                dbGetCartSearch('').then((data) => {
                  setTotal(data.reduce((acc, product) => {
                    return acc + product.data.amount * product.data.price;
                  }, 0));
                })
              })}>{IconDelete}</button></td>
            </tr>
          ))}
          <tr className="text-right bg-gray-700"><td className="px-4 py-1" colSpan={4}><strong>Valor total:</strong> {total}</td></tr>
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'◄'}
        nextLabel={'►'}
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

      <LinkButton link={'/identifyUser'} color="yellow" text="Fechar pagamento com dinheiro" />
      <LinkButton link={'/createOrExistsUser'} color="gray" text="Colocar na conta" />
    </div>
  )
}