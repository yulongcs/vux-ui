<template>
  <div class="vankelife-wrap">
    <h1>{{ title }}</h1>
    <p class="font-small text-lightgrey">{{ subTitle }}</p>
    <form id="login-phone-form" class="vankelife-from">
      <group class="form-group-wrap" title="手机号">
        <x-input type="tel" placeholder="请输入手机号" mask="999 9999 9999" v-model="phone" :max="13" ref="phone" is-type="china-mobile" keyboard="number" required @on-change="FormValueChange"></x-input>
      </group>
      <group class="form-group-wrap" title="验证码">
       <x-input type="number" class="weui-vcode" mask="999999" placeholder="请输入验证码" required :min="6" :max="6" keyboard="number" v-model="vcode" ref="vcode" @on-change="FormValueChange">
        <x-button action-type="button" slot="right" type="lakeblue" mini v-show="!isStartSendSMS" :disabled="!rightPhone" @click.native="SendingSMS">获取验证码</x-button>
        <x-button action-type="button" slot="right" type="lakeblue" v-show="isStartSendSMS" disabled plain mini>
          (<countdown v-model="SendSmsTime" :start="isStartSendSMS" @on-finish="FinishCountdown"></countdown>)秒后重新获取
        </x-button>
      </x-input>
      </group>
      <group class="form-group-wrap" title="密码">
        <x-input placeholder="请设置密码" v-model="password" ref="password" required :min="6" :max="20" :type="pwdType" @on-change="FormValueChange">
          <img slot="label" @click="ChangePwdType" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/20x20/CCCCCC/000">
        </x-input>
      </group>
      <x-button type="lakeblue" action-type="button" :disabled="submitDisabled" @click.native="Register">注册</x-button>
      <div class="flex-between margin-top-1rem font-small">
        <span>点击注册即同意<a class="primary" href="https://wh.m.life.vanke.com/protocol" target="_blank">《万生活用户协议》</a></span>
        <router-link to="/vankelife/login">密码登录</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { XInput, Group, XButton, Countdown } from 'vux';
import '../../assets/css/vankelife.less';


const DefaultSendSmsTime = 90;

const RegisterContentData = {
  title: '注册',
  subTitle: '',
  phone: '13861712804',
  password: '123456789',
  vcode: '',
  isStartSendSMS: false,
  rightPhone: false,
  SendSmsTime: DefaultSendSmsTime,
  pwdType: 'password',
  submitDisabled: true,
};

export default {
  name: 'vankeLife-register',
  data() {
    return RegisterContentData;
  },
  components: {
    XInput,
    Group,
    XButton,
    Countdown,
  },
  methods: {
    SendingSMS() {
      this.$options.methods.StartCountdown.bind(this)();
      const params = {
        phoneNum: this.$data.phone.replace(/[ ]/g, ''),
      };
      this.$http.post('VankeLife/SendVerificationCode', params)
        .then((response) => {
          console.log(response);
          // window.location.href = response.data.result;
        }).catch((error) => {
          console.error(error);
        });
    },
    StartCountdown() {
      this.$data.isStartSendSMS = true;
    },
    ChangePwdType() {
      this.$data.pwdType = this.$data.pwdType === 'password' ? 'text' : 'password';
    },
    FormValueChange() {
      const refs = this.$refs;
      if (refs.phone.valid) {
        this.$data.rightPhone = true;
        if (refs.vcode.valid && refs.password.valid) {
          this.$data.submitDisabled = false;
          return;
        }
      }

      this.$data.submitDisabled = true;
    },
    FinishCountdown() {
      this.$data.isStartSendSMS = false;
      this.$data.SendSmsTime = DefaultSendSmsTime;
    },
    Register() {
      const params = {
        acctNum: this.$data.phone,
        verCode: this.$data.vcode,
      };

      this.$http.post('VankeLife/CreateAccount', params)
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
