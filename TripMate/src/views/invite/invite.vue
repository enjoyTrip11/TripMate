<template>
    <v-container>
      <InvitationCard 
        message="당신을 저희의 특별한 행사에 초대합니다!" 
        @accept="handleAccept"
        @reject="handleReject"
      />
    </v-container>
  </template>
  
  <script>
  import InvitationCard from '@/components/invite/letter.vue'
  
  export default {
    components: {
      InvitationCard
    },
    methods: {
      handleAccept() {
        console.log('Invitation accepted');
        // 승낙했을 때의 동작
      },
      handleReject() {
        console.log('Invitation rejected');
        // 거절했을 때의 동작
      }
    }
  }
  </script>
  
  <style scoped>
  /* 필요시 스타일 추가 */
  </style>
  