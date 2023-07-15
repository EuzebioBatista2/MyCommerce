import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import { useRouter } from "next/router";
import { useInfoReportReducer } from "@/store/reducers/infoReportReducer/useInfoReportReducer";
import { authFirebase } from "../../../../backend/config";
import { formatCurrency } from "@/functions/verifyFields/verifyCurrency";

export default function DisplayValuesInfoReport() {
  const [products, setProducts] = useState<{ amount: number, price: number, name: string }[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const router = useRouter()

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = products.slice(startIndex, endIndex);

  const { productInfoReport } = useInfoReportReducer()

  useEffect(() => {
    authFirebase.onAuthStateChanged(async (user) => {
      if (user) {
        if (productInfoReport.user !== '') {
          setProducts(productInfoReport.data)
          setTotal(productInfoReport.data.reduce((acc, product) => {
            return acc + product.amount * product.price;
          }, 0));
        } else {
          router.push('/home/reportSell')
        }

      } else {
        window.location.href = '/'
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <div className="flex flex-col items-center pt-1 h-5/6 w-11/12 my-4 px-1 bg-white rounded-lg bg-opacity-80">
        <div className="flex flex-col items-center justify-center mt-4 mb-2">
          <h2>Nome:<strong> {productInfoReport.user}</strong></h2>
          <p className="text-sm md:text-base text-gray-600">Produtos comprados</p>
        </div>
        <table className="rounded-t-md overflow-hidden w-full h-full">
          <thead className="text-left">
            <tr className="bg-blue-500 ">
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Produto</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-r border-b border-white">Qnt</th>
              <th className="text-sm md:text-base px-1 py-1 text-center text-white border-b border-white">Preço</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((product, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} py-4 text-center`}>
                <td className="text-sm md:text-base px-1 break-all leading-tight border-r border-b border-white capitalize">{product.name}</td>
                <td className="text-sm md:text-base px-1 break-all leading-tight border-r border-b border-white">{product.amount}x</td>
                <td className="text-sm md:text-base px-1 leading-tight border-r border-b border-white">{formatCurrency(+product.price)}</td>
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