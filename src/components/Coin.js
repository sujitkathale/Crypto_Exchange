import React from "react";
import "../Coin.css";

const Coin = ({ url, name, trade24Volume }) => {
    return (
        <div>

            <div className="coin-container">
                <div className="coin-row">
                    <div className="coin ">
                        <img src={url} alt="crypto" />
                        <h1>{name}</h1>
                    </div>
                    <div className="coin-data">
                        <h1 >{trade24Volume !== undefined ? `$${trade24Volume / Math.pow(10, 9)} billion` : "-"}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coin;
