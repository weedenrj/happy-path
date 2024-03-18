import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, useState } from 'react'
import { mkHeadersFromCsv } from './lib/TicketUtil'
import { trimFormString } from './lib/FormUtil'

const defaultFileState = {
  file: undefined,
  fileContents: "",
  headers: [] as string[],
  error: ""
}

function App() {
  const [fileState, setFileState] = useState(defaultFileState)

  // handle submission here
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const ticket = fileState.headers.reduce((acc, header) => {
      return { ...acc, [header]: trimFormString(event.currentTarget[header].value) }
    }, {})

    // TODO: This is a Mock request
    const response = await fetch("/fakeroute", {
      method: "POST",
      body: JSON.stringify(ticket)
    })
  }

  // handle CSV file change here
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0)
    const fileExt = file?.name.split(".").at(-1)

    if (fileExt?.toLowerCase() !== "csv") {
      setFileState({ ...defaultFileState, error: "Incorrect file type" })
      return
    } else {
      setFileState((prev) => { return { ...prev, error: "" } })
    }

    try {
      const fileRead = await fetch(`/${file?.name}`)
      const fileContents = await fileRead?.text()
      const headers = mkHeadersFromCsv(fileContents)

      setFileState((prev) => { return { ...prev, fileContents, headers } })
    } catch (e) {
      setFileState((prev) => { return { ...prev, error: "Error reading file" } })
    }
  }

  return (
    <>
      <div className='flex justify-center pt-12'>
        <form className="w-[600px]" onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-1.5 pb-4 border-b">
            <Label htmlFor="picture">CSV File <span className='text-red-500'>{fileState.error}</span></Label>
            <Input id="csv" type="file" onChange={handleChange} />
          </div>

          {/* generate form fields here */}
          {fileState.headers.map(header => (
            <div className="grid w-full items-center gap-1.5 pb-4 border-b" key={header}>
              <Label htmlFor={header}>{header}</Label>
              <Input id={header} type="text" placeholder={header} />
            </div>
          ))}

          <Button
            type="submit"
            className="w-full mt-4"
            variant={Boolean(fileState.error) ? "destructive" : "default"}
            disabled={Boolean(fileState.error)}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}

export default App
