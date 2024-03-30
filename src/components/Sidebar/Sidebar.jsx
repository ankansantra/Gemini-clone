import React, { useContext, useState } from 'react'
import "./Sidebar.css"
import {assets} from "../../assets/assets"
import { Context } from '../../context/Context'
const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context);
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
       await onSent(prompt)
    }

  return (
    <div className='sidebar'>
        <div className='top'>

        {/* //if extended is true then show image otherwise not if prev is true it return false */}
            <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt/>
            <div onClick={()=>newChat()} className='new-chat'>
                <img src={assets.plus_icon} alt=''/>

                {/* //if extended is true then show new chat otherwise not */}
                {extended?<p>New Chat</p>:null}   
            </div>

            {/* //if extended is true then show recent otherwise not */}
            {extended?<div className='recent'>
                <p className='recent-title'>Recent</p>
                {prevPrompts.map((item,index)=>{
                    return (
                        <div onClick={()=>loadPrompt(item)} className='recent-entry'>
                    <img src={assets.message_icon} alt=''/>
                    <p>{item.slice(0,17)}...</p>
                </div>

                    )
                })}
                
            </div>:null}
            
        </div>
        <div className='bottom'>
        <div className='bottom-item recent-entry'>
          <img src={assets.question_icon} alt='qicon'/>
          {extended?<p>Help</p>:null}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.history_icon} alt='hicon'/>
          {extended?<p>Activity</p>:null}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.setting_icon} alt='sicon'/>
          {extended?<p>Settings</p>:null}
        </div>

        </div>
    </div>
  )
}

export default Sidebar