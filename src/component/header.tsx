import React from "react";
import {DiGoogleAnalytics} from "react-icons/di";

const Header: React.FC = () => {
    return (
        <div className='header'>
            <div className='header-logo'>
                <DiGoogleAnalytics/>
            </div>
        </div>
    );
};

export default Header;