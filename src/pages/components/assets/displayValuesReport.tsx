import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import { IconInfo, IconSearch } from "../../../../public/icons/icons";
import Input from "./Input";
import { dbGetReport } from "../../../../backend/db/dbGetReport";
import { ReportType } from "@/types/reportType";
import { useInfoReportReducer } from "@/store/reducers/infoReportReducer/useInfoReportReducer";
import { useRouter } from "next/router";
import Button from "./Button";
import { onLoadingRemoveAllReport } from "@/functions/loadingPage/onLoadingRemoveAllReport";
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";

export default function DisplayValuesReport() {
  const [search, setSearch] = useState('')

  const [currentPage, setCurrentPage] = useState(0);

  const [products, setProducts] = useState<{ name: string, data: ReportType[], user: string, date: string }[]>([])
  const [total, setTotal] = useState<number>(0)

  const { setInfoReportProduct } = useInfoReportReducer()
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
      await dbGetReport(search).then((data) => {
        setProducts(data)
      });
      await dbGetReport(search).then((db) => {
        let value: number = 0
        db.map((list) => {
          value = value + list.data.reduce((acc, product) => {
            return acc + product.amount * product.price
          }, 0)
        })
        setTotal(value)
      })
    };
    fetchData();
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

      <table className="my-6 mx-4 h-2/5">
        <thead className="text-left">
          <tr className="bg-gray-400 ">
            <th className="p-2">Nome</th>
            <th className="p-2">Data</th>
            <th className="p-2">Info</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((product, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-600'} py-4`}>
              <td className="px-4 py-1"><strong>{product.user}</strong></td>
              <td className="px-4 py-1"><strong>{product.date}</strong></td>
              <td className="px-4 py-1"><button onClick={() => {
                setInfoReportProduct(product.data)
                router.push('/infoReport')
              }}>{IconInfo}</button></td>
            </tr>
          ))}
          <tr className="text-right bg-gray-700"><td className="px-4 py-1" colSpan={3}><strong>Valor total:</strong> {total}</td></tr>
        </tbody>
      </table>

      <Button color="gray" text="Limpar historico de vendas" onClick={() => onLoadingRemoveAllReport( setLoading ).then(() => {
        router.push('/home')
      })} />
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