import React, {useEffect} from 'react'
import {useLocation} from "react-router";
const idmPlayerCreate = window.idmPlayerCreate

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
}

const VideoPlayer = () => {
    const {state} = useLocation()
    const { videoUrl } = state

    useEffect(() => {
        const initializePlayer = () => {
            const player_options = {
                interactive: true,
                size: "hd",
                autoplay: true,
                cta_analytics: [
                    ["idm-cta-btn1", "Loved it"],
                    ["idm-cta-btn2", "It cracked me down"]
                ],
                src: videoUrl
            };
            idmPlayerCreate(player_options, "idm_player")
        };

        // Delay the execution of initializePlayer using setTimeout
        const timerId = setTimeout(initializePlayer, 1000)

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timerId)
    }, [videoUrl])

    return(
        <div style={styles.container}>
            <div id="idm_player" className="idm-player" style={{minWidth: 650}}></div>
            <div>
                <button className="idm-cta-btn1">Loved it</button>
                <button className="idm-cta-btn2">It cracked me down</button>
            </div>
        </div>
    )
}

export default VideoPlayer
