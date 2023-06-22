interface IButtonProps {
  text: string
  icon?: any
}
export default function Button(props: IButtonProps) {
  return(
    <button className="flex items-center justify-center w-full h-8 mt-4 relative bg-blue-500 text-lg font-semibold text-white rounded-sm">
        {props.icon ? <i className="flex absolute h-6 w-6 left-2">{props.icon}</i> : undefined }
        {props.text}
    </button>
  )
}