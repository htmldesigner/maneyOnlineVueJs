<template>
 <div class="mesgs">
  <div class="msg_history">

   <div class="incoming_msg border-bottom d-flex align-items-center mb-5 pb-4 techpodderjka">
    <div class="incoming_msg_img mr-3"><img src="@/assets/image/msg-icon.svg" alt="sunil"></div>
    <div class="received_msg">
     <div class="received_withd_msg">
      <p class="p-0">Тех.поддержка</p>
     </div>
    </div>
   </div>

   <div v-for="(message, index) in messages" :key="index">

    <div class="outgoing_msg" v-if="message.sender === 'user'">
     <div class="sent_msg">
      <span class="time_date text-right">{{moment(message.created_at).format('HH:mm DD MMM YYYY')}}</span>
      <p class="text-right">{{message.message}}</p>
     </div>
    </div>

    <div v-else class="incoming_msg mb-4">
     <div class="incoming_msg_img mr-3"><img src="@/assets/image/msg-icon.svg" alt="sunil"></div>
     <div class="received_msg">
      <div class="received_withd_msg">
       <span class="time_date">Тех.поддержка {{moment(message.created_at).format('HH:mm DD MMM YYYY')}}</span>
       <p>{{message.message}}</p>
      </div>
     </div>
    </div>

   </div>

  </div>

  <div class="type_msg">
   <div class="mt-3 pr-5">
    <input type="text" class="form-control" v-model.trim="message" placeholder="Напишите сообщение">
    <button class="msg_send_btn" @click="onSubmit"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
   </div>
  </div>

 </div>
</template>

<script>
 export default {
  name: "Feedback",
  data() {
   return {
    message: ''
   }
  },
  computed: {
   messages() {
    return this.$store.getters.getSupportMessage
   }
  },
  methods: {
   onSubmit() {
    this.$store.dispatch('sendMessageToSupport', {message: this.message})
    this.message = ''
   }
  },
 }
</script>

<style scoped>

</style>