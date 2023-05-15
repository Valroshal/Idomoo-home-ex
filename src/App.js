import React from "react"
import UploadForm from "./containers/uploadForm/UploadForm"
import VideoPlayer from "./containers/Player/VideoPlayer"
import {Route, BrowserRouter} from "react-router-dom"
import {Routes} from "react-router"

const styles = {
    container: {
        display: "flex",
        justifyContent: 'center',
        flex: 1,
        background:'linear-gradient(rgba(70, 130, 180, 0.70),#0047AB)',
        paddingBottom: 80,
        paddingTop: 80,
        height: '100vh',
}}

function App() {
  return (
    <div style={styles.container}>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<UploadForm />} />
                <Route path="/videoplayer" element={<VideoPlayer />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
