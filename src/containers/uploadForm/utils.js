export const postDataForVideo = async (storyboardId, data, text, images) => {
    const proxyUrl = '/api/v2/storyboards/generate'
    const concatData = text.concat(images)
    const videoData = data.map(item => {
        const match = concatData.find(t => t.key === item.key)
        if (match) {
            return { ...item, val: match.val}
        }
    })

    const postData = {
        "storyboard_id": storyboardId,
        "output": {
            "video": [
                {
                    "height": 720,
                    "video_type": "hls",
                    "landing_page_id": null
                }
            ],
            "gif": [
                {
                    "height": 1,
                    "start": 0,
                    "duration": 1,
                    "gif_fps": 1,
                    "gif_loop": 0,
                    "color_depth": 256,
                    "crop_to_ratio": [
                        4,
                        5
                    ],
                    "suffix": "string",
                    "label": "string"
                }
            ]
        },
        "data": videoData
    }


    // const postData = {
    //     "storyboard_id": storyboardId,
    //     "statistic_id": "string",
    //     "video_file_name": "val's video",
    //     "output_config_id": 0,
    //     "output": {
    //     "video": [
    //         {
    //             "video_type": "mp4",
    //             "quality": 26,
    //             "height": 1,
    //             "crop_to_ratio": [
    //                 4,
    //                 5
    //             ],
    //             "suffix": "string",
    //             "overlay": "string",
    //             "overlay_alignment": [
    //                 "center",
    //                 "middle"
    //             ],
    //             "overlay_scale": "fit",
    //             "landing_page_id": "string",
    //             "label": "string"
    //         }
    //     ],
    //         "jpg": [
    //         {
    //             "height": 1,
    //             "time": 0,
    //             "crop_to_ratio": [
    //                 4,
    //                 5
    //             ],
    //             "suffix": "string",
    //             "overlay": "string",
    //             "overlay_alignment": [
    //                 "center",
    //                 "middle"
    //             ],
    //             "overlay_scale": "fit",
    //             "label": "string"
    //         }
    //     ],
    //         "audio": [
    //         {
    //             "file_type": "wav",
    //             "sample_rate": 44100,
    //             "bit_depth": 16,
    //             "mp3_bitrate": 320,
    //             "channels": "mono"
    //         }
    //     ],
    //         "accessibility": {
    //         "caption_languages": [
    //             "EN",
    //             "ES"
    //         ],
    //             "transcript_languages": [
    //             "EN",
    //             "FR"
    //         ]
    //     }
    // },
    //     "storage": [
    //         0
    //     ],
    //     "analytics_tags": [
    //         "tag_group.tag_name"
    //     ],
    //     "data": videoData
    // }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic MzU1MDpQaUtRMXhmdUtDMjJjMWM1YzAwNjFhZjEyYTI0MGUwOTJkOTNlYzZhNDdnbWNrd1FHaHA2',
            'x-idomoo-api-mode': 'developer'
        },
        body: JSON.stringify(postData),
    }

    try {
        const response = await fetch(proxyUrl, requestOptions)
        const result = await response.json()
        console.log('result creating video', result)
        return result
    } catch (error) {
        console.error('Error:', error)
    }
}

export const fetchData = async () => {
    const proxyUrl = '/api/v2/storyboards/31193'

    try {
        const response = await fetch(proxyUrl)
        if (response.statusText === 'OK') {
            return await response.json()
        }
        return await response.statusText
    } catch (error) {
        console.error('An error occurred:', error)
    }
}
