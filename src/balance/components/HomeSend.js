import React, { useState } from 'react'
import Popup from "../../pages/Popup";
import Controls from "../../controls/Controls";
import Send from "../../pages/Donation/send.js";

export default function HomeSend() {

    const [openPopup, setOpenSend] = useState(false)

    return (
        <>
        <Controls.Button
                    text="Send"
                    variant="contained"
                    style={{
                        borderRadius: 30,
                        backgroundColor: "#FD8024",
                        padding: "18px 36px",
                        fontSize: "2vw",
                        width:"25vw",
                        height:"6vw",
                        
                    }}
                    onClick={() => { setOpenSend(true);}}
        />

        <Popup
            title="Send"
            open={openPopup}
            handleClose={setOpenSend}
        >
            <Send/>
        </Popup>

        </>
    )
}
