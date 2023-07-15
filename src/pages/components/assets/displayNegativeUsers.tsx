import { useEffect, useState } from "react"
import { IconCheck, IconInfo, IconSearch, IconStore } from "../../../../public/icons/icons"
import ReactPaginate from 'react-paginate';
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import { useRouter } from "next/router";
import { UserNegative } from "@/types/userType";
import { dbGetUsers } from "../../../../backend/db/dbGetUsers";
import { useInfoUserReducer } from "@/store/reducers/infoUserReducers/useInfoUserReducer";
import { onLoadingAddUserCart } from "@/functions/loadingPage/onLoadingAddUserCart";
import Input from "./Input";
import { onLoadingDeleteNegativeUser } from "@/functions/loadingPage/onLoadingDeleteNegativeUser";
import { authFirebase } from "../../../../backend/config";

export default function DisplayNegativeUsers() {
  const [search, setSearch] = useState('')

  const [users, setUsers] = useState<{ name: string, data: UserNegative, uidCart: string, uidUser: string }[]>([])
  const [currentPage, setCurrentPage] = useState(0);

  const { setLoading } = useLoadingReducer()
  const { setUserInfo } = useInfoUserReducer()
  const router = useRouter()

  const itemsPerPage = 6;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = users.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      authFirebase.onAuthStateChanged(async (user) => {
        if (user) {
          await dbGetUsers(search).then((data) => {
            setUsers(data)
          })
        } else {
          window.location.href = '/'
        }
      })
    }
    fetchData();
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
        <Input type="text" text="Pesquisar" id="search" value={search}
          onChange={(event) => { setSearch(event.target.value) }} inputError={true}
        />
        <i className="absolute right-3 top-8">{IconSearch}</i>
      </div>
      <div className="flex flex-col items-center pt-1 h-5/6 w-11/12 my-4 px-1 bg-white rounded-lg bg-opacity-80">
        <table className="rounded-t-md overflow-hidden w-full h-full">
          <thead className="text-left">
            <tr className="bg-blue-500 ">
              <th className="text-sm px-1 py-1 text-center text-white border-r border-b border-white">Nome</th>
              <th className="text-sm px-1 py-1 text-center text-white border-r border-b border-white">Info</th>
              <th className="text-sm px-1 py-1 text-center text-white border-r border-b border-white">Inserir<br/>produtos</th>
              <th className="text-sm px-1 py-1 text-center text-white border-b border-white">Pagar</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((users, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} py-4 text-center`}>
                <td className="text-sm break-all leading-tight border-r border-b border-white capitalize">{users.data.name}</td>
                <td className="text-sm break-all leading-tight border-r border-b border-white"><button onClick={() => {
                  setUserInfo({ userInfo: { data: users.data, uidCart: users.uidCart, uidUser: users.uidUser } })
                  router.push('/userNegative/infoUser')
                }}
                ><i className="flex h-5 w-5 text-blue-500">{IconInfo}</i></button></td>
                <td className="text-sm break-all leading-tight border-r border-b border-white"><button onClick={() => {
                  onLoadingAddUserCart(setLoading, router, users.uidCart)
                }}><i className="flex h-5 w-5 text-yellow-700">{IconCheck}</i></button></td>
                <td className="text-sm break-all leading-tight border-b border-white"><button onClick={() => onLoadingDeleteNegativeUser(setLoading, users.uidUser, users.uidCart)
                  .then(() => {
                    dbGetUsers('').then((data) => {
                      setUsers(data)
                    })
                  })
                }><i className="flex h-5 w-5 text-orange-500">{IconStore}</i></button></td>
              </tr>
            ))}
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