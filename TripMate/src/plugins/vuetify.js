import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// VCalendar 컴포넌트를 가져오기
import { VCalendar } from 'vuetify/labs/VCalendar'

export default createVuetify({
  // 이전에 등록된 컴포넌트와 디렉티브를 components와 directives 객체에 추가
  components: {
    ...components,
    VCalendar, // VCalendar 컴포넌트 추가
  },
  directives: {
    ...directives,
  },
})
