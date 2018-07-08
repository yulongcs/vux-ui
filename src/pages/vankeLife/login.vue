<template>
  <div class="vankelife-wrap">
    <h1 v-if="title && title.length">{{ title }}</h1>
    <p v-if="subTitle && subTitle.length" class="font-small text-lightgrey">{{ subTitle }}</p>
    <form class="vankelife-from">
      <group class="form-group-wrap" title="手机号">
        <x-input type="tel" placeholder="请输入手机号" mask="999 9999 9999" v-model="phone" :max="13" ref="phone" is-type="china-mobile" keyboard="number" required @on-change="FormValueChange"></x-input>
      </group>
      <group class="form-group-wrap" title="密码">
        <x-input placeholder="请设置密码" v-model="password" ref="password" required :min="6" :max="20" :type="pwdType" @on-change="FormValueChange">
          <img slot="label" @click="ChangePwdType" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/20x20/CCCCCC/000">
          <router-link class="primary" slot="right" to="/vankelife/resetpassword">忘记密码</router-link>
        </x-input>
      </group>
      <x-button action-type="button" type="lakeblue" :disabled="submitDisabled" @click.native="Login">登录</x-button>
      <div class="flex-between margin-top-1rem">
        <router-link to="/vankelife/login/vcode">验证码登录</router-link>
        <router-link to="/vankelife/register">注册</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { XInput, Group, XButton, Countdown } from 'vux';

const DefaultSendSmsTime = 90;

export default {
  name: 'vankeLife-login',
  data() {
    return {
      title: '密码登录',
      subTitle: '',
      phone: '',
      password: '',
      isStartSendSMS: false,
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
      if (refs.phone.valid && refs.password.valid) {
        this.$data.submitDisabled = false;
        return;
      }

      this.$data.submitDisabled = true;
    },
    FinishCountdown() {
      this.$data.isStartSendSMS = false;
      this.$data.SendSmsTime = DefaultSendSmsTime;
    },
    Login() {
      const params = {
        acctNum: this.$data.phone.replace(/[ ]/g, ''),
        password: this.$data.password,
        openID: '123456789',
      };

      this.$http.post('VankeLife/Login', params)
        .then((response) => {
          // window.location.href = response.data.result;
          console.log(response);
        }).catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
