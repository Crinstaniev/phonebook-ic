<template>
  <div class="about pa-6">
    <v-card class="mx-auto" max-width="500" elevation="2">
      <v-card-title>About IC Phonebook</v-card-title>
      <v-card-text>
        <div class="d-flex justify-center py-5">
          <v-avatar size="100" color="black">
            <v-img :src="avatar"> </v-img>
          </v-avatar>
        </div>
        <div class="my-3"><v-divider></v-divider></div>
        <p>This phonebook is build by <code>Johnathan Zhuang</code></p>
        <p>Powered by <code>Internet Computer</code> from Dfinity</p>
        <p>It is welcomed if you want you serve me a cup of coffee!</p>
        <p>
          ICP Wallet
          <br />
          <code
            >0379b2956250edf54f35bc4fab93faf1613bca6e91d6e081feb2a7a365b6d4bb</code
          >
          <br />
          MetaMask
          <br />
          <code>0xCd8318BA9F9da99aa90D577D5947662E6B54eAA2</code>
        </p>
        <p>
          And welcome to check my github account <code>gitbub@Crinstaniev</code>
        </p>
        <p>
          You can find the source code of this project at
          <br />
          <a
            class="text-decoration-none"
            href="https://github.com/Crinstaniev/phonebook-ic"
            >https://github.com/Crinstaniev/phonebook-ic</a
          >
        </p>
        <p>
          And here is my blog <br /><a
            class="text-decoration-none"
            href="http://blog.ppsh.su"
            >http://blog.ppsh.su</a
          >
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import avatar from '../../assets/avatar.jpg';
export default {
  data() {
    return {
      avatar: avatar,
    };
  },
};
</script>

<style>
</style>