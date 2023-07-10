import { useEffect, useState } from "react"
import { IconCheck, IconDelete, IconEdit, IconInfo } from "../../../../public/icons/icons"
import ReactPaginate from 'react-paginate';
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import { useRouter } from "next/router";
import { UserNegative } from "@/types/userType";
import { dbGetUsers } from "../../../../backend/db/dbGetUsers";
import { useInfoUserReducer } from "@/store/reducers/infoUserReducers/useInfoUserReducer";
import { onLoadingAddUserCart } from "@/functions/loadingPage/onLoadingAddUserCart";

export default function DisplayNegativeUsers() {
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
      await dbGetUsers().then((data) => {
        setUsers(data)
      })
    };
    fetchData();
  }, [])

  return (
    <div className="w-full">
      <table className="my-6 w-full">
        <thead className="text-left">
          <tr className="bg-gray-400 ">
            <th className="p-2">Nome</th>
            <th className="p-2">Info</th>
            <th className="p-2">Inserir produtos</th>
            <th className="p-2">Del</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((users, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-600'} py-4`}>
              <td className="px-2 py-1">{users.data.name}</td>
              <td className="px-2 py-1 text-center"><button onClick={() => {
                setUserInfo({ userInfo: { data: users.data, uidCart: users.uidCart, uidUser: users.uidUser } })
                router.push('/infoUser')
              }}
                >{IconInfo}</button></td>
              <td className="px-2 py-1 text-center"><button onClick={() => {
                onLoadingAddUserCart(setLoading, router, users.uidCart)
              }}>{IconCheck}</button></td>
              <td className="px-2 py-1 text-center"><button>{IconDelete}</button></td>
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