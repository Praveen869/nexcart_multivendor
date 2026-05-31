import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

const Navbar = ({ active }) => {
    return (
        <div className={`block 800px:${styles.noramlFlex}`}>
            {
                navItems && navItems.map((i, index) => (
                    <div className="flex" key={index}>
                        <Link to={i.url}
                            className={`${
                                active === index + 1 
                                ? "text-indigo-600 font-extrabold 800px:underline 800px:underline-offset-8 800px:decoration-indigo-600 800px:decoration-2" 
                                : "text-slate-700 800px:text-slate-800 hover:text-indigo-600 font-medium"
                            } pb-[15px] 800px:pb-0 font-sans text-[15px] tracking-wide px-6 cursor-pointer transition-colors duration-200`}
                        >
                            {i.title}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Navbar

