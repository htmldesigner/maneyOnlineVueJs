<template>
  <div>
    <div class="photo-module d-flex flex-column align-items-center">

      <p>{{ title }}</p>

      <div class="camera" :style="{width: widthCss + 'px'}">
        <video :style="{width: widthCss + 'px', height: heightCss + 'px'}" :id="`video-${this._uid}`">Камера не
          доступна.
        </video>

        <Corner
            :height="corner.height"
            :width="corner.width"
            :color="corner.color"
        />

        <div class="output" :id="`output-${this._uid}`"></div>
      </div>

      <canvas class="canvas" :id="`canvas-${this._uid}`"></canvas>

      <div class="photo-navigation d-flex justify-content-around" style="min-width: 320px">
        <button class="btn btn-lg btn-primary" v-if="!front && !image" @click.prevent="front = !front">Фронтальная камера</button>
        <button class="btn btn-lg btn-primary" v-if="front && !image" @click.prevent="front = !front">Задняя камера</button>
        <button class="btn btn-lg btn-primary" v-if="!image" @click.prevent="makePhoto">Фото</button>
        <button class="btn btn-lg btn-primary" v-else @click.prevent="clearPhoto">Очистить</button>
      </div>

    </div>

  </div>

</template>

<script>
import Corner from "./Corner";

export default {
  name: "Biometry",
  components: {Corner},
  props: {
    title: {
      type: String,
      required: true
    },
    corner: {
      type: Object
    },
    widthCss: {
      type: Number
    },
    heightCss: {
      type: Number
    }

  },

  data() {
    return {
      width: 640,
      height: 0,

      video: null,
      canvas: null,
      front: false,
      output: null,
      image: null,
      photoContainer: null,
      streaming: false,
      stream: null
    }
  },

  watch: {
    front: {
      handler() {
        this.stopStream()
        this.startup()
      }
    }
  },

  methods: {
    stopStream() {
      if (this.stream) {
        this.stream.getTracks().forEach(function (track) {
          track.stop()
        });
      }
    },

    async startup() {

      try {
        this.stream = await navigator.mediaDevices.getUserMedia(
            {
              video: {
                facingMode: (this.front ? "user" : "environment")
              },
              audio: false
            })
        this.video.srcObject = this.stream
        this.video.play()

        this.video.addEventListener('canplay', (event) => {
          if (!this.streaming) {
            this.height = this.video.videoHeight / (this.video.videoWidth / this.width)
            this.video.setAttribute('width', this.width)
            this.video.setAttribute('height', this.height)
            this.canvas.setAttribute('width', this.width * 2)
            this.canvas.setAttribute('height', this.height * 2)
            this.streaming = true
          }
        }, false);

      } catch (err) {
        console.log("An error occurred: " + err);
      }
    },


    clearPhoto() {
      this.stopStream()
      this.startup()
      const context = this.canvas.getContext('2d');
      this.image = null
      context.clearRect(0, 0, this.width, this.height)
      this.photoContainer.setAttribute('src', this.image)
      document.getElementById(`img-${this._uid}`).remove()
      this.$emit('onClear')
    },

    makePhoto() {
      this.photoContainer?.remove()
      const context = this.canvas.getContext('2d')
      if (this.height && this.width) {

        this.canvas.width = this.width;
        this.canvas.height = this.height

        context.drawImage(this.video, this.widthCss - this.width / 2, 0, this.width, this.height)
        this.image = this.canvas.toDataURL('image/png')
        if (this.image) {
          this.output = document.getElementById(`output-${this._uid}`)
          this.photoContainer = new Image(this.width / 2, this.height / 2)
          this.photoContainer.setAttribute('id', `img-${this._uid}`)
          this.photoContainer.setAttribute('src', this.image)
          this.output.appendChild(this.photoContainer)
        }
      }
      this.stopStream()
      this.$emit('onImage', this.image)
    }
  },

  mounted() {
    this.video = document.getElementById(`video-${this._uid}`)
    this.canvas = document.getElementById(`canvas-${this._uid}`)
    this.startup()
  }

}
</script>

<style scoped>
.photo-module p {
  font-family: 'Open Sans Bold';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #000000;
  margin-bottom: 6px;
}

.canvas {
  display: none;
}

.camera {
  position: relative;
  width: 320px;
}

video {
  width: 320px;
  height: 240px;
  object-fit: cover;
}

.output {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;

}

.output img {

}


</style>
