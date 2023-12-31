import { useState } from "react"

interface IInputProps {
  type: "text" | "password" | "file" | "number" | "checkbox" | "search"
  text: string
  id: string
  onChange: (event: any) => void
  value?: string | undefined | number
  checked?: boolean
  inputError?: boolean
  animated?: boolean
  userImage?: boolean
}

export default function Input(props: IInputProps) {

  const [animation, setAnimation] = useState<boolean>()

  function verifyBlur(event: any) {
    if (event.target.value.trim() === '' && event.target.id === props.id) {
      event.target.value = ''
      setAnimation(false)
    }
  }

  return (
    props.type === "file" ? (
      // Input par ao tipo file
      <div className="flex items-center h-14 relative px-1 py-3.5 text-sm max-w-[400px]">
        <label htmlFor={props.id} className="flex items-center justify-center w-full h-8 mt-4 px-2 relative bg-yellow-500 hover:bg-yellow-600 text-lg font-semibold text-white rounded-sm transition duration-500 ease-in-out">
          Selecione uma imagem
        </label>
        <input type={props.type} name={props.id} id={props.id} accept="image/*" onChange={props.onChange}
          className={`hidden`}
        />
      </div>
    ) : props.type === "checkbox" ?  (
      // Input para o tipo checkbox
      <div className="flex items-center h-14 relative px-1 w-full max-w-[400px]">
        <label htmlFor={props.id}
          className={`text-sm pr-2`}
        >{props.text}</label>
        <input type={props.type} name={props.id} id={props.id} onChange={props.onChange} checked={props.checked}
        />
      </div>
    ) : props.type === "search" ? (
      // Input para o tipo search
      <div className="flex items-center justify-center h-14 relative px-1 w-full">
        <label htmlFor={props.id}
          className={`absolute ${animation || props.value != '' ? 'text-sm left-1 top-1' : 'text-base left-2 top-7'} transtion duration-500 ease-in-out`}
        >{props.text}</label>
        <input type={props.type} name={props.id} id={props.id}
          className={`h-8 px-1 pr-8 self-end border-b bg-transparent ${animation ? 'border-blue-500' : 'border-black'} ${props.inputError ? '' : 'text-red-500 border-red-500'} outline-none w-full transtion duration-500 ease-in-out`}
          onClick={() => setAnimation(true)} onBlur={(event) => verifyBlur(event)} onFocus={() => setAnimation(true)} value={props.value} onChange={props.onChange}
        />
      </div>
    ) : (
      // Input para os demais
      <div className="flex items-center justify-center h-14 relative px-1 w-full max-w-[400px]">
        <label htmlFor={props.id}
          className={`absolute ${animation || props.value != '' ? 'text-sm left-1 top-1' : 'text-base left-2 top-7'} transtion duration-500 ease-in-out`}
        >{props.text}</label>
        <input type={props.type} name={props.id} id={props.id}
          className={`h-8 px-1 self-end border-b bg-transparent ${animation ? 'border-blue-500' : 'border-black'} ${props.inputError ? '' : 'text-red-500 border-red-500'} outline-none w-full transtion duration-500 ease-in-out`}
          onClick={() => setAnimation(true)} onBlur={(event) => verifyBlur(event)} onFocus={() => setAnimation(true)} value={props.value} onChange={props.onChange}
        />
      </div>
    )

  )
}