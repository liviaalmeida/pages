<template>
  <div class="coffee">
    <div class="coffee-liquid" />
    <div class="coffee-mug">
      <div class="coffee-cup" />
      <div class="coffee-wing" />
    </div>
    <div class="coffee-plate" />
  </div>
</template>

<style lang="scss" scoped>
@function gray($rgb) {
  @return rgb($rgb, $rgb, $rgb);
}

@mixin coffee-static {
  height: 40px;
  width: 80px;
  left: 25px;
}

.coffee {
  padding-top: 50px;
  position: relative;
  width: 130px;
}

.coffee-liquid {
  animation: fill-cup 2s linear 0s infinite alternate;
  background-color: rgb(55, 45, 45);
  border-radius: 50%;
  transform-origin: bottom center;
  z-index: 101;
  height: 5px;
  width: 40px;
  position: absolute;
  bottom: 80px;
  left: 45px;

  &--static {
    @include coffee-static;
    animation: none;
  }
}

.coffee-cup {
  background-color: gray(249);
  border: 1px solid gray(230);
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-top: none;
  z-index: 100;
  height: 80px;
  width: 99px;
  position: absolute;
  bottom: 28px;
  left: 15px;

  &::before {
    border-left: 5px solid gray(230);
    border-bottom-left-radius: 30%;
    content: '';
    display: block;
    margin-left: 10px;
    width: 20px;
    height: 60px;
  }

  &::after {
    background-color: gray(250);
    border: 1px solid gray(230);
    border-radius: 50%;
    content: '';
    display: block;
    width: 98px;
    height: 50px;
    position: absolute;
    bottom: 50px;
    left: -1px;
  }
}

.coffee-wing {
  background-color: transparent;
  border: 12px solid gray(250);
  border-radius: 50%;
  margin: auto;
  z-index: 99;
  height: 40px;
  width: 40px;
  position: absolute;
  bottom: 60px;
  right: -12px;
}

.coffee-plate {
  background-color: gray(245);
  border-radius: 50%;
  box-shadow: -5px 5px 5px 0px rgba(gray(50), .6);
  position: relative;
  z-index: 98;
  height: 80px;
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    background-color: gray(235);
    border-radius: 50%;
    border: 0px solid transparent;
    border-bottom: 1px solid rgba(gray(100), .6);
    border-left: 10px solid rgba(gray(100), .6);
    display: block;
    height: 40px;
    width: 70px;
  }
}

@keyframes fill-cup {
  100% {
    @include coffee-static;
  }
}
</style>
