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

export default function DisplayValuesInfoUsers() {
  const [search, setSearch] = useState('')

  const [users, setUsers] = useState<{ data: UserNegative, uidCart: string, uidUser: string }>({ data: { name: '', phone: '' }, uidCart: '', uidUser: '' })
  const [currentPage, setCurrentPage] = useState(0);

  const [products, setProducts] = useState<{ name: string, data: UserCart, uid: string }[]>([])
  const [total, setTotal] = useState<number>(0)

  const { setLoading } = useLoadingReducer()
  const { userInfo } = useInfoUserReducer()
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
    if (userInfo.uidUser !== '') {
      setUsers(userInfo)
      const fetchData = async () => {
        await dbGetUserCart(userInfo.uidCart, search).then((data) => {
          setProducts(data)
        });
        await dbGetUserCart(userInfo.uidCart, search).then((data) => {
          setTotal(data.reduce((acc, product) => {
            return acc + product.data.amount * product.data.price;
          }, 0));
        })
      };
      fetchData();
    } else {
      router.push('/userNegative')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className="">
      <div className="flex items-center justify-center h-16 bg-gray-700 relative">
        <Input type="text" text="Pesquisar" id="search" value={search}
          onChange={(event) => { setSearch(event.target.value) }} inputError={true}
        />
        <i className="absolute right-2 top-6">{IconSearch}</i>
      </div>

      <h2>Nome: {users.data.name}</h2>
      <h4>Telefone: {users.data.phone}</h4>

      <table className="my-6 mx-4 h-2/5">
        <thead className="text-left">
          <tr className="bg-gray-400 ">
            <th className="p-2">Produto</th>
            <th className="p-2">Qnt</th>
            <th className="p-2">Preço</th>
            <th className="p-2">Data</th>
            <th className="p-2">Del</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((product, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-600'} py-4`}>
              <td className="px-2 py-1">{product.data.name}</td>
              <td className="px-2 py-1">{product.data.amount}</td>
              <td className="px-2 py-1">{product.data.price}</td>
              <td className="px-2 py-1">{product.data.date}</td>
              <td className="px-2 py-1 text-center"><button onClick={() => onLoadingDeleteProductUser(setLoading, userInfo.uidCart, product.uid)
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
              >{IconDelete}</button></td>
            </tr>
          ))}
          <tr className="text-right bg-gray-700"><td className="px-4 py-1" colSpan={5}><strong>Valor total:</strong> {total}</td></tr>
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