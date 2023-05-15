import React, {useState} from "react"

const styles = {
    container: {
        display: "flex",
        flexDirection: 'column',
        height: '80%',
        width: 500,
        alignSelf: 'center',
        borderRadius: 8,
        color: '#fff',
        maxWidth: 300,
    },
    input: {
        backgroundColor: '#A7C7E7',
        border: 'none',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 8,
    }
}

const TextForm = ({onChangeText, label}) => {
    const [text, setText] = useState()

    const handleChangeText = (val) => {
        setText(val)
        onChangeText(val)
    }

    return(
        <div style={styles.container}>
            <label htmlFor="videoFile" style={{marginBottom: 10}}>{label}</label>
            <input
                id="text"
                value={text}
                onChange={(e) =>handleChangeText(e.target.value)}
                style={styles.input}
            />
        </div>
    )
}

export default TextForm
