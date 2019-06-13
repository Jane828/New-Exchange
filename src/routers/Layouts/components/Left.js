import React from 'react'
import logo from '../assets/logo.png'
import SideMenu from '@/components/SideMenu'

const Left = () =>{
    // this.clsArr = this.props.location.pathname.split('/');
    // this.cls = this.clsArr[1]?(this.clsArr[1]+'Main'):''
    // console.log('5555555555555555555555555555');
    // console.log(this.cls);
    return (
        <div className="header">
            <div className='header-main'>
                {/* <div className='logo'>
                    <img src={logo} />
                </div> */}
                <SideMenu></SideMenu>
            </div>
        </div>
    )
}

export default Left