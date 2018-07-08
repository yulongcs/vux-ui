import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import VankeLifeRegister from '@/pages/vankeLife/register';
import VankeLifeLogin from '@/pages/vankeLife/login';
import VankeLifeLoginVcode from '@/pages/vankeLife/login-vcode';
import VankeLifeResetpassword from '@/pages/vankeLife/resetpassword';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/vankelife/register',
      Nmae: 'VankeLifeRegister',
      component: VankeLifeRegister,
      meta: {
        title: '万生活注册',
      },
    },
    {
      path: '/vankelife/login',
      Nmae: 'VankeLifeLogin',
      component: VankeLifeLogin,
      meta: {
        title: '万生活登录',
      },
    },
    {
      path: '/vankelife/login/vcode',
      Nmae: 'VankeLifeLoginVcode',
      component: VankeLifeLoginVcode,
      meta: {
        title: '万生活登录',
      },
    },
    {
      path: '/vankelife/resetpassword',
      Nmae: 'VankeLifeResetpassword',
      component: VankeLifeResetpassword,
      meta: {
        title: '万生活设置新密码',
      },
    },
  ],
});
