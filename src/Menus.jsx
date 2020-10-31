import React, {useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) =>
  createStyles({
      container:{
        
      },
    listItem: {
        maxWidth: '75%',
        backgroundColor: '#fbfbfb',
        padding: theme.spacing(3),
        margin: '20px auto',
        // borderRadius: '5px',
        boxShadow: "15px 5px 25px 5px rgba(0, 0, 0, 0.918), 0 0 40px rgba(0, 0, 0, 0.3) inset",
    },
    openItem:{
        display: 'flex',
    },
    pic1: {
        width: '10%',
        marginLeft: '10px',
        marginTop: '10px',
        minWidth: 100,
    },
    label:{
        margin: '10px auto',
        padding: '5px'
    },
    nested: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    details: {
        textAlign: 'right',
    }
  }),
);

function Menus({label, calorie, pic, totalTime, ingredients}){
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
      };
      
    var roundCalory = Math.round(calorie); 
    
    return(
        <div className={classes.container}>
            <List className={classes.listItem}>
                <div className={classes.openItem}>
                    <img className={classes.pic1} src={pic} alt="" />
                    <h2 className={classes.label}>{label}</h2>                            
                </div>                   
                    <ListItem className={classes.details} onClick={handleClick}>
                        <ListItemText primary="Details" />
                        {open ? <ExpandMore /> : <ExpandLess />}
                    </ListItem>
                    <Collapse in={!open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <p>Calories: {roundCalory} cal.</p>
                                <p>Cooking Time: {totalTime} min.</p>
                                <p>Ingredients:</p>
                                <ol>{ingredients.map(ingredient => (
                                    <li>{ingredient.text}</li>
                                ))}
                                </ol>
                            </ListItem>
                        </List>
                    </Collapse>
            </List>

        </div>

    );
}

export default Menus;