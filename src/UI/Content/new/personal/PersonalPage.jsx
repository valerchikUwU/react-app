import React, { useState, useEffect } from "react";
import classes from "./PersonalPage.module.css";
import book from "../image/book.svg";
import { MuiSwitchLarge } from "../customUi/MuiSwitch";
import CustomStyledCheckbox from "../customUi/CustomStyledCheckbox";
import classNames from "classnames";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../../../BLL/productSlice";
import { getWork, putOrders } from "../../../../BLL/workSlice";

export default function PersonalPage() {
  const [checkedStates, setCheckedStates] = useState({});
  const [checked1States, setChecked1States] = useState({});
  const [isDisabledStates, setIsDisabledStates] = useState({});
  const [countStates, setCountStates] = useState({});
  const [isCheckedBoxStates, setIsCheckedBoxStates] = useState({});

  const handleChange = (orderId, event) => {
    setCheckedStates({ ...checkedStates, [orderId]: event.target.checked });
  };

  const handleChange1 = (orderId, event) => {
    setChecked1States({ ...checked1States, [orderId]: event.target.checked });
  };

  const handleClick = (
    orderId,
    order,
    productId,
    accessType,
    generation,
    addBooklet,
    quantity
  ) => {
    if (countStates[orderId] > 0) {
      setIsDisabledStates({ ...isDisabledStates, [orderId]: true });

      // dispatch(
      //   addWork({
      //     order: order,
      //     accessType: accessType,
      //     generation: generation,
      //     addBooklet: addBooklet,
      //     quantity: quantity,
      //   })
      // );
      dispatch(
        putOrders({
          accountId: accountId,
          productData: {
            productId: productId,
            accessType: accessType,
            generation: generation,
            addBooklet: addBooklet,
            quantity: quantity,
          },
        })
      ).then(()=>{
        dispatch(getWork(accountId));
      });
    }
  };

  const increment = (orderId) => {
    setCountStates({
      ...countStates,
      [orderId]: (countStates[orderId] || 0) + 1,
    });
  };

  const decrement = (orderId) => {
    setCountStates({
      ...countStates,
      [orderId]: countStates[orderId] > 0 ? countStates[orderId] - 1 : 0,
    });
  };

  const [isHidden, setIsHidden] = useState({});

  const handleCheckboxChange = (orderId, event) => {
    setIsCheckedBoxStates({
      ...isCheckedBoxStates,
      [orderId]: event.target.checked,
    });

    setIsHidden({
      ...isHidden,
      [orderId]: event.target.checked,
    });
  };

  const dispatch = useDispatch();
  const { accountId } = useParams();
  useEffect(() => {
    dispatch(getProducts({ accountId: accountId, typeId: "3" }));
  }, [accountId]);

  const orders = useSelector((state) => state.products.productsStart);

  return (
    <Grid
      sx={{ mt: "1px" }}
      container
      rowSpacing={2}
      columnSpacing={5}
      className={classes.scroll}
    >
      {orders.map((order) => (
        <Grid item key={order.id}>
          <div className={classes.block}>
            <div className={classes.cartGrid}>
              <img src={book} alt="book" className={classes.book} />
              <div className={classes.nameText}>{order.abbreviation}</div>
              <div className={classes.nameParentText}>{order.name}</div>
              <hr></hr>
              <div className={classes.containerPaper}>
                <span
                  style={{
                    marginRight: "20px",
                    opacity: isHidden[order.id] ? 0.5 : 1,
                  }}
                  className={
                    checkedStates[order.id]
                      ? classes.typeBookPaper
                      : classes.typeBookPaperChange
                  }
                >
                  Бумажный
                </span>
                <MuiSwitchLarge
                  checked={checkedStates[order.id] || false}
                  onChange={(event) => handleChange(order.id, event)}
                  disabled={isCheckedBoxStates[order.id] || false}
                  className="disabled-switch"
                  style={{ opacity: isHidden[order.id] ? 0.5 : 1 }}
                ></MuiSwitchLarge>
                <span
                  className={classNames(
                    classes.right,
                    checkedStates[order.id]
                      ? classes.typeBookPaperChange
                      : classes.typeBookPaper,
                  )}

                  style={{
                    opacity: isHidden[order.id] ? 0.5 : 1,
                  }}
                >
                  Электронный
                </span>
              </div>
              <hr></hr>
              <div className={classes.containerBook}>
                <span
                  className={
                    checked1States[order.id]
                      ? classes.BookChecked
                      : classes.BookUnChecked
                  }
                >
                  Первое поколение
                </span>
                <MuiSwitchLarge
                  checked={checked1States[order.id] || false}
                  onChange={(event) => handleChange1(order.id, event)}
                ></MuiSwitchLarge>
                <span
                  className={classNames(
                    checked1States[order.id]
                      ? classes.BookUnChecked
                      : classes.BookChecked,
                    classes.right
                  )}
                >
                  Второе поколение
                </span>
              </div>
              <hr></hr>
              <div className={classes.containerButton}>
                <CustomStyledCheckbox
                  className={classes.bookletCheck}
                  checked={isCheckedBoxStates[order.id] || false}
                  onChange={(event) => handleCheckboxChange(order.id, event)}
                ></CustomStyledCheckbox>
                <span className={classes.booklet}>Доп. буклет</span>
                <button
                  className={
                    isDisabledStates[order.id]
                      ? classes.buttonCartDisabled
                      : classes.buttonCart
                  }
                  onClick={() =>
                    handleClick(
                      order.id,
                      order,
                      order.id,
                      checkedStates[order.id] ? "Электронный" : "Бумажный",
                      checked1States[order.id]
                        ? "Второе поколение"
                        : "Первое поколение",
                      isCheckedBoxStates[order.id],
                      countStates[order.id]
                    )
                  }
                  disabled={isDisabledStates[order.id]}
                >
                  В корзину
                </button>
                <button
                  className={classNames(
                    isDisabledStates[order.id]
                      ? classes.arrowCartDisabled
                      : classes.arrowCart
                  )}
                  disabled={isDisabledStates[order.id]}
                >
                  <span className={classes.count}>
                    {countStates[order.id] || 0}
                  </span>
                  <svg
                    className={classes.svgUp}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => increment(order.id)}
                  >
                    <g clip-path="url(#clip0_247_8322)">
                      <path d="M8.5 7L6 4.5L3.5 7L8.5 7Z" fill="white" />
                    </g>
                    <path
                      d="M11.75 11.75L0.25 11.75V5C0.25 2.37665 2.37665 0.25 5 0.25H7C9.62335 0.25 11.75 2.37665 11.75 5V11.75Z"
                      stroke="white"
                      stroke-width="0.5"
                    />
                    <defs>
                      <clipPath id="clip0_247_8322">
                        <path
                          d="M12 12L0 12V5C0 2.23858 2.23858 0 5 0H7C9.76142 0 12 2.23858 12 5V12Z"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <svg
                    className={classes.svgDown}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => decrement(order.id)}
                  >
                    <g clip-path="url(#clip0_247_8313)">
                      <path d="M3.5 5L6 7.5L8.5 5H3.5Z" fill="white" />
                    </g>
                    <path
                      d="M0.25 0.25H11.75V7C11.75 9.62335 9.62335 11.75 7 11.75H5C2.37665 11.75 0.25 9.62335 0.25 7V0.25Z"
                      stroke="white"
                      stroke-width="0.5"
                    />
                    <defs>
                      <clipPath id="clip0_247_8313">
                        <path
                          d="M0 0H12V7C12 9.76142 9.76142 12 7 12H5C2.23858 12 0 9.76142 0 7V0Z"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
