<template>
  <div>

    <div v-if="img" class="image_container" style="margin-bottom: 10px">
      <img :src="img" class="img-responsive"/>
    </div>

    <div v-show="!img" class="camera_container">
      <Corner
          :height="corner.height"
          :width="corner.width"
          :color="corner.color"
      />
      <vue-web-cam
          ref="webcam"
          :device-id="deviceId"
          width="100%"
          height="auto"
          @cameras="onCameras"
          @error="onError"
          @started="onStarted"
          @stopped="onStopped"
          @camera-change="onCameraChange"
      />
    </div>


    <div class="input-group mt-1 mb-1">
      <select v-model="camera" class="custom-select w-100">
        <option disabled>-- Выбирите камеру --</option>
        <option
            v-for="device in devices"
            :key="device.deviceId"
            :value="device.deviceId"
        >{{ device.label }}
        </option>
      </select>
    </div>

    <div class="action_group d-flex justify-content-center">
      <button type="button" class="btn btn-lg btn-primary m-1" @click="onCapture">Сделать фото</button>
      <button type="button" class="btn btn-lg btn-primary m-1" @click="removeCapture">Очистить</button>
    </div>

  </div>
</template>

<script>
import {WebCam} from "vue-web-cam";
import Corner from "./Corner";

export default {
  name: "Camera",
  components: {
    "vue-web-cam": WebCam, Corner
  },
  props: {
    corner: {
      type: Object
    },
  },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: []
    };
  },
  computed: {
    device: function () {
      return this.devices.find(n => n.deviceId === this.deviceId);
    }
  },
  watch: {
    camera: function (id) {
      this.deviceId = id;
    },
    devices: function () {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  methods: {
    async onCapture() {
      this.img = this.$refs.webcam.capture();
      this.$emit('onImage', this.img)
      this.onStop()
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },

    removeCapture() {
      this.img = null
      this.$emit('onClear')
      this.onStart()
    },

    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      console.log('onStop')
      this.$refs.webcam.stop();
    },
    onStart() {
      console.log('onStart')
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    }
  }
};
</script>
<style scoped>
.camera_container{
  position: relative;
}
</style>