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
    listItem: {
        padding: theme.spacing(4),
        margin: '20px',
        borderRadius: '5px',
        boxShadow: "15px 5px 25px 0px rgba(0, 0, 0, 0.69)",
    },
    pic1: {
        width: '10%',
        minWidth: 100,
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

function Menus({label, calory, pic, totalTime, ingredients}){
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
      };
      
    var roundCalory = Math.round(calory); 
    
    return(
        <div>
            <List className={classes.listItem}>
                <img className={classes.pic1} src={pic} alt="" />
                <h2>{label}</h2>                            
                                   
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