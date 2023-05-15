import React, {useState} from "react"

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
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
        fontSize: 16,
    },
    video: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
}

const ImageForm = ({onChangeImage, label}) => {
    const [image, setImage] = useState('')

    const handleChangeImage = (val) => {
        const file = val.target.files[0]
        const image = URL.createObjectURL(file)
        setImage(image)
        onChangeImage(val.target.files[0])
    }

    return(
        <div style={styles.container}>
            <p style={{marginBottom: 10}}>{label}</p>
            <div style={styles.video}>
                <div>
                    <label htmlFor="imageFile" style={styles.button}>Upload Image</label>
                    <input
                        type="file"
                        id="imageFile"
                        accept="image/*"
                        onChange={(e) => {handleChangeImage(e)}}
                        style={{display: 'none'}}

                    />
                </div>
                {image && <img src={image} alt="Preview" height={55}/>}
            </div>
        </div>
    )
}

export default ImageForm
