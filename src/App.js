import React, {useEffect, useState} from "react";
import { makeStyles, Theme, createStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Menus from './Menus';
import './App.css';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles(() =>
  createStyles({
    form: {
        margin: '10px auto',        
    },
    input: {
      width: '70%',
      maxWidth: 200,
      height: '40px',
      margin: '0 5px',
      fontSize: '17px',
      textAlign: 'center',
    },
    btn: {
      fontSize: '17px',
      margin: '0 5px',
      padding: '10px'
    },
  }),
);

function App() {

  const APP_ID = "c2d8408d";
  const APP_KEY = "63f4e35e34280e381a49ebb618139872";

  const [menus, setMenus] = useState([]);
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('chicken');
  const [selected, setSelected] = useState(false);

  const classes = useStyles();

  //useEffect(()=>{
  //  fetchMenus();
 // }, [query]);
    
  useEffect(() => { 
    if(selected === true){
      const timer = setTimeout(() => {
        fetchMenus();
        //console.log('fetch was delayed'); 
      }, 5000);
      return () => clearTimeout(timer);
    }else{fetchMenus();}   
  }, [query]);

  const fetchMenus = async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setMenus(data.hits);
    //console.log(data.hits);
  };
  
  const updateFilter = e =>{
    setFilter(e.target.value);
  };
  
  const getFilter = e =>{
    e.preventDefault();
    setQuery(filter);
    setFilter('');   
  };

  return (
    <div className="App">
      <h1>TODAY'S MENU</h1>
      <form onSubmit={getFilter} className={classes.form}>
        <input className={classes.input} type="text" value={filter} onChange={updateFilter}/>
        <button className={classes.btn} type="submit">Filter</button>
        <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}>
          <CheckIcon />
        </ToggleButton>      
      </form>
        {menus.map(menu =>(
            <Menus 
              key={menu.recipe.label}
              label={menu.recipe.label} 
              calory={menu.recipe.calories}
              pic={menu.recipe.image}
              totalTime={menu.recipe.totalTime}
              ingredients={menu.recipe.ingredients}
            /> 
        ))}
    </div>
  );
}

export default App;
