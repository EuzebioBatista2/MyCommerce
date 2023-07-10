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
      className={`flex items-center justify-center w-full h-8 mt-4 relative bg-${props.color}-500 text-lg font-semibold text-white rounded-sm`}
      >
        {props.icon ? <i className="flex absolute h-6 w-6 left-2">{props.icon}</i> : undefined }
        {props.text}
    </Link>
  )
}