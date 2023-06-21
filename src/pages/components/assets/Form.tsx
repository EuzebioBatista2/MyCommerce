import { useState } from "react"

export default function Form() {
  const [email, setEmail] = useState<boolean>()
  const [password, setPassword] = useState<boolean>()

  return (
    <div className="w-full">
      <form action="" method="post" className="flex flex-col">
        <div className="flex items-center justify-center h-14 relative px-1">
          <label htmlFor="email" 
          className={`absolute ${email ? 'text-sm left-1 top-1' : 'text-base left-1 top-7'} transtion duration-500 ease-in-out`}
          >Email</label>
          <input type="email" name="" id="email" 
          className={`h-8 self-end border-b ${email ? 'border-blue-500' : 'border-black'} outline-none w-full transtion duration-500 ease-in-out`}
          onClick={() => setEmail(true)} onBlur={() => setEmail(false)}
          />
        </div>
        <div className="flex items-center justify-center h-14 relative px-1">
          <label htmlFor="password" 
          className={`absolute ${password ? 'text-sm left-1 top-1' : 'text-base left-1 top-7'} transtion duration-500 ease-in-out`}
          >Senha</label>
          <input type="email" name="" id="password" 
          className={`h-8 self-end border-b ${password ? 'border-blue-500' : 'border-black'} outline-none w-full transtion duration-500 ease-in-out`}
          onClick={() => setPassword(true)} onBlur={() => setPassword(false)}
          />
        </div>
        <div className="flex items-center justify-center h-16 relative">
          <button type="submit" className="w-full h-8 bg-blue-500 text-lg font-semibold text-white rounded-sm">Login</button>
        </div>
      </form>
    </div>
  )
}