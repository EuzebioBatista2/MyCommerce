import { ProductType } from "@/types/productType"
import { useEffect, useState } from "react"
import { IconDelete, IconSearch } from "../../../../public/icons/icons"
import ReactPaginate from 'react-paginate';
import { dbGetCartSearch } from "../../../../backend/db/dbGetCart";
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import LinkButton from "./LinkButton";
import Input from "./Input";
import { dbRemoveAndUpdateProductCart } from "../../../../backend/db/dbRemoveAndUpdateProductCart";
import { authFirebase } from "../../../../backend/config";
import { formatCurrency } from "@/functions/verifyFields/verifyCurrency";
import Link from "next/link";

export default function DisplayValuesCart() {
  const [search, setSearch] = useState('')

  const [products, setProducts] = useState<{ name: string, data: ProductType, uid: string }[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(0);

  const { setLoading } = useLoadingReducer()

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = products.slice(startIndex, endIndex);

  useEffect(() => {
    // Função responsável por realizar uma pesquisa personalizada de forma a pegar os dados de acordo com a pesquisa
    const fetchData = async () => {
      authFirebase.onAuthStateChanged(async (user) => {
        if (user) {
          await dbGetCartSearch(search).then(async (data) => {
            setProducts(data)
            setTotal((data.reduce((acc, products) => {
              return acc + products.data.amount * products.data.price
            }, 0)))
          });
        } else {
          window.location.href = '/'
        }
      })
    };
    fetchData();
  }, [search])

  useEffect(() => {
    // Verifica se o checkbox de manter conectado foi marcado quando a tela for fechada
    const remember = localStorage.getItem('rememberMyAccontMyCommerce')
    if (remember === "false") {
      const handleBeforeUnload = () => {
        authFirebase.signOut();
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      <div className="flex w-full items-center justify-center h-16 px-2 bg-gradient-to-r from-gray-100 to-gray-400 relative">
        <Input type="search" text="Pesquisar" id="search" value={search}
          onChange={(event) => { setSearch(event.target.value) }} inputError={true}
        />
        <i className="absolute right-3 top-8">{IconSearch}</i>
      </div>
      <div className="flex flex-col items-center pt-1 h-5/6 w-11/12 my-4 px-1 bg-white rounded-lg bg-opacity-80">
        <table className="rounded-t-md overflow-hidden w-full h-full">
          <thead className="text-left">
            <tr className="bg-blue-500">
              <th className="text-sm px-1 py-1 text-center text-white border-r border-b border-white">Produto</th>
              <th className="text-sm px-1 py-1 text-center text-white border-r border-b border-white">Qnt</th>
              <th className="text-sm px-1 py-1 text-center text-white border-r border-b border-white">Preço</th>
              <th className="text-sm px-1 py-1 text-center text-white border-b border-white">Del</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((product, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} py-4 text-center`}>
                <td className="text-sm px-2 break-all leading-tight border-r border-b border-white capitalize">{product.data.name}</td>
                <td className="text-sm px-2 break-all leading-tight border-r border-b border-white">{product.data.amount}x</td>
                <td className="text-sm px-2 break-all leading-tight border-r border-b border-white">{formatCurrency(+product.data.price)}</td>
                <td className="text-sm px-2 border-b border-white"><button onClick={() => dbRemoveAndUpdateProductCart(setLoading, product.data, product.uid).then(() => {
                  dbGetCartSearch('').then((data) => {
                    setProducts(data)
                  });
                  dbGetCartSearch('').then((data) => {
                    setTotal(data.reduce((acc, product) => {
                      return acc + product.data.amount * product.data.price;
                    }, 0));
                  })
                })}><i className="flex w-5 h-5 text-red-500">{IconDelete}</i></button></td>
              </tr>
            ))}
            <tr className="text-right text-white bg-blue-500"><td className="px-4 py-1" colSpan={4}><strong>Valor total:</strong> {formatCurrency(+total)}</td></tr>
          </tbody>
        </table>
        <LinkButton color="yellow">
          <Link href='/cart/identifyUser'>
            <span className="flex items-center justify-center w-full h-full">Pagar com dinheiro</span>
          </Link>
        </LinkButton>
        <LinkButton color="gray">
          <Link href='/cart/createOrExistsUser'>
            <span className="flex items-center justify-center w-full h-full">Colocar na conta</span>
          </Link>
        </LinkButton>

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
          activeClassName={'border-b border-blue-500 text-blue-500 transtion duration-500 ease-in-out'}
          className="text-sm flex w-full items-center justify-center gap-3 h-1/5"
        />
      </div>
    </div>
  )
}