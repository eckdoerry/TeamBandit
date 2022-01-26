import {useState, React} from "react"


const Test = () => {
    const [name, changeName] = useState("Max");

    const changeNameHandler = (text) => {
        changeName(text)
    }

    return (
        <div>
            <button onClick={() => {
                                changeNameHandler("Quinn");
                            }}>
                Change Name
            </button>

            <p1>
                {name}
            </p1>
        </div>
    )
}

export default Test;