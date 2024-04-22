import React from "react";
import { useState } from "react";
import classes from "./StartPage.module.css";
import book from "../image/book.svg";
import { MuiSwitchLarge } from "./MuiSwitch";
import CustomStyledCheckbox from "./CustomStyledCheckbox";
import classNames from "classnames";
import { Grid } from "@mui/material";
export default function StartPage() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [checked1, setChecked1] = useState(false);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };

  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = () => {
    if (count > 0) {
      setIsDisabled(true);
    }
  };

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <Grid
      sx={{ mt: "1px" }}
      container
      rowSpacing={2}
      columnSpacing={5}
      className={classes.scroll}
    >
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
      <Grid item>
        <div className={classes.block}>
          <div className={classes.cartGrid}>
            <img src={book} alt="book" className={classes.book} />

            <div className={classes.nameText}>КОК</div>

            <div className={classes.nameParentText}>
              Как организовать компанию
            </div>
            <hr></hr>

            <div className={classes.containerPaper}>
              <span
                style={{ marginRight: "20px" }}
                className={
                  checked ? classes.typeBookPaper : classes.typeBookPaperChange
                }
              >
                Бумажный
              </span>
              <MuiSwitchLarge
                checked={checked}
                onChange={handleChange}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  classes.right,
                  checked ? classes.typeBookPaperChange : classes.typeBookPaper
                )}
              >
                Электронный
              </span>
            </div>
            <hr></hr>

            <div className={classes.containerBook}>
              <span
                className={
                  checked1 ? classes.BookChecked : classes.BookUnChecked
                }
              >
                Первое поколение
              </span>
              <MuiSwitchLarge
                checked={checked1}
                onChange={handleChange1}
              ></MuiSwitchLarge>
              <span
                className={classNames(
                  checked1 ? classes.BookUnChecked : classes.BookChecked,
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
              ></CustomStyledCheckbox>
              <span className={classes.booklet}>Доп. буклет</span>

              <button
                className={
                  isDisabled ? classes.buttonCartDisabled : classes.buttonCart
                }
                onClick={handleClick}
                disabled={isDisabled}
              >
                В корзину
              </button>

              <button
                className={classNames(
                  isDisabled ? classes.arrowCartDisabled : classes.arrowCart
                )}
                disabled={isDisabled}
              >
                <span className={classes.count}>{count}</span>
                <svg
                  className={classes.svgUp}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={increment}
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
                  onClick={decrement}
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
    </Grid>
  );
}
