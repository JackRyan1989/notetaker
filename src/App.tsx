import Layout from "./components/Layout"
import Header from "./components/Header"
import TextArea from "./components/TextArea"

function App() {

  return (
    <>
      <Header />
      <Layout>
        <div className="ds-l-md-col">
          <TextArea />
        </div>
      </Layout>
    </>
  )
}

export default App
