import styled from "styled-components";

export const MultiRangeSliderContainer = styled.div`
  .container {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider {
    position: relative;
    width: 95%;
  }

  .slider__track,
  .slider__range,
  .slider__left-value,
  .slider__right-value {
    position: absolute;
  }

  .slider__track,
  .slider__range {
    border-radius: 3px;
    height: 5px;
  }

  .slider__track {
    background-color: #ced4da;
    width: 100%;
    z-index: 1;
  }

  .slider__range {
    background-color: #009ba1;
    z-index: 2;
  }

  .slider__left-value,
  .slider__right-value {
    color: #009ba1;
    font-size: 12px;
    margin-top: 20px;
  }

  .slider__left-value {
    left: 6px;
  }

  .slider__right-value {
    right: -4px;
  }

  /* Removing the default appearance */
  .thumb,
  .thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  .thumb {
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 95%;
    outline: none;
  }

  .thumb--left {
    z-index: 3;
  }

  .thumb--right {
    z-index: 4;
  }

  /* For Chrome browsers */
  .thumb::-webkit-slider-thumb {
    background-color: #009BA1;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }

  /* For Firefox browsers */
  .thumb::-moz-range-thumb {
    background-color: #009BA1;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;
