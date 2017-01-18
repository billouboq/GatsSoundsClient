<template>
<md-whiteframe class="signup" md-elevation="2">
   <div class="form-container">
      <md-input-container>
         <label>Adresse email :</label>
         <md-input type="email" v-model="email"></md-input>
      </md-input-container>
      <md-input-container>
         <label>Mot de passe :</label>
         <md-input type="password" v-model="password"></md-input>
      </md-input-container>
      <md-input-container>
         <label>Mot de passe :</label>
         <md-input type="password" v-model="repassword"></md-input>
      </md-input-container>
      <md-button class="md-raised md-primary" @click="signup()">S'inscrire'</md-button>
   </div>
</md-whiteframe>
</template>

<style lang="scss">
.signup {
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
export default {
   data() {
      return {
         email: '',
         password: '',
         repassword: ''
      }
   },
   methods: {
      signup() {
         if (this.password && this.email && this.repassword) {

            const data = {
               email: this.email,
               password: this.password,
               repassword: this.repassword
            };

            this.$store.dispatch('SIGNUP', data)
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
