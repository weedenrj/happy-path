import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent } from 'react'

function App() {
  const columnMapping = [
    "ID",
    "Status",
    "Ticket Name",
    "Open Date",
    "Close Date"
  ] as const

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // handle submission here
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // handle CSV file change here
  }

  return (
    <>
      <div className='flex justify-center pt-12'>
        <form className="w-[600px]" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-1.5 pb-4 border-b">
            <Label htmlFor="picture">CSV File</Label>
            <Input id="csv" type="file" onChange={handleChange}/>
          </div>

          {/* generate form fields here */}

          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}

export default App
