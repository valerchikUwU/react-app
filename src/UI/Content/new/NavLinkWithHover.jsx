import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';




export default function NavLinkWithHover ({ to, children, style}){
 const [isHovered, setIsHovered] = useState(false);

 return (
    <NavLink to={to}>
      <span 
       style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>
      <hr style={{
        borderColor: isHovered ? '#999999' : '#CCCCCC',
        backgroundColor: isHovered ? '#999999' : '#CCCCCC',
        borderStyle: isHovered ? 'solid' : 'solid',
        borderTop: '2px solid #eee',
       }}/>
    </NavLink>
 );
};

