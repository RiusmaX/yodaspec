import { Loader2 } from 'lucide-react'

function Loading (): React.ReactNode {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <Loader2 className='w-4 h-4 mr-2 animate-spin' />
    </div>
  )
}

export default Loading
