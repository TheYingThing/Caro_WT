<template>
  <div class="tab-pane fade top-padding" :id="'nav-scoring-' + player" role="tabpanel" :aria-labelledby="'nav-scoring-tab-' + player">
    <div class="tile-padding rulesTab">
      <img class="tile-img" src="@/assets/images/redButton.png" alt="red tile">
      <img class="tile-img" src="@/assets/images/blackButton.png" alt="black tile">
      <span>:     10 points</span>
    </div>
    <div class="tile-padding rulesTab">
      <img class="tile-img" src="@/assets/images/redButton.png" alt="red tile">
      <img class="tile-img" src="@/assets/images/greyButton.png" alt="grey tile">
      <span>:     8 points</span>
    </div>
    <div class="tile-padding rulesTab">
      <img class="tile-img" src="@/assets/images/redButton.png" alt="red tile">
      <img class="tile-img" src="@/assets/images/whiteButton.png" alt="white tile">
      <span>:     6 points</span>
    </div>
    <div class="tile-padding rulesTab">
      <img class="tile-img" src="@/assets/images/blackButton.png" alt="black tile">
      <img class="tile-img" src="@/assets/images/greyButton.png" alt="grey tile">
      <span>:     4 points</span>
    </div>
    <div class="tile-padding rulesTab">
      <img class="tile-img" src="@/assets/images/blackButton.png" alt="black tile">
      <img class="tile-img" src="@/assets/images/whiteButton.png" alt="white tile">
      <span>:     2 points</span>
    </div>
    <div class="tile-padding rulesTab">
      <img class="tile-img" src="@/assets/images/greyButton.png" alt="grey tile">
      <img class="tile-img" src="@/assets/images/whiteButton.png" alt="white tile">
      <span>:     1 points</span>
    </div>
    <ul class="top-padding list">
      <li><b>10 points</b> for the first tile of the game</li>
      <li><b>10 points</b> will be subtracted upon breaking a rule</li>
      <li><b>Double points</b> when the last tile of a color is placed</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "QuickRules",
  props: ['player']
}
</script>

<style scoped>

.top-padding {
  padding-top: 50px;
}

.list {
  text-align: left !important;
}

.tile-img {
  width: 30px;
  height: 30px;
}

.tile-padding {
  padding: 5px;
}

.rulesTab {
  text-align: left !important;
  padding-left: 140px;
}


</style>