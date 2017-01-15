<template>
   <md-whiteframe class="signin" md-elevation="2">
      <div class="logo-container">
         <img class="logo" src="assets/images/logo.png" alt="">
      </div>
      <div class="form-container">
         <md-input-container>
            <label>Adresse email :</label>
            <md-input type="email" v-model="email"></md-input>
         </md-input-container>
         <md-input-container>
            <label>Mot de passe :</label>
            <md-input type="password" v-model="password"></md-input>
         </md-input-container>
         <md-button class="md-raised md-primary" @click="login()">Se connecter</md-button>
      </div>
   </md-whiteframe>
</template>

<style lang="scss">
   .signin {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      height: 420px;
      transform: translate(-50%, -50%);
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }

   .logo-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .logo {
      width: 135px;
   }

   .form-container {
      border-top: 1px solid #e6e6e6;
      width: 100%;
      text-align: center;
      padding: 22px 30px;
   }

   .md-input-container {
      width: 100%;
   }

</style>

<script>
   import fetch from '../services/fetch'

   export default {
      data() {
         return {
            email: '',
            password: '',
         }
      },
      methods: {
         login() {
            if (this.password && this.email) {
                const data = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch('LOGIN', data)
                   .then(response => {
                       this.$router.push('dashboard');
                   })
                   .catch(err => {
                       alert('login error');
                   });
            }
         },
      }
   }
</script>
