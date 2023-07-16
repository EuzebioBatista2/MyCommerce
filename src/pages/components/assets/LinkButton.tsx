import Link from "next/link"

interface IButtonProps {
  color: 'blue' | 'yellow' | 'gray'
  children: any
}
export default function LinkButton(props: IButtonProps) {
  return (
    <div className={`flex items-center justify-center text-center w-full max-w-[400px] h-8 mt-2 relative bg-${props.color}-500 text-lg font-semibold text-white rounded-sm hover:bg-${props.color}-600 transition duration-500 ease-in-out`}>
      <div className="relative w-full h-full">
        {props.children}  
      </div>
    </div>
  )
}