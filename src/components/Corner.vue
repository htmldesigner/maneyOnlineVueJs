<template>
  <div class="corner" :style="{height: height, width: width}">
    <div class="top d-flex justify-content-between">
      <div class="top-left">
        <div class="corner-box vertical" :style="{backgroundColor: color}"></div>
        <div class="corner-box horizontal" :style="{backgroundColor: color}"></div>
      </div>

      <div class="top-right">
        <div class="corner-box vertical" :style="{backgroundColor: color}"></div>
        <div class="corner-box horizontal" :style="{backgroundColor: color}"></div>
      </div>
    </div>

    <div class="bottom d-flex justify-content-between">
      <div class="bottom-left">
        <div class="corner-box vertical" :style="{backgroundColor: color}"></div>
        <div class="corner-box horizontal" :style="{backgroundColor: color}"></div>
      </div>

      <div class="bottom-right">
        <div class="corner-box vertical" :style="{backgroundColor: color}"></div>
        <div class="corner-box horizontal" :style="{backgroundColor: color}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Corner",
  props: {
    top: {
      type: String,
    },
    height: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    color: {
      type: String,
    }
  }
}
</script>

<style scoped>
.corner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  height: 180px;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.corner-box {
  width: 2px;
  height: 20px;
  background-color: red;
  display: inline-block;
}

.top-left, .top-right, .bottom-left, .bottom-right {
  position: relative;
  width: 20px;
  height: 20px;
}

.top-left .corner-box.vertical {
  transform: rotate(90deg);
  position: absolute;
  left: 9px;
  top: -9px;
  bottom: 0;
  right: 0;
}

.top-right .corner-box.vertical {
  transform: rotate(90deg);
  position: absolute;
  left: 9px;
  top: -9px;
  bottom: 0;
  right: 0px;
}

.top-right .corner-box.horizontal {
  position: absolute;
  left: 18px;
}

.bottom-left .corner-box.vertical {
  transform: rotate(90deg);
  position: absolute;
  left: 9px;
  bottom: -10px;
}


.bottom-right .corner-box.vertical {
  position: absolute;
  right: 0;
  top: 0;
}

.bottom-right .corner-box.horizontal {
  transform: rotate(90deg);
  position: absolute;
  right: 9px;
  bottom: -10px;
}
</style>