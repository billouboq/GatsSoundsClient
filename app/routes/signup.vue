<template>
<md-whiteframe class="signup" md-elevation="2">
   <div class="logo-container">
      <img class="logo" src="assets/images/logo.png" alt="">
   </div>
   <div class="form-container">
      <md-input-container>
         <label>Nom d'utilisateur :</label>
         <md-input type="text" v-model="username"></md-input>
      </md-input-container>
      <md-input-container>
         <label>Mot de passe :</label>
         <md-input type="password" v-model="password"></md-input>
      </md-input-container>
      <md-input-container>
         <label>Mot de passe :</label>
         <md-input type="password" v-model="repassword"></md-input>
      </md-input-container>
      <md-button class="md-raised md-primary" @click="signup()">S'inscrire</md-button>
      <router-link class="link" to="signin">Se connecter</router-link>
   </div>
</md-whiteframe>
</template>

<script>
export default {
   data() {
      return {
         username: '',
         password: '',
         repassword: ''
      }
   },
   methods: {
      signup() {
         if (this.password && this.username && this.repassword) {

            const data = {
               username: this.username,
               password: this.password,
               repassword: this.repassword
            };

            this.$store.dispatch('SIGNUP', data)
               .then(response => {
                  this.$router.push('dashboard');
               })
               .catch(err => {
                  console.log(err);
                  alert('login error');
               });
         }
      },
   }
}
</script>

<style lang="scss">
.signup {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 480px;
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
.link {
   display: block;
   margin-top: 10px;
}
</style>
