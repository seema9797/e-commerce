import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import logo from '../../assests/commere.png';
import useStyles from './styles'
import {Link,useLocation} from 'react-router-dom';
const Navbar = ({totalItems}) => {
    const classes=useStyles();
     const location=useLocation();

   
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
               <Toolbar>
                   <Typography component={Link} to="/" varient="h6" className={classes.title} color="inherit">
                       <img src={logo} alt="commerce.js" height="25px" className={classes.image}/>
                          Commerece.js
                   </Typography>
                   <div className={classes.grow}/>
                   {location.pathname === '/' &&(
                   <div className={classes.button}>
                        <Link to="/cart">go to cart</Link> 
                      <IconButton component={Link} to="/cart" arial-label="Show cart items" color="inherit">
                             <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                             </Badge>
                      </IconButton>
                   </div>)}
               </Toolbar>
            </AppBar> 
        </>
    )
}



export default Navbar
