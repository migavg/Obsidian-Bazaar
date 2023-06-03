import React from "react";
import obgeometric from "../../assets/obgeometric.mp4";


const Hero = () => {

    return (
        <div className=" main">
            <video src={obgeometric} autoPlay loop muted />
            <div className="heroText">
            <h1 className="is-size-1">Welcome to The Obsidian Bazaar</h1>
            <p className="is-size-3"> Tread with caution for 
                what you see here cannot be unseen and remember. 
                </p>
                <p className="is-size-3">The Obsidian Eye sees all.</p>
        </div>

        </div>

    )

}

export default Hero;