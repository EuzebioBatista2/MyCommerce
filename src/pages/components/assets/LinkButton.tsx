import Link from "next/link"

interface IButtonProps {
  text: string
  icon?: any
  color: 'blue' | 'yellow' | 'gray'
  link: string
}
export default function LinkButton(props: IButtonProps) {
  return(
    <Link 
      href={props.link}
      className={`flex items-center justify-center text-center w-full max-w-[400px] mt-2 relative bg-${props.color}-500 text-lg font-semibold text-white rounded-sm`}
      >
        {props.icon ? <i className="flex items-center absolute h-5 w-5 md:h-6 md:w-6 left-1">{props.icon}</i> : undefined }
        {props.text}
    </Link>
  )
}