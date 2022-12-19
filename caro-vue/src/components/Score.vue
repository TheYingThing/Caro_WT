<template>
  <div class="content-body">
    <div class="score-result">
      Congratulations {{winner}}
    </div>
    <br>
    <a class="button div-button"><RouterLink to="/">Back to menu</RouterLink></a>
    <a class="button div-button"><RouterLink to="/game">Continue Game</RouterLink></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      winner: "",
    }
  },
  name: "score",
  props: ['p1Points', 'p2Points', 'p1Name', 'p2Name'],
  methods: {
    getWinner() {
      if (this.p1Points > this.p2Points) {
        this.winner = this.p1Name + 'you won!'
      } else if (this.p2Points > this.p1Points) {
        this.winner = this.p2Name + 'you won!'
      } else {
        this.winner = 'It\'s a tie!'
      }
    }
  },
  created() {
    this.getWinner()
  }
}
</script>

<style scoped>

.content-body{
  align-content: center;
}

.score-result {
  padding: 50px;
  text-align: center;
  font-size: 40px;
}

</style>