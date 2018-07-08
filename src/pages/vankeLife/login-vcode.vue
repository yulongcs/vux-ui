<template>
  <div class="vankelife-wrap">
    <h1 v-if="title && title.length">{{ title }}</h1>
    <p v-if="subTitle && subTitle.length" class="font-small text-lightgrey">{{ subTitle }}</p>
    <form class="vankelife-from">
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
      <x-button type="lakeblue" action-type="button" :disabled="submitDisabled" @click.native="Login">登录</x-button>
      <div class="flex-between margin-top-1rem font-small">
        <router-link to="/vankelife/login">密码登录</router-link>
        <router-link to="/vankelife/register">注册</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { XInput, Group, XButton, Countdown } from 'vux';

const DefaultSendSmsTime = 90;

export default {
  name: 'vankeLife-login-vcode',
  data() {
    return {
      title: '短信快捷登录',
      subTitle: '验证即登录，未注册将自动创建万生活帐号',
      phone: '',
      vcode: '',
      isStartSendSMS: false,
      isSendedSMS: false,
      rightPhone: false,
      SendSmsTime: DefaultSendSmsTime,
      pwdType: 'password',
      submitDisabled: true,
    };
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
      this.$data.pwdType =
        this.$data.pwdType === 'password' ? 'text' : 'password';
    },
    FormValueChange() {
      const refs = this.$refs;
      if (refs.phone.valid) {
        this.$data.rightPhone = true;
        if (refs.vcode.valid) {
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
    Login() {
      const params = {
        acctNum: this.$data.phone,
        verCode: this.$data.vcode,
      };

      this.$http.post('VankeLife/LoginWithVerificationCode', params)
        .then((response) => {
          window.location.href = response.data.result;
        }).catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
