import Header from "./components/Header"
import Layout from "./components/Layout"
import NoteDisplay, { Notes } from "./components/NoteDisplay"
import { ReactElement } from "react"
import TextArea from "./components/TextArea"

function App() {

  const notes: Notes = [
    {
      title: 'A singular man.',
      content: 'An unequivocal voice found me alone, in the tub. Listening to whales on acid.',
      createdOn: new Date(),
      updatedOn: null,
      id: 1
    },
    {
      title: 'A doubular person.',
      content: 'An unequivocal voice found me alone, in the tub. Listening to acid on whales.',
      createdOn: new Date(),
      updatedOn: null,
      id: 2
    }
  ]

  const NoteColumn = (): ReactElement => {
    return (
      <div className="ds-l-sm-col">
        <div className="ds-u-margin-top--3">
          <NoteDisplay notes={notes} />
        </div>
      </div>
    )
  }

  const TextEntryColumn = (): ReactElement => {
    return (
        <div className="ds-l-lg-col">
          <TextArea />
        </div>
    )
  }

  return (
    <>
      <Header />
      <Layout>
        <TextEntryColumn/>
        <NoteColumn/>
      </Layout>
    </>
  )
}

export default App
