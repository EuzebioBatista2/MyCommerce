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
import { authFirebase } from "../../../../backend/config";
import MenuOptionProduct from "./menuOptionProduct";
import { formatCurrency } from "@/functions/verifyFields/verifyCurrency";

export default function DisplayValueProducts() {
  const [search, setSearch] = useState('')

  const [products, setProducts] = useState<{ name: string, data: ProductType, uid: string }[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(0);

  const { setUpdateProduct } = useUpdateProductReducer()
  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = products.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchSearch = async () => {
      authFirebase.onAuthStateChanged(async (user) => {
        if (user) {
          await getDataSearchValue(search).then((data) => {
            setProducts(data)
          })
          await getDataSearchValue(search).then((data) => {
            setTotal(data.reduce((acc, product) => {
              return acc + product.data.amount * product.data.price;
            }, 0));
          })
        } else {
          window.location.href = '/'
        }
      })
    }
    fetchSearch()
  }, [search])

  useEffect(() => {
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
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Produto</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Qnt</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Preço</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-b border-white">Opções</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((product, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} py-4 text-center`}>
                <td className="text-sm md:text-base px-2 break-all leading-tight border-r border-b border-white capitalize">{product.data.name}</td>
                <td className="text-sm md:text-base px-2 break-all leading-tight border-r border-b border-white">{product.data.amount}x</td>
                <td className="text-sm md:text-base px-2 break-all leading-tight border-r border-b border-white">{formatCurrency(+product.data.price)}</td>
                <td className="text-sm md:text-base px-2 border-b border-white">
                  <MenuOptionProduct>
                    <button className="flex items-center justify-center w-5 h-5 text-yellow-500" onClick={() => (dbOnlyOneProduct(product.uid).then((data) => {
                      setUpdateProduct(data)
                      router.push('/products/editProduct')
                    }))}><i className="flex h-5 w-5">{IconEdit}</i><span className="text-sm pt-1.5">Editar</span></button>

                    <button className="flex w-5 h-5 items-center justify-center text-red-500" onClick={() => onLoadingDeleteProduct(setLoading, product.uid, product.name).then((products) => {
                      setProducts(products)
                      getDataSearchValue(search).then((data) => {
                        setTotal(data.reduce((acc, product) => {
                          return acc + product.data.amount * product.data.price;
                        }, 0));
                      })
                    })}><i className="flex h-5 w-5">{IconDelete}</i><span className="text-sm pt-1.5">Excluir</span></button>

                    <button className="flex w-5 h-5 items-center justify-center text-green-500" onClick={() => (dbOnlyOneProduct(product.uid).then((data) => {
                      setUpdateProduct(data)
                      router.push('/products/sellProduct')
                    }))}><i className="flex h-5 w-5">{IconMoney}</i><span className="text-sm pt-1">Vender</span></button>
                  </MenuOptionProduct>
                </td>

              </tr>
            ))}
            <tr className="text-right text-white bg-blue-500"><td className="px-4 py-1" colSpan={6}><strong>Valor total:</strong> {formatCurrency(+total)}</td></tr>
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
          activeClassName={'border-b border-blue-500 text-blue-500 transtion duration-500 ease-in-out'}
          className="text-sm flex w-full items-center justify-center gap-3 h-1/5"
        />
      </div>
    </div>
  )
}