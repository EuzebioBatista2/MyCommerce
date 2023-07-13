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
  const [ search, setSearch ] = useState('')

  const [users, setUsers] = useState<{ name: string, data: UserNegative, uidCart: string, uidUser: string }[]>([])
  const [currentPage, setCurrentPage] = useState(0);

  const { setLoading } = useLoadingReducer()
  const { setUserInfo } = useInfoUserReducer()
  const router = useRouter()

  const itemsPerPage = 3;
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
        if(user) {
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
    if ( remember === "false" ) {
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
            <th className="p-2">Nome</th>
            <th className="p-2">Info</th>
            <th className="p-2">Inserir produtos</th>
            <th className="p-2">Pagar</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((users, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-600'} py-4`}>
              <td className="px-2 py-1">{users.data.name}</td>
              <td className="px-2 py-1 text-center"><button onClick={() => {
                setUserInfo({ userInfo: { data: users.data, uidCart: users.uidCart, uidUser: users.uidUser } })
                router.push('/userNegative/infoUser')
              }}
              >{IconInfo}</button></td>
              <td className="px-2 py-1 text-center"><button onClick={() => {
                onLoadingAddUserCart(setLoading, router, users.uidCart)
              }}>{IconCheck}</button></td>
              <td className="px-2 py-1 text-center"><button onClick={() => onLoadingDeleteNegativeUser(setLoading, users.uidUser, users.uidCart)
                .then(() => {
                  dbGetUsers('').then((data) => {
                    setUsers(data)
                  })
                })
              }>{IconStore}</button></td>
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
        activeClassName={'bg-red-500 px-2 py-1'}
        className="flex w-full items-center justify-center gap-6 h-1/5"
      />
    </div>
  )
}