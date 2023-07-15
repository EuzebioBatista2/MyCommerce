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
import { formatCurrency } from "@/functions/verifyFields/verifyCurrency";

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
    <div className="flex flex-col items-center justify-between h-full w-full">
      <div className="flex w-full items-center justify-center h-16 px-2 bg-gradient-to-r from-gray-100 to-gray-400 relative">
        <Input type="search" text="Pesquisar" id="search" value={search}
          onChange={(event) => { setSearch(event.target.value) }} inputError={true}
        />
        <i className="absolute right-3 top-8">{IconSearch}</i>
      </div>

      <div className="flex flex-col items-center pt-1 h-5/6 w-11/12 my-4 px-1 bg-white rounded-lg bg-opacity-80">
        <div className="flex flex-col items-center justify-center mt-4 mb-2">
          <h1 className="font-semibold text-2xl">Historico de vendas</h1>
        </div>
        <table className="rounded-t-md overflow-hidden w-full h-full">
          <thead className="text-left">
            <tr className="bg-blue-500">
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Nome</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Data</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-b border-white">Info</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((product, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} py-4 text-center`}>
                <td className="text-sm md:text-base font-thin px-1 break-all leading-tight border-r border-b border-white capitalize"><strong>{product.user}</strong></td>
                <td className="text-sm md:text-base font-thin px-1 leading-tight border-r border-b border-white"><strong>{product.date}</strong></td>
                <td className="text-sm md:text-base font-thin px-1 border-b border-white"><button onClick={() => {
                  setInfoReportProduct({ productInfoReport: { data: product.data, user: product.user } })
                  router.push('/home/reportSell/infoReport')
                }}><i className="flex h-5 w-5 md:h-6 md:w-6 text-blue-500">{IconInfo}</i></button></td>
              </tr>
            ))}
            <tr className="text-right text-white bg-blue-500"><td className="px-4 py-1" colSpan={3}><strong>Valor total:</strong> {formatCurrency(+total)}</td></tr>
          </tbody>
        </table>

        <Button color="gray" text="Limpar historico de vendas" onClick={() => onLoadingRemoveAllReport(setLoading).then(() => {
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
          activeClassName={'border-b border-blue-500 text-blue-500 transtion duration-500 ease-in-out'}
          className="text-sm flex w-full items-center justify-center gap-3 h-1/5"
        />
      </div>

    </div>
  )
}