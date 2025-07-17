// React and necessary hooks
import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// Contexts for global state
import { UserContext } from '../../../Context/UserContext';

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faTimes,
    faShoppingCart,
    faRightFromBracket,
    faHouse,
    faThLarge,
    faTags,
    faRightToBracket,
    faDoorOpen,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faInstagram,
    faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { CartContext } from '../../../Context/CartContext';

export default function Navbar() {
    // State to toggle mobile menu
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    // Accessing values from context
    const { numOfCartItems } = useContext(CartContext);
    const { user, setUser } = useContext(UserContext);

    // Logs out the user and redirects to login page
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setUser(null);
        navigate('/login');
        // Close mobile menu after logout if it's open
        setMenuOpen(false);
    };

    // Toggles the mobile nav menu
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    // New function: Closes the mobile menu.
    // This will be called when a navigation link is clicked.
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="bg-gray-800 text-white px-6 py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo and branding */}
                <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTags} />
                    <span>Ecommerce</span>
                </div>

                {/* Hamburger icon for mobile menu toggle */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-white text-2xl focus:outline-none" // Added focus style
                    aria-expanded={menuOpen} // Accessibility improvement
                    aria-label={menuOpen ? "Close menu" : "Open menu"} // Accessibility improvement
                >
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </button>

                {/* Desktop navigation links */}
                <div className="hidden lg:flex lg:items-center lg:gap-10 w-full justify-center">
                    <NavLink
                        to="/"
                        className="hover:text-emerald-400 flex items-center gap-1 transition-colors duration-300" // Added transition
                    >
                        <FontAwesomeIcon icon={faHouse} /> Home
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className="hover:text-emerald-400 flex items-center gap-1 transition-colors duration-300" // Added transition
                    >
                        <FontAwesomeIcon icon={faThLarge} /> Categories
                    </NavLink>
                    <NavLink
                        to="/wishlist"
                        className="hover:text-emerald-400 flex items-center gap-1 transition-colors duration-300" // Added transition
                    >
                        <FontAwesomeIcon icon={faHeart} /> Wishlist
                    </NavLink>
                    <NavLink
                        to="/brands"
                        className="hover:text-emerald-400 flex items-center gap-1 transition-colors duration-300" // Added transition
                    >
                        <FontAwesomeIcon icon={faTags} /> Brands
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className="hover:text-emerald-400 flex items-center gap-1 transition-colors duration-300" // Added transition
                    >
                        <FontAwesomeIcon icon={faShoppingCart} />
                        Cart ({numOfCartItems})
                    </NavLink>
                </div>

                {/* Desktop social icons + auth buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Social icons */}
                    <div className="flex gap-3 text-lg">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-300 transition-colors duration-300" // Added transition
                            aria-label="Facebook"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-pink-500 hover:text-pink-300 transition-colors duration-300" // Added transition
                            aria-label="Instagram"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-300" // Added transition
                            aria-label="X (formerly Twitter)"
                        >
                            <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                    </div>

                    {/* Login/Logout and Resignation links */}
                    <div className="flex gap-3 items-center">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="hover:text-red-400 flex items-center gap-1 transition-colors duration-300" // Added transition
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                            </button>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="hover:text-emerald-400 flex items-center gap-1 transition-colors duration-300" // Added transition
                                >
                                    <FontAwesomeIcon icon={faRightToBracket} /> Login
                                </NavLink>
                                <NavLink
                                    to="/resignation"
                                    className="hover:text-emerald-400 flex items-center gap-1 transition-colors duration-300" // Added transition
                                >
                                    <FontAwesomeIcon icon={faDoorOpen} /> Resignation
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile navigation menu (shown when hamburger is clicked) */}
            {/*
        Applied conditional classes for animation:
        - `translate-y-0` when open, `-translate-y-full` when closed (to slide down/up)
        - `h-auto` and `py-4` when open, `h-0 overflow-hidden` when closed (to control height and hide content)
        - `transition-all duration-300 ease-in-out` for smooth animation
      */}
            <div
                className={`lg:hidden mt-4 absolute left-0 right-0 bg-gray-800 shadow-lg
          ${menuOpen ? 'translate-y-0 opacity-100 h-auto py-4' : '-translate-y-full opacity-0 h-0 overflow-hidden'}
          transition-all duration-300 ease-in-out transform`}
            >
                <div className="flex flex-col gap-4 px-4 pb-4"> {/* Added pb-4 for consistency */}
                    {/* Navigation links */}
                    <NavLink
                        to="/"
                        onClick={closeMenu} // Close menu when clicked
                        className="hover:text-emerald-400 flex items-center gap-2 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faHouse} /> Home
                    </NavLink>
                    <NavLink
                        to="/categories"
                        onClick={closeMenu} // Close menu when clicked
                        className="hover:text-emerald-400 flex items-center gap-2 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faThLarge} /> Categories
                    </NavLink>
                    <NavLink
                        to="/brands"
                        onClick={closeMenu} // Close menu when clicked
                        className="hover:text-emerald-400 flex items-center gap-2 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faTags} /> Brands
                    </NavLink>
                    <NavLink
                        to="/cart"
                        onClick={closeMenu} // Close menu when clicked
                        className="hover:text-emerald-400 flex items-center gap-2 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faShoppingCart} /> Cart ({numOfCartItems})
                    </NavLink>

                    {/* Social icons */}
                    <div className="flex gap-3 text-lg mt-2 pt-2 border-t border-gray-700"> {/* Added border-t and pt-2 for separation */}
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-300 transition-colors duration-300"
                            aria-label="Facebook"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-pink-500 hover:text-pink-300 transition-colors duration-300"
                            aria-label="Instagram"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-300"
                            aria-label="X (formerly Twitter)"
                        >
                            <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                    </div>

                    {/* Login/Logout and Resignation (mobile) */}
                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-700"> {/* Added border-t and pt-4 for separation */}
                        {user ? (
                            <button
                                onClick={handleLogout} // This already closes the menu
                                className="hover:text-red-400 flex items-center gap-2 transition-colors duration-300"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                            </button>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    onClick={closeMenu} // Close menu when clicked
                                    className="hover:text-emerald-400 flex items-center gap-2 transition-colors duration-300"
                                >
                                    <FontAwesomeIcon icon={faRightToBracket} /> Login
                                </NavLink>
                                <NavLink
                                    to="/resignation"
                                    onClick={closeMenu} // Close menu when clicked
                                    className="hover:text-emerald-400 flex items-center gap-2 transition-colors duration-300"
                                >
                                    <FontAwesomeIcon icon={faDoorOpen} /> Resignation
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}