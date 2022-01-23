import React, {Fragment, useState, useEffect} from "react";
import { toast } from 'react-toastify';

// components
import InputToDo from "./todolist/InputToDo";
import ListToDos from "./todolist/ListTodos";


const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    const getName = async () =>
    {
        try {
            const response = await fetch("http://localhost:80/dashboard/", {method: "GET", headers: {token: localStorage.token}});

            const parseData = await response.json();

            setName(parseData[0].user_name);
            setAllTodos(parseData);

        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);

        toast.success("Logged out successfully!");
    };

    useEffect(() => {
        getName();
        setTodosChange(false);
    }, [todosChange]);

    return(
        <Fragment>
            <div className="d-flex mt-5 justify-content-around">
                <h1> {name} 's Todo List  </h1>
                <button className="btn btn-primary"onClick={(event)=> logout(event)}> Logout </button>
            </div>
            <InputToDo setTodosChange = {setTodosChange} />
            <ListToDos allTodos = {allTodos} setTodosChange = {setTodosChange}/>
        </Fragment>
    );
};

export default Dashboard;