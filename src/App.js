import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { itemName: "Phone", quantity: 1, isSelected: false },
    { itemName: "Laptop", quantity: 1, isSelected: false },
    { itemName: "Tablet", quantity: 1, isSelected: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [total, setTotal] = useState(3);
  const [isSelected, setIsSelected] = useState(false);


  const inputuseRef = useRef(null);

  useEffect(() => {
    inputuseRef.current.focus();
  });
  

  const addBottonHandler = () => {
   
    const newItems = {
        itemName: inputValue,
        quantity: 1,
        isSelected: false,
    };
    
    
    const newValue = [...items, newItems];
    setItems(newValue);
    totalCount();
    setInputValue("");

  };
  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const selectHandler = (index) => {
    const selectChange = [...items];
    selectChange[index].isSelected = !selectChange[index].isSelected;
    setItems(selectChange);
  };
  const decreaseHandler = (index) => {
    const newValue = [...items];
    newValue[index].quantity++;
    setItems(newValue);
    totalCount();
  }
   const increaseHandler = (index) => {
     const newValue = [...items];
    newValue[index].quantity--;
     setItems(newValue);
     totalCount();
  }
const totalCount = () => {
      const totalCountQuantity = items.reduce((total, item) => {
         return total + item.quantity;
        }, 0)
        setTotal(totalCountQuantity)
      };
  return (
    <section className="section">
      <div className="Container">
        <div className="AddList">
          <input
            onChange={inputHandler}
            value={inputValue}
            type="text"
            Placeholder="Add your item"
            ref={inputuseRef}
          />

          <div onClick={addBottonHandler} className="Add-botton">
            {inputValue ? (<i class="fas fa-plus"></i>) : ('') }
            
          </div>
        </div>
        {items.map((item, index) => {
          const { itemName, quantity, isSelected } = item;
          return (
            <>
              <div className="CheckBox" key={index}>
                <div  onClick={() => selectHandler(index)}>
                  {isSelected ? (
                  <span className="Completed">
                    <input type="checkbox" />
                    {itemName}
                  </span>
                ) : (
                  <span className="Uncompleted">
                    <input type="checkbox" />
                    {itemName}
                  </span>
                )}
                </div>
                <div className="Countcounainer">
                  <div
                    onClick={() => {
                      increaseHandler(index);
                    }}
                    className="left-chevron"
                  >
                    <i class="fas fa-chevron-left"></i>
                  </div>
                  <div className="Counter">{quantity}</div>
                  <div
                    onClick={() => {
                      decreaseHandler(index);
                    }}
                    className="right-chevron"
                  >
                    <i class="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            </>
          );
        })}

        <div className="TotalCount">
          <h3>Total : { total }</h3>
        </div>
      </div>
    </section>
  );
}

export default App;
