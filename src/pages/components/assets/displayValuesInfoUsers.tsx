import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import { useRouter } from "next/router";
import { UserCart, UserNegative } from "@/types/userType";
import { IconDelete, IconSearch } from "../../../../public/icons/icons";
import { useInfoUserReducer } from "@/store/reducers/infoUserReducers/useInfoUserReducer";
import { dbGetUserCart } from "../../../../backend/db/dbGetUserCart";
import Input from "./Input";
import { onLoadingDeleteProductUser } from "@/functions/loadingPage/onLoadingDeleteProductUser";
import { authFirebase } from "../../../../backend/config";
import { formatCurrency } from "@/functions/verifyFields/verifyCurrency";

export default function DisplayValuesInfoUsers() {
  const [search, setSearch] = useState('')

  const [users, setUsers] = useState<{ data: UserNegative, uidCart: string, uidUser: string }>({ data: { name: '', phone: '' }, uidCart: '', uidUser: '' })
  const [currentPage, setCurrentPage] = useState(0);

  const [products, setProducts] = useState<{ name: string, data: UserCart, uid: string }[]>([])
  const [total, setTotal] = useState<number>(0)

  const { setLoading } = useLoadingReducer()
  const { userInfo } = useInfoUserReducer()
  const router = useRouter()

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = products.slice(startIndex, endIndex);

  useEffect(() => {
    // 
    authFirebase.onAuthStateChanged(async (user) => {
      if (user) {
        if (userInfo.uidUser !== '') {
          setUsers(userInfo)
          const fetchData = async () => {
            await dbGetUserCart(userInfo.uidCart, search).then((data) => {
              setProducts(data)
              setTotal(data.reduce((acc, product) => {
                return acc + product.data.amount * product.data.price;
              }, 0));
            });
          };
          fetchData();
        } else {
          router.push('/userNegative')
        }
      } else {
        window.location.href = '/'
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="flex flex-col items-center justify-center mt-4 mb-2">
          <h2>Nome:<strong>{users.data.name}</strong></h2>
          <h4>Telefone:<strong>{users.data.phone}</strong></h4>
        </div>

        <table className="rounded-t-md overflow-hidden w-full h-full">
          <thead className="text-left">
            <tr className="bg-blue-500">
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Produto</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Qnt</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Preço</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Data</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-b border-white">Del</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((product, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} py-4 text-center`}>
                <td className="text-sm md:text-base px-1 break-all leading-tight border-r border-b border-white capitalize">{product.data.name}</td>
                <td className="text-sm md:text-base px-1 break-all leading-tight border-r border-b border-white">{product.data.amount}x</td>
                <td className="text-xs md:text-base px-1 leading-tight border-r border-b border-white">{formatCurrency(+product.data.price)}</td>
                <td className="text-xs md:text-base px-1 leading-tight border-r border-b border-white">{product.data.date}</td>
                <td className="text-sm md:text-base px-1 border-b border-white"><button onClick={() => onLoadingDeleteProductUser(setLoading, userInfo.uidCart, product.uid)
                  .then(() => {
                    dbGetUserCart(userInfo.uidCart, '').then((data) => {
                      setProducts(data)
                    });
                    dbGetUserCart(userInfo.uidCart, '').then((data) => {
                      setTotal(data.reduce((acc, product) => {
                        return acc + product.data.amount * product.data.price;
                      }, 0));
                    })
                  })}
                ><i className="flex h-5 w-5 md:h-6 md:w-6 text-red-500">{IconDelete}</i></button></td>
              </tr>
            ))}
            <tr className="text-right text-white bg-blue-500"><td className="px-4 py-1" colSpan={5}><strong>Valor total:</strong> {formatCurrency(+total)}</td></tr>
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