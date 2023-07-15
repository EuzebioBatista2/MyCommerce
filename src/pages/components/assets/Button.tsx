interface IButtonProps {
  text: string
  icon?: any
  color: 'blue' | 'yellow' | 'gray'
  submit?: boolean
  onClick?: () => void
}
export default function Button(props: IButtonProps) {
  return(
    <button 
      type={props.submit ? 'submit' : 'button'} 
      className={`flex items-center justify-center w-full h-8 mt-4 relative max-w-[400px] bg-${props.color}-500 text-lg font-semibold text-white rounded-sm`}
      onClick={props.onClick}
      >
        {props.icon ? <i className="flex absolute h-6 w-6 left-2">{props.icon}</i> : undefined }
        {props.text}
    </button>
  )
}