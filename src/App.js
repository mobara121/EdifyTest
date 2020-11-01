import React, {useEffect, useState} from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Menus from './Menus';
import './App.css';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles(() =>
  createStyles({  
    title:{
      fontSize: '40px',
      color: '#fff',
    },
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
    togglebtn: {
      backgroundColor: '#fff',
      height: '5px', 
      textAlign: 'left',
      width: '250px',
      marginRight: '10px'
    },
    '@global': {
      '.MuiToggleButton-root:hover':{
        backgroundColor: '#fff',
        width: '250px',
      },
      '.MuiToggleButton-root.Mui-selected, .MuiToggleButton-root.Mui-selected:hover': {
        backgroundColor: 'pink',
        color: 'red'
      }},
  }),
);

function App() {
  const APP_ID = "c2d8408d";
  const APP_KEY = "63f4e35e34280e381a49ebb618139872";
  const [menus, setMenus] = useState([]);
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('tofu');
  const [selected, setSelected] = useState(false);
  const classes = useStyles();
  
  useEffect(() => { 
  const fetchMenus = async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setMenus(data.hits);
  };  
    
    if(selected === true){
      const timer = setTimeout(() => {
        fetchMenus();
      }, 2000);
      return () => clearTimeout(timer);
    }else{
      fetchMenus();
    }   
  }, [query, selected]);  
  
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
      <h1 className={classes.title}>TODAY'S MENU</h1>
      <form onSubmit={getFilter} className={classes.form}>
        <input className={classes.input} type="text" value={filter} onChange={updateFilter}/>
        <button className={classes.btn} type="submit">Search</button>              
      </form>
      <ToggleButton
          className={classes.togglebtn}
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}>
          <span>click for fetch delay</span>
      </ToggleButton>    
     {menus && menus.map((menu) => {
         return <Menus 
          key={menu.recipe.uri}
          label={menu.recipe.label}
              calorie={menu.recipe.calories}
              pic={menu.recipe.image}
              totalTime={menu.recipe.totalTime}
              ingredients={menu.recipe.ingredients}
              />;
        })}     
    </div>
  );
}

export default App;
