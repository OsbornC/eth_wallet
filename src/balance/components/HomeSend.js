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
                        fontSize: "30px",
                        width:370,
                        height:100,
                        marginTop:70
                        
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
