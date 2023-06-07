import React from "react";
import obgeometric from "../../assets/obgeometric.mp4";


const Hero = () => {

    return (
        <div className=" main">
            <video className="video" src={obgeometric} autoPlay loop muted />
            <div className="heroText container is-flex">
                <h1 className="is-size-1 has-text-centered  ">Welcome to The Obsidian Bazaar</h1>
                <p className="is-size-3 has-text-centered"> Tread with caution for
                    what you see here cannot be unseen and remember.
                </p>
                <p className="is-size-3 has-text-centered productScroll viewProductBtnBottom">The Obsidian Eye sees all.</p>
            
                <div> 
                 <a href="#products" className="button is-dark "> View our Products</a>
                
                </div>
            
            
            </div>

            


        </div>

    )

}

export default Hero;