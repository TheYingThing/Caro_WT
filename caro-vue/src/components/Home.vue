<template>
  <div class="content-body">
    <div v-show="home">
      <h1 class="top-padding">Welcome to Caro!</h1>
      <h2>Choose your game:</h2>
      <div class="padding-30">
        <div class="btn-group-vertical" role="group">
          <button class="btn btn-secondary grey-button menu-button" v-on:click="changeView">New Game</button>
          <a class="btn btn-secondary grey-button menu-button">
            <RouterLink to="/game">Continue Game</RouterLink>
            </a>
          <button class="btn btn-secondary grey-button menu-button" v-on:click="load()">
            Load Game
          </button>
        </div>
        <div class="padding-30">
          <h3>If you want to have a look at the rules, click <a class="in-text-link" href="http://localhost:9000/rules">here!</a></h3>
        </div>
      </div>
    </div>
    <div v-show="players" class="col-4 mx-auto">
      <form id="nameForm" @submit.prevent="startGame">
        <div class="padding-30">
          <div class="form-group bottom-padding-30">
            <label for="playerOneName">Player 1 Name</label>
            <input type="text" class="form-control" id="playerOneName" placeholder="Player 1" v-model="player1">
          </div>
          <div class="form-group bottom-padding-30">
            <label for="playerTwoName">Player 2 Name</label>
            <input type="text" class="form-control" id="playerTwoName" placeholder="Player 2" v-model="player2">
          </div>
        </div>
        <button class="btn btn-secondary">Start Game</button>
        <button class="btn btn-secondary" v-on:click.prevent="changeView">Back to Menu</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "Home",
  data() {
    return {
      home: true,
      players: false,
      player1: '',
      player2: ''
    }
  },
  methods: {
    load() {
      axios.get('http://localhost:9000/load').then(
          function () {
            router.push('/game')
          }
      )
    },
    executeAjax(path) {
      return $.ajax({
        url: "/" + path,
        type: 'GET'
      })
    },
    changeView() {
      this.home = !this.home
      this.players = !this.players
    },
    async startGame()  {
      if (this.player1 === "") {
        this.player1 = "Player 1";
      }

      if (this.player2 === "") {
        this.player2 = "Player 2";
      }

      const path = 'game/' + this.player1 + '/' + this.player2;
      await this.executeAjax(path);
      window.location.href = "http://localhost:9000/board";
    }
  }
}
</script>

<style scoped>
.content-body{
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
}

.top-padding {
  padding-top: 50px;
}

.padding-30 {
  padding: 30px;
}

.in-text-link {
  color: #21262b;
  text-decoration: none;
  position: relative;
}

.bottom-padding-30 {
  padding-bottom: 30px;
}
</style>