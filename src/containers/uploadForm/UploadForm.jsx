import React, {useCallback, useEffect, useState} from 'react'
import ImageForm from "./components/ImageForm"
import TextForm from "./components/TextForm"
import {useNavigate} from 'react-router-dom'
import {fetchData, postDataForVideo} from "./utils";

const styles = {
    container: {
        display: "flex",
        flexDirection: 'column',
        backgroundColor:'#4682B4',
        width: 500,
        alignSelf: 'center',
        borderRadius: 8,
        padding: 20,
        color: '#fff',
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 4,
        color: 'blue',
        width: 'fit-content',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        border: 'none',
        fontSize: 16,
    },
}
const UploadForm = () => {
    const navigate = useNavigate()

    const [text, setText] = useState([])
    const [images, setImages] = useState([])
    const [image, setImage] = useState(null) // TODO here only to show the UI implementation of adding image
    const [storyboardId, setStoryboardId] = useState('')
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const handleText = useCallback((val, item) => {
        setError(null)
        setText(prevText => {
            const existingIndex = prevText.findIndex(t => t.key === item.key)
            if (existingIndex !== -1) {
                // If the key is in the array, update the value
                return prevText.map((t, ind) =>
                    ind === existingIndex ? { ...t, val } : t
                )
            } else {
                // If no such key in the array, add it to the array
                return [...prevText, { key: item.key, val }]
            }
        })
    },[setText])

    const handleImage = useCallback((val, item) => {
        setError(null)
        setImages(prevImage => {
            const existingIndex = prevImage.findIndex(t => t.key === item.key)
            if (existingIndex !== -1) {
                // If the key is in the array, update the value
                return prevImage.map((t, ind) =>
                    ind === existingIndex ? { ...t, val } : t
                )
            } else {
                // If no such key in the array, add it to the array
                return [...prevImage, { key: item.key, val }]
            }
        })
    },[setImages])

    useEffect(() => {
        fetchData().then((res) => {
            setStoryboardId(res.storyboard_id)
            setData(res.data)
        })
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault()

        // send the files to an API server using fetch API
        postDataForVideo(storyboardId, data, text, images).then((res) => {
            if(res.status === 'Success') {
                navigate('/videoplayer', {
                    state: {videoUrl: res.output.video[0].links.url}
                })
                // Reset the form
                setText(null)
                setImage(null)
                setError(null)
            } else {
                setError('error generating video, please try again')
            }
        })
    }

    return (
        <div style={styles.container}>
            <h4>Enter a Details Below in Order to Generate Your Video</h4>
            <form onSubmit={handleSubmit}>
                {data && data
                    .filter((item) => item.val !== '')
                    .map((item, ind) => (
                    <div style={{marginBottom: 30}} key={item.key}>
                        <ImageForm
                            label={item.key}
                            onChangeImage={(val) => handleImage(val, item)}
                        />
                    </div>
                    ))
                }
                {data && data
                    .filter((item) => item.val === '')
                    .map((item, ind) => (
                        <div style={{marginBottom: 30}} key={item.key}>
                            <TextForm
                                label={item.key}
                                onChangeText={(val) => handleText(val, item)}
                            />
                        </div>
                    ))
                }
                <div style={{marginBottom: 30}} key={Date.now()}>
                    <ImageForm
                        label={'Image'}
                        onChangeImage={(val) => setImage(val)}
                    />
                </div>
                <div style={{marginTop: 20}}>
                    <button type="submit" style={styles.button}>Generate Video</button>
                </div>
                {
                    error && <p style={{color: 'red'}}>{error}</p>
                }
            </form>
        </div>
    )
}

export default UploadForm
