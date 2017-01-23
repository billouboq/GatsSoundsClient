<template>
<md-whiteframe class="signin" md-elevation="2">
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
      <md-button class="md-raised md-primary" @click="login()">Se connecter</md-button>
      <router-link class="link" to="signup">Créer son compte</router-link>
   </div>
</md-whiteframe>
</template>

<script>
export default {
   data() {
      return {
         username: '',
         password: '',
      }
   },
   methods: {
      login() {
         if (this.password && this.username) {

            const data = {
               username: this.username,
               password: this.password
            };

            this.$store.dispatch('LOGIN', data)
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
    justify-content: space-between;
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
